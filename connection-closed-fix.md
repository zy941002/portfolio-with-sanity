# ERR_CONNECTION_CLOSED 错误排查指南

## 错误说明

`ERR_CONNECTION_CLOSED` 表示浏览器尝试连接服务器时，连接被立即关闭。这通常不是 DNS 问题，而是服务器端的问题。

## 可能原因

1. **Next.js 服务未运行或崩溃**
2. **Nginx 配置错误**
3. **端口冲突或服务未监听正确端口**
4. **防火墙阻止连接**
5. **Next.js 服务只监听 localhost，Nginx 无法连接**

## 排查步骤

### 1. 检查 Next.js 服务是否运行

在服务器上执行：

```bash
# 检查 Next.js 进程
ps aux | grep next
ps aux | grep node

# 检查 3000 端口是否在监听
netstat -tlnp | grep 3000
# 或
ss -tlnp | grep 3000
# 或
lsof -i :3000
```

**期望结果**：应该看到进程在监听 `3000` 端口

**如果没有运行**：
```bash
# 进入项目目录
cd /www/portfolio-with-sanity

# 启动服务（根据你的启动方式）
npm start
# 或
pm2 start npm --name "portfolio" -- start
# 或
nohup npm start > /dev/null 2>&1 &
```

### 2. 检查 Next.js 监听的地址

**重要**：Next.js 必须监听内网 IP 或 `0.0.0.0`，不能只监听 `127.0.0.1`

检查监听地址：
```bash
netstat -tlnp | grep 3000
```

**期望结果**：
- ✅ `0.0.0.0:3000` 或 `172.22.202.207:3000` - 正确
- ❌ `127.0.0.1:3000` - 错误，Nginx 无法连接

如果只监听 `127.0.0.1`，需要修改启动方式：

```bash
# 方式1：使用环境变量
HOSTNAME=0.0.0.0 npm start
# 或
HOSTNAME=172.22.202.207 npm start

# 方式2：修改 package.json（见下方）
```

### 3. 测试内网连接

在服务器上测试 Nginx 能否连接到 Next.js：

```bash
# 测试内网 IP 连接
curl http://172.22.202.207:3000
curl http://localhost:3000

# 如果返回内容，说明 Next.js 正常
# 如果连接失败，说明 Next.js 未运行或监听地址错误
```

### 4. 检查 Nginx 配置

检查 Nginx 的 `proxy_pass` 配置：

```bash
# 查看 Nginx 配置
cat /www/server/panel/vhost/nginx/瓦闻.conf
# 或你的配置文件路径

# 检查配置语法
nginx -t

# 查看 Nginx 错误日志
tail -f /www/wwwlogs/瓦闻.error.log
```

确保 `proxy_pass` 指向正确的地址：
```nginx
location / {
    proxy_pass http://172.22.202.207:3000;  # 确保这个 IP 正确
    # 或
    proxy_pass http://127.0.0.1:3000;  # 如果 Next.js 监听 localhost
    # ...
}
```

### 5. 检查防火墙

```bash
# 检查防火墙规则
firewall-cmd --list-all

# 确保 3000 端口允许内网访问
firewall-cmd --list-ports

# 如果需要，添加规则（但通常内网不需要）
```

### 6. 检查 Nginx 服务状态

```bash
# 检查 Nginx 是否运行
systemctl status nginx

# 重启 Nginx
systemctl restart nginx

# 查看 Nginx 错误日志
tail -50 /www/wwwlogs/瓦闻.error.log
```

## 常见解决方案

### 方案 1：确保 Next.js 监听正确地址

修改 `package.json` 的 `start` 脚本：

```json
{
  "scripts": {
    "start": "npm run env && HOSTNAME=0.0.0.0 next start"
  }
}
```

或者创建 `.env.production` 文件：
```
HOSTNAME=0.0.0.0
PORT=3000
```

### 方案 2：使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
cd /www/portfolio-with-sanity
pm2 start npm --name "portfolio" -- start

# 设置开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status
pm2 logs portfolio
```

### 方案 3：检查 Nginx proxy_pass 配置

确保 Nginx 配置正确：

```nginx
location / {
    proxy_pass http://172.22.202.207:3000;

    # 重要：添加这些头部
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 超时设置
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # HTTP 1.1
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### 方案 4：检查端口占用

```bash
# 检查 3000 端口是否被占用
lsof -i :3000

# 如果被其他进程占用，可以：
# 1. 停止占用端口的进程
# 2. 或修改 Next.js 端口
PORT=3001 npm start  # 然后修改 Nginx proxy_pass
```

## 快速诊断命令

```bash
# 1. 检查 Next.js 是否运行
ps aux | grep -E "next|node" | grep -v grep

# 2. 检查端口监听
netstat -tlnp | grep 3000

# 3. 测试本地连接
curl -v http://localhost:3000
curl -v http://172.22.202.207:3000

# 4. 检查 Nginx 状态
systemctl status nginx
nginx -t

# 5. 查看错误日志
tail -50 /www/wwwlogs/瓦闻.error.log
journalctl -u nginx -n 50  # 如果使用 systemd
```

## 完整修复流程

### 步骤 1：确保 Next.js 运行并监听正确地址

```bash
cd /www/portfolio-with-sanity

# 停止现有进程（如果有）
pkill -f "next start"
# 或
pm2 stop portfolio

# 使用正确的地址启动
HOSTNAME=0.0.0.0 npm start
# 或使用 PM2
pm2 start npm --name "portfolio" -- start -- --hostname 0.0.0.0
```

### 步骤 2：验证 Next.js 可访问

```bash
# 在服务器上测试
curl http://localhost:3000
curl http://172.22.202.207:3000

# 应该返回 HTML 内容
```

### 步骤 3：检查并重启 Nginx

```bash
# 检查配置
nginx -t

# 重启
systemctl restart nginx

# 查看日志
tail -f /www/wwwlogs/瓦闻.error.log
```

### 步骤 4：测试访问

```bash
# 在服务器上测试 Nginx 代理
curl -H "Host: www.wauramoon.com" http://localhost

# 在浏览器访问
http://www.wauramoon.com
```

## 如果问题仍然存在

1. **查看完整错误日志**：
   ```bash
   # Nginx 错误日志
   tail -100 /www/wwwlogs/瓦闻.error.log

   # Next.js 日志（如果使用 PM2）
   pm2 logs portfolio

   # 系统日志
   journalctl -xe
   ```

2. **检查 SELinux**（如果启用）：
   ```bash
   getenforce
   # 如果是 Enforcing，可能需要设置 SELinux 规则
   ```

3. **临时测试**：直接访问 Next.js 端口
   ```bash
   # 在浏览器访问（如果防火墙允许）
   http://47.109.197.249:3000
   ```
   如果能访问，说明 Next.js 正常，问题在 Nginx 配置。

## 检查清单

- [ ] Next.js 服务正在运行
- [ ] Next.js 监听 `0.0.0.0:3000` 或内网 IP
- [ ] 可以通过 `curl http://localhost:3000` 访问
- [ ] Nginx 配置语法正确
- [ ] Nginx `proxy_pass` 指向正确的地址
- [ ] Nginx 服务正在运行
- [ ] 防火墙允许内网通信
- [ ] 查看错误日志找出具体错误


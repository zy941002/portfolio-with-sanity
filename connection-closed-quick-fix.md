# ERR_CONNECTION_CLOSED 快速修复指南

## 错误说明

`ERR_CONNECTION_CLOSED` 表示浏览器连接服务器时，连接被立即关闭。这是**服务器端问题**，不是 DNS 问题。

## 快速诊断（在服务器上执行）

### 1. 检查 Next.js 是否运行

```bash
# 检查进程
ps aux | grep -E "next|node" | grep -v grep

# 检查端口监听
netstat -tlnp | grep 3000
# 或
ss -tlnp | grep 3000
# 或
lsof -i :3000
```

**如果没有运行**，需要启动服务。

### 2. 测试本地连接

```bash
# 测试 Next.js 是否响应
curl http://localhost:3000
curl http://127.0.0.1:3000

# 如果连接失败，说明 Next.js 未运行或崩溃
```

### 3. 检查 Nginx 状态

```bash
# 检查 Nginx 是否运行
systemctl status nginx

# 检查 Nginx 配置
nginx -t

# 查看错误日志
tail -50 /www/wwwlogs/瓦闻.error.log
```

## 快速修复步骤

### 步骤 1：启动/重启 Next.js 服务

```bash
# 进入项目目录
cd /www/portfolio-with-sanity

# 停止现有进程（如果有）
pkill -f "next start"
# 或如果使用 PM2
pm2 stop portfolio

# 启动服务（你的 package.json 已配置为监听 0.0.0.0）
npm start

# 或使用 PM2（推荐，保持后台运行）
pm2 start npm --name "portfolio" -- start
pm2 save  # 保存配置以便开机自启
```

### 步骤 2：验证 Next.js 运行

```bash
# 应该返回 HTML 内容
curl http://localhost:3000

# 检查监听地址（应该显示 0.0.0.0:3000）
netstat -tlnp | grep 3000
```

**期望结果**：应该看到 `0.0.0.0:3000` 或 `:::3000`

### 步骤 3：重启 Nginx

```bash
# 检查配置
nginx -t

# 重启
systemctl restart nginx

# 或使用宝塔面板重启
```

### 步骤 4：测试访问

```bash
# 在服务器上测试 Nginx 代理
curl -H "Host: www.wauramoon.com" http://localhost

# 应该返回 HTML 内容
```

## 常见问题及解决方案

### 问题 1：Next.js 启动后立即退出

**可能原因**：
- 环境变量缺失
- 构建文件不存在
- 端口被占用

**解决**：
```bash
cd /www/portfolio-with-sanity

# 1. 检查是否需要重新构建
npm run build

# 2. 检查环境变量
cat .env.production
# 或
cat .env

# 3. 检查端口占用
lsof -i :3000
# 如果被占用，停止占用进程或修改端口

# 4. 查看启动日志
npm start
# 查看错误信息
```

### 问题 2：Next.js 运行但 Nginx 无法连接

**可能原因**：
- Next.js 只监听 localhost
- 防火墙阻止
- Nginx proxy_pass 配置错误

**解决**：
```bash
# 1. 确认监听地址（应该显示 0.0.0.0:3000）
netstat -tlnp | grep 3000

# 2. 如果只显示 127.0.0.1:3000，检查启动命令
# 你的 package.json 已配置 -H 0.0.0.0，应该没问题

# 3. 检查 Nginx 配置中的 proxy_pass
# 应该指向 http://127.0.0.1:3000 或 http://localhost:3000
```

### 问题 3：Nginx 报错 "upstream connection closed"

**可能原因**：
- Next.js 响应超时
- Nginx 超时设置太短

**解决**：在 Nginx 配置中添加超时设置：
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    
    # 超时设置
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
    
    # 其他必要头部
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## 使用 PM2 管理（推荐）

PM2 可以保持服务运行，并在崩溃时自动重启：

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
cd /www/portfolio-with-sanity
pm2 start npm --name "portfolio" -- start

# 查看状态
pm2 status

# 查看日志
pm2 logs portfolio

# 设置开机自启
pm2 startup
pm2 save

# 其他常用命令
pm2 restart portfolio  # 重启
pm2 stop portfolio     # 停止
pm2 delete portfolio   # 删除
```

## 一键诊断脚本

在服务器上运行以下命令进行完整诊断：

```bash
#!/bin/bash
echo "=== Next.js 进程检查 ==="
ps aux | grep -E "next|node" | grep -v grep

echo -e "\n=== 端口监听检查 ==="
netstat -tlnp | grep 3000

echo -e "\n=== 本地连接测试 ==="
curl -I http://localhost:3000 2>&1 | head -5

echo -e "\n=== Nginx 状态 ==="
systemctl status nginx --no-pager | head -10

echo -e "\n=== Nginx 配置检查 ==="
nginx -t

echo -e "\n=== 最近 Nginx 错误日志 ==="
tail -20 /www/wwwlogs/瓦闻.error.log 2>/dev/null || echo "日志文件不存在"
```

## 检查清单

- [ ] Next.js 进程正在运行
- [ ] Next.js 监听 `0.0.0.0:3000` 或 `127.0.0.1:3000`
- [ ] `curl http://localhost:3000` 返回内容
- [ ] Nginx 服务正在运行
- [ ] Nginx 配置语法正确
- [ ] Nginx `proxy_pass` 指向 `http://127.0.0.1:3000`
- [ ] 查看错误日志找出具体错误

## 如果问题仍然存在

1. **查看完整日志**：
   ```bash
   # Next.js 日志（如果使用 PM2）
   pm2 logs portfolio --lines 100
   
   # Nginx 错误日志
   tail -100 /www/wwwlogs/瓦闻.error.log
   
   # 系统日志
   journalctl -xe | tail -50
   ```

2. **直接测试 Next.js**：
   ```bash
   # 在浏览器访问（如果防火墙允许）
   http://47.109.197.249:3000
   ```
   如果能访问，说明 Next.js 正常，问题在 Nginx。

3. **检查防火墙**：
   ```bash
   # 检查防火墙规则
   firewall-cmd --list-all
   # 通常内网通信不需要特殊规则
   ```

## 紧急修复命令

如果服务完全无法访问，按顺序执行：

```bash
# 1. 停止所有 Next.js 进程
pkill -f "next start"

# 2. 进入项目目录
cd /www/portfolio-with-sanity

# 3. 重新构建（如果需要）
npm run build

# 4. 启动服务
npm start &
# 或使用 PM2
pm2 start npm --name "portfolio" -- start

# 5. 等待几秒后测试
sleep 5
curl http://localhost:3000

# 6. 重启 Nginx
systemctl restart nginx

# 7. 测试代理
curl -H "Host: www.wauramoon.com" http://localhost
```




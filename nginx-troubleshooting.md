# Nginx 配置问题排查指南

## 问题分析

你的 Nginx 配置显示：
- Nginx 监听 **80 端口**
- 反向代理到内网 `172.22.202.207:3000`
- 域名：`www.wauramoon.com`

如果必须通过 `47.109.197.249:3000` 访问，说明 Nginx 反向代理没有正常工作。

## 排查步骤

### 1. 检查 Nginx 是否运行

```bash
# 检查 Nginx 状态
systemctl status nginx
# 或
service nginx status

# 检查 Nginx 配置语法
nginx -t

# 重新加载 Nginx 配置
nginx -s reload
# 或
systemctl reload nginx
```

### 2. 检查防火墙端口

```bash
# 检查防火墙规则（CentOS/RHEL）
firewall-cmd --list-ports
firewall-cmd --list-all

# 如果 80 端口未开放，添加：
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --reload

# 或者检查 iptables
iptables -L -n | grep 80
```

### 3. 检查云服务器安全组规则

在云服务器控制台（阿里云/腾讯云等）检查：
- **入站规则**：确保 **80 端口** 已开放
- **443 端口**（如果使用 HTTPS）也需要开放
- 3000 端口可以关闭（因为应该通过 Nginx 代理访问）

### 4. 检查 Next.js 服务绑定

确保 Next.js 服务只监听内网 IP 或 localhost：

```bash
# 检查 Next.js 进程
ps aux | grep next

# 或者检查端口监听
netstat -tlnp | grep 3000
# 或
ss -tlnp | grep 3000
```

Next.js 应该绑定到 `127.0.0.1:3000` 或 `172.22.202.207:3000`，**不应该**绑定到 `0.0.0.0:3000`（这样会暴露到公网）。

### 5. 检查域名解析

```bash
# 检查域名解析
nslookup www.wauramoon.com
dig www.wauramoon.com

# 应该解析到 47.109.197.249
```

### 6. 测试访问

```bash
# 测试内网访问（在服务器上）
curl http://172.22.202.207:3000
curl http://localhost:3000

# 测试 Nginx 代理（在服务器上）
curl http://localhost
curl -H "Host: www.wauramoon.com" http://localhost

# 测试公网访问（从外部）
curl http://47.109.197.249
curl http://www.wauramoon.com/
```

## 推荐的 Nginx 配置优化

### 确保 Next.js 只监听内网

修改启动脚本或使用环境变量：

```bash
# 在启动 Next.js 时指定 hostname
HOSTNAME=172.22.202.207 npm start
# 或
HOSTNAME=127.0.0.1 npm start
```

### 完整的 Nginx 配置建议

```nginx
server {
    listen 80;
    server_name www.wauramoon.com wauramoon.com;

    # 日志
    access_log  /www/wwwlogs/瓦闻.log;
    error_log  /www/wwwlogs/瓦闻.error.log;

    # 反向代理到内网 Next.js
    location / {
        proxy_pass http://172.22.202.207:3000;
        proxy_http_version 1.1;

        # 重要：设置正确的 Host 头
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持（如果需要）
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 其他配置...
}
```

## 安全建议

1. **关闭 3000 端口的公网访问**：在防火墙/安全组中只允许内网访问 3000 端口
2. **使用 HTTPS**：配置 SSL 证书，使用 443 端口
3. **限制 Next.js 监听地址**：确保 Next.js 只监听内网 IP

## 快速修复命令

```bash
# 1. 检查并重启 Nginx
nginx -t && systemctl restart nginx

# 2. 检查防火墙
firewall-cmd --list-ports
firewall-cmd --permanent --add-service=http
firewall-cmd --reload

# 3. 检查 Next.js 是否在运行
pm2 list  # 如果使用 pm2
# 或
ps aux | grep next

# 4. 查看 Nginx 错误日志
tail -f /www/wwwlogs/瓦闻.error.log
```


# HTTPS 443 端口无法访问问题排查指南

## 问题分析

**症状**：
- ✅ DNS 解析正常：`www.wauramoon.com` → `47.109.197.249`
- ✅ HTTP (80端口) 可以访问
- ❌ HTTPS (443端口) 连接超时

**根本原因**：443 端口未开放或 Nginx 未配置 SSL

## 排查步骤

### 1. 检查服务器防火墙（在服务器上执行）

```bash
# CentOS/RHEL 7+
firewall-cmd --list-ports
firewall-cmd --list-all

# 如果 443 端口未开放，添加：
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --reload

# 或者检查 iptables
iptables -L -n | grep 443

# Ubuntu/Debian
sudo ufw status
sudo ufw allow 443/tcp
```

### 2. 检查云服务器安全组规则（重要！）

登录你的云服务器控制台（阿里云/腾讯云/其他）：

1. 进入 **安全组** 或 **防火墙规则**
2. 检查 **入站规则**（Inbound Rules）
3. 确保 **443 端口（HTTPS）** 已开放
   - 端口：`443`
   - 协议：`TCP`
   - 源：`0.0.0.0/0` 或特定 IP

**操作步骤（以阿里云为例）**：
1. 登录阿里云控制台
2. 进入 **ECS** → 选择你的服务器
3. 点击 **安全组** → **配置规则**
4. 点击 **添加安全组规则**
5. 配置：
   - 规则方向：入方向
   - 授权策略：允许
   - 优先级：1（或根据需要）
   - 协议类型：TCP
   - 端口范围：443/443
   - 授权对象：0.0.0.0/0
   - 描述：HTTPS 访问

### 3. 检查 Nginx 是否配置了 SSL

在服务器上执行：

```bash
# 检查 Nginx 配置
nginx -T | grep -A 20 "server.*443"

# 或者查看配置文件
cat /etc/nginx/nginx.conf
cat /etc/nginx/conf.d/*.conf
cat /etc/nginx/sites-enabled/*

# 检查是否有监听 443 端口的配置
grep -r "listen.*443" /etc/nginx/
```

**如果没有 SSL 配置**，需要添加 SSL 配置（见下面的配置示例）

### 4. 检查 SSL 证书是否存在

```bash
# 查看证书文件（路径可能不同）
ls -la /etc/nginx/ssl/
ls -la /etc/letsencrypt/live/www.wauramoon.com/
ls -la /etc/nginx/certs/

# 如果没有证书，需要申请证书（见下面的证书申请部分）
```

### 5. 测试端口连通性（在服务器上）

```bash
# 检查端口是否监听
netstat -tlnp | grep 443
# 或
ss -tlnp | grep 443

# 如果没有输出，说明 Nginx 没有监听 443 端口
```

## 解决方案

### 方案 A：只使用 HTTP（临时方案）

如果暂时不需要 HTTPS，可以：
1. 在浏览器中访问 `http://www.wauramoon.com`（注意是 http，不是 https）
2. 或者配置 Nginx 强制使用 HTTP

### 方案 B：配置 HTTPS（推荐）

#### 步骤 1：申请 SSL 证书

**使用 Let's Encrypt（免费）**：

```bash
# 安装 certbot
# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# 自动配置（推荐）
sudo certbot --nginx -d www.wauramoon.com -d wauramoon.com

# 或者手动申请证书
sudo certbot certonly --standalone -d www.wauramoon.com -d wauramoon.com
```

**使用云服务商提供的 SSL 证书**：
1. 在云服务商控制台申请免费 SSL 证书
2. 下载证书文件（通常包含 `.crt` 和 `.key` 文件）
3. 上传到服务器，例如：`/etc/nginx/ssl/`

#### 步骤 2：配置 Nginx SSL

创建或修改 Nginx 配置文件（例如：`/etc/nginx/conf.d/wauramoon.conf`）：

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name www.wauramoon.com wauramoon.com;

    # 重定向所有 HTTP 请求到 HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name www.wauramoon.com wauramoon.com;

    # SSL 证书路径（Let's Encrypt）
    ssl_certificate /etc/letsencrypt/live/www.wauramoon.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.wauramoon.com/privkey.pem;

    # 或者使用云服务商证书
    # ssl_certificate /etc/nginx/ssl/www.wauramoon.com.crt;
    # ssl_certificate_key /etc/nginx/ssl/www.wauramoon.com.key;

    # SSL 配置优化
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

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
}
```

#### 步骤 3：测试并重载 Nginx

```bash
# 测试配置语法
nginx -t

# 如果测试通过，重载配置
nginx -s reload
# 或
systemctl reload nginx

# 查看状态
systemctl status nginx
```

#### 步骤 4：设置证书自动续期（Let's Encrypt）

Let's Encrypt 证书有效期 90 天，需要定期续期：

```bash
# 测试续期
sudo certbot renew --dry-run

# 添加定时任务（自动续期）
sudo crontab -e

# 添加以下行（每天凌晨 2 点检查续期）
0 2 * * * certbot renew --quiet && nginx -s reload
```

## 快速诊断命令

在服务器上执行以下命令进行快速诊断：

```bash
#!/bin/bash
echo "=== 1. 检查防火墙 ==="
firewall-cmd --list-ports 2>/dev/null || iptables -L -n | grep 443 || echo "请检查云服务器安全组"

echo -e "\n=== 2. 检查端口监听 ==="
netstat -tlnp | grep 443 || ss -tlnp | grep 443 || echo "443 端口未监听"

echo -e "\n=== 3. 检查 Nginx SSL 配置 ==="
nginx -T 2>/dev/null | grep -A 5 "listen.*443" || echo "未找到 443 端口配置"

echo -e "\n=== 4. 检查 SSL 证书 ==="
ls -la /etc/letsencrypt/live/*/fullchain.pem 2>/dev/null || \
ls -la /etc/nginx/ssl/*.crt 2>/dev/null || \
echo "未找到 SSL 证书文件"

echo -e "\n=== 5. 测试本地 HTTPS ==="
curl -k https://localhost -I 2>&1 | head -5 || echo "本地 HTTPS 无法访问"
```

## 常见问题

### Q1: 已经开放了 443 端口，还是无法访问？

**检查**：
1. 云服务器安全组是否开放（最重要！）
2. Nginx 是否配置了 SSL
3. SSL 证书是否有效

### Q2: 浏览器显示"不安全连接"或证书错误？

**可能原因**：
1. 证书过期
2. 证书域名不匹配
3. 证书链不完整

**解决**：
```bash
# 更新 Let's Encrypt 证书
sudo certbot renew

# 重载 Nginx
sudo nginx -s reload
```

### Q3: 只想临时使用 HTTP，如何强制使用 HTTP？

修改 Nginx 配置，移除 HTTPS 配置，只保留 HTTP：

```nginx
server {
    listen 80;
    server_name www.wauramoon.com wauramoon.com;

    # ... 其他配置保持不变
}
```

然后访问 `http://www.wauramoon.com`（注意是 http）

## 验证步骤

完成配置后，验证：

1. ✅ 检查防火墙/安全组：443 端口已开放
2. ✅ 检查 Nginx 配置：`nginx -t` 通过
3. ✅ 检查端口监听：`netstat -tlnp | grep 443` 有输出
4. ✅ 测试 HTTPS：`curl -I https://www.wauramoon.com` 返回 200
5. ✅ 浏览器访问：`https://www.wauramoon.com` 正常显示

## 推荐配置检查清单

- [ ] 云服务器安全组开放 443 端口
- [ ] 服务器防火墙开放 443 端口
- [ ] Nginx 配置 SSL 证书
- [ ] SSL 证书文件存在且有效
- [ ] Nginx 配置测试通过
- [ ] Nginx 已重载配置
- [ ] 设置证书自动续期（Let's Encrypt）


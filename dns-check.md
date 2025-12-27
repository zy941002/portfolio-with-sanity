# 域名解析检查指南

## 问题分析

`http://47.109.197.249` 可以访问，说明 Nginx 和 Next.js 都正常工作。
但 `www.wauramoon.com` 无法访问，通常是 **DNS 解析问题**。

## 检查步骤

### 1. 检查域名是否解析到正确 IP

在本地电脑上运行：

```bash
# Windows
nslookup www.wauramoon.com
ping www.wauramoon.com

# Linux/Mac
dig www.wauramoon.com
nslookup www.wauramoon.com
ping www.wauramoon.com
```

**期望结果**：应该解析到 `47.109.197.249`

如果解析到其他 IP 或无法解析，说明 DNS 配置有问题。

### 2. 在线 DNS 检查工具

访问以下网站检查域名解析：
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://tool.chinaz.com/dns/

输入 `www.wauramoon.com`，检查全球 DNS 解析情况。

### 3. 检查域名注册商 DNS 配置

登录你的域名注册商（如阿里云、腾讯云、GoDaddy 等），检查 DNS 记录：

#### A 记录配置

需要添加以下 DNS 记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | www | 47.109.197.249 | 600 |
| A | @ | 47.109.197.249 | 600 |

**说明**：
- `www`：表示 `www.wauramoon.com`
- `@`：表示根域名 `wauramoon.com`（可选，如果想同时支持）

### 4. 检查 Nginx 配置中的 server_name

确保 Nginx 配置包含域名：

```nginx
server {
    listen 80;
    server_name www.wauramoon.com wauramoon.com;  # 确保包含域名

    # ... 其他配置
}
```

### 5. DNS 生效时间

- **新添加的 DNS 记录**：通常需要 **10 分钟到 48 小时** 才能全球生效
- **修改的 DNS 记录**：通常需要 **10 分钟到 24 小时**

### 6. 清除本地 DNS 缓存

如果 DNS 已配置但本地仍无法访问，清除 DNS 缓存：

```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux
sudo systemd-resolve --flush-caches
# 或
sudo /etc/init.d/nscd restart
```

## 常见问题

### 问题1：域名解析到其他 IP

**原因**：DNS 记录配置错误或未更新

**解决**：在域名注册商处修改 A 记录为 `47.109.197.249`

### 问题2：域名无法解析（NXDOMAIN）

**原因**：DNS 记录未添加或 DNS 服务器配置错误

**解决**：
1. 检查域名注册商的 DNS 服务器设置
2. 确保已添加 A 记录
3. 等待 DNS 传播

### 问题3：部分地区可以访问，部分地区不行

**原因**：DNS 传播未完成

**解决**：等待 24-48 小时，DNS 会逐步在全球生效

### 问题4：域名解析正确但仍无法访问

**可能原因**：
1. Nginx server_name 配置不匹配
2. 防火墙阻止了域名访问
3. 浏览器缓存问题

**解决**：
```bash
# 检查 Nginx 配置
nginx -t
systemctl reload nginx

# 使用 curl 测试（绕过浏览器缓存）
curl -H "Host: www.wauramoon.com" http://47.109.197.249
```

## 快速检查命令

```bash
# 1. 检查域名解析
dig www.wauramoon.com +short
# 应该返回：47.109.197.249

# 2. 检查 Nginx 配置
nginx -t

# 3. 测试域名访问（在服务器上）
curl -H "Host: www.wauramoon.com" http://localhost

# 4. 查看 Nginx 访问日志
tail -f /www/wwwlogs/瓦闻.log
```

## 推荐配置

### 完整的 DNS 记录配置

```
类型    主机记录    记录值            TTL
A       www        47.109.197.249    600
A       @          47.109.197.249    600  (可选，支持根域名访问)
```

### Nginx 配置建议

```nginx
server {
    listen 80;
    server_name www.wauramoon.com wauramoon.com;

    # ... 其他配置保持不变
}
```

## 验证步骤

1. ✅ 检查 DNS 解析：`dig www.wauramoon.com`
2. ✅ 检查 Nginx 配置：`nginx -t`
3. ✅ 测试本地访问：`curl -H "Host: www.wauramoon.com" http://localhost`
4. ✅ 清除本地 DNS 缓存
5. ✅ 等待 DNS 传播（10分钟-48小时）


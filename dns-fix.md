# DNS 配置修复指南

## 问题确认

根据 `dig` 命令结果：
- **域名解析到的 IP**：`47.109.197.24` ❌
- **实际服务器 IP**：`47.109.197.249` ✅

**IP 地址不匹配**，导致浏览器无法访问域名。

## 解决步骤

### 1. 登录域名注册商

登录你的域名注册商管理后台（如：阿里云、腾讯云、GoDaddy、Namecheap 等）

### 2. 找到 DNS 解析设置

在域名管理页面找到：
- "DNS 解析"
- "域名解析"
- "DNS 管理"
- "DNS Records"

### 3. 修改 A 记录

找到现有的 A 记录：
```
类型: A
主机记录: www
记录值: 47.109.197.24  ← 这是错误的！
TTL: 600
```

**修改为**：
```
类型: A
主机记录: www
记录值: 47.109.197.249  ← 改为正确的 IP
TTL: 600
```

### 4. 保存并等待生效

- 保存 DNS 记录修改
- **等待 10 分钟到 2 小时**让 DNS 全球生效

### 5. 验证修复

等待一段时间后，再次运行：

```bash
dig www.wauramoon.com +short
# 应该返回：47.109.197.249
```

或者使用在线工具检查：
- https://dnschecker.org/
- https://tool.chinaz.com/dns/

## 常见域名注册商操作指南

### 阿里云
1. 登录阿里云控制台
2. 进入「域名」→「解析设置」
3. 找到 `www` 的 A 记录
4. 点击「修改」，将记录值改为 `47.109.197.249`
5. 保存

### 腾讯云
1. 登录腾讯云控制台
2. 进入「域名注册」→「我的域名」
3. 点击域名进入「解析」
4. 找到 `www` 的 A 记录
5. 点击「修改」，将记录值改为 `47.109.197.249`
6. 保存

### GoDaddy
1. 登录 GoDaddy
2. 进入「My Products」→「DNS」
3. 找到 `www` 的 A 记录
4. 点击编辑，将 Points to 改为 `47.109.197.249`
5. 保存

## 验证步骤

### 步骤 1：检查 DNS 解析（本地）

```bash
# 清除本地 DNS 缓存
# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches

# 再次检查
dig www.wauramoon.com +short
# 应该返回：47.109.197.249
```

### 步骤 2：测试访问

```bash
# 使用 curl 测试
curl -I http://www.wauramoon.com

# 或在浏览器访问
http://www.wauramoon.com
```

### 步骤 3：检查 Nginx 日志

在服务器上查看访问日志：

```bash
tail -f /www/wwwlogs/瓦闻.log
```

如果看到来自域名的访问请求，说明 DNS 已生效。

## 完整 DNS 记录建议

建议同时配置以下记录：

| 记录类型 | 主机记录 | 记录值 | TTL | 说明 |
|---------|---------|--------|-----|------|
| A | www | 47.109.197.249 | 600 | www.wauramoon.com |
| A | @ | 47.109.197.249 | 600 | wauramoon.com（可选） |

## 时间线

- **0 分钟**：修改 DNS 记录
- **5-10 分钟**：部分 DNS 服务器开始更新
- **30 分钟-2 小时**：大部分地区 DNS 生效
- **24-48 小时**：全球 DNS 完全生效

## 故障排查

如果修改后仍无法访问：

1. **确认 DNS 记录已保存**
   - 在域名注册商后台再次检查记录值

2. **检查 DNS 传播状态**
   - 使用 https://dnschecker.org/ 检查全球解析状态
   - 如果大部分地区显示 `47.109.197.249`，说明已生效

3. **清除浏览器缓存**
   - 按 `Ctrl+Shift+Delete`（Windows）或 `Cmd+Shift+Delete`（Mac）
   - 清除缓存和 Cookie

4. **使用无痕模式测试**
   - 打开浏览器的无痕/隐私模式
   - 访问 `http://www.wauramoon.com`

5. **检查 Nginx 配置**
   ```bash
   # 确保 server_name 包含域名
   nginx -t
   systemctl reload nginx
   ```

## 快速检查清单

- [ ] 在域名注册商修改 A 记录为 `47.109.197.249`
- [ ] 保存 DNS 记录修改
- [ ] 等待 10-30 分钟
- [ ] 清除本地 DNS 缓存
- [ ] 使用 `dig` 验证解析结果
- [ ] 清除浏览器缓存
- [ ] 在浏览器中测试访问


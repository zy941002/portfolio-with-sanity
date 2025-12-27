# DNS_PROBE_FINISHED_NXDOMAIN 错误修复指南

## 错误说明

`DNS_PROBE_FINISHED_NXDOMAIN` 表示：
- **域名在 DNS 中不存在**
- DNS 服务器无法找到该域名的任何记录
- 域名可能未配置 DNS 记录，或 DNS 服务器配置错误

这与之前的 IP 地址错误不同，这是**完全无法解析域名**。

## 快速诊断

### 1. 检查域名解析状态

在本地运行：

```bash
# Mac/Linux
dig www.wauramoon.com
nslookup www.wauramoon.com

# Windows
nslookup www.wauramoon.com
```

**如果返回 `NXDOMAIN` 或 "Non-existent domain"**，说明 DNS 记录确实不存在。

### 2. 在线检查工具

访问以下网站检查：
- https://dnschecker.org/ - 输入 `www.wauramoon.com`
- https://www.whatsmydns.net/ - 检查全球解析状态
- https://tool.chinaz.com/dns/ - 中国 DNS 检查

如果所有工具都显示 "No records found" 或 "NXDOMAIN"，说明 DNS 记录未配置。

## 解决方案

### 方案 1：检查并添加 DNS A 记录（最常见）

#### 步骤 1：登录域名注册商

登录你的域名注册商管理后台：
- 阿里云
- 腾讯云
- GoDaddy
- Namecheap
- 其他注册商

#### 步骤 2：找到 DNS 解析设置

在域名管理页面找到：
- "DNS 解析"
- "域名解析"
- "DNS 管理"
- "DNS Records"
- "DNS Settings"

#### 步骤 3：检查现有记录

查看是否已有 `www` 的 A 记录：
- 如果**没有记录**：需要添加
- 如果**有记录但被删除**：需要重新添加
- 如果**记录值错误**：需要修改

#### 步骤 4：添加/修改 A 记录

添加以下 DNS 记录：

| 记录类型 | 主机记录 | 记录值 | TTL | 说明 |
|---------|---------|--------|-----|------|
| A | www | 47.109.197.249 | 600 | www.wauramoon.com |
| A | @ | 47.109.197.249 | 600 | wauramoon.com（可选） |

**重要**：
- 主机记录 `www` 表示 `www.wauramoon.com`
- 主机记录 `@` 表示根域名 `wauramoon.com`
- 记录值必须是 `47.109.197.249`（你的服务器 IP）

#### 步骤 5：保存并等待

- 保存 DNS 记录
- **等待 10 分钟到 2 小时**让 DNS 生效

### 方案 2：检查 DNS 服务器配置

如果已添加 A 记录但仍显示 NXDOMAIN，可能是 DNS 服务器配置问题。

#### 检查域名使用的 DNS 服务器

```bash
# 查看域名的 DNS 服务器
dig NS wauramoon.com +short
```

#### 确保使用正确的 DNS 服务器

在域名注册商处检查：
1. **DNS 服务器设置**是否正确
2. 是否使用了**自定义 DNS 服务器**（如 Cloudflare、阿里云 DNS）
3. 如果使用自定义 DNS，需要在**该 DNS 服务商**添加 A 记录

### 方案 3：检查域名状态

#### 检查域名是否过期

```bash
# 检查域名到期时间
whois wauramoon.com | grep -i expire
```

如果域名已过期，需要续费。

#### 检查域名是否被暂停

在域名注册商后台检查域名状态，确保：
- 域名状态为 "正常" 或 "Active"
- 没有被暂停或锁定

## 常见域名注册商操作指南

### 阿里云

1. 登录阿里云控制台
2. 进入「域名」→「我的域名」
3. 找到 `wauramoon.com`，点击「解析设置」
4. 点击「添加记录」
5. 填写：
   - 记录类型：`A`
   - 主机记录：`www`
   - 记录值：`47.109.197.249`
   - TTL：`600`
6. 点击「确认」保存
7. （可选）再添加一条根域名记录：
   - 记录类型：`A`
   - 主机记录：`@`
   - 记录值：`47.109.197.249`
   - TTL：`600`

### 腾讯云

1. 登录腾讯云控制台
2. 进入「域名注册」→「我的域名」
3. 找到 `wauramoon.com`，点击「解析」
4. 点击「添加记录」
5. 填写：
   - 主机记录：`www`
   - 记录类型：`A`
   - 线路类型：`默认`
   - 记录值：`47.109.197.249`
   - TTL：`600`
6. 点击「保存」

### GoDaddy

1. 登录 GoDaddy
2. 进入「My Products」→ 找到 `wauramoon.com` → 点击「DNS」
3. 在 "Records" 部分，点击「Add」
4. 填写：
   - Type: `A`
   - Name: `www`
   - Value: `47.109.197.249`
   - TTL: `600`
5. 点击「Save」

## 验证修复

### 步骤 1：等待 DNS 传播（10-30 分钟）

DNS 记录修改后需要时间传播到全球 DNS 服务器。

### 步骤 2：清除本地 DNS 缓存

```bash
# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches
# 或
sudo /etc/init.d/nscd restart
```

### 步骤 2.5：清除浏览器 DNS 缓存

浏览器也会缓存 DNS 记录，清除缓存可以确保使用最新的 DNS 解析结果。

#### Chrome / Edge（Chromium）

**方法 1：通过开发者工具（推荐）**
1. 打开 Chrome，按 `F12` 或 `Cmd+Option+I`（Mac）/ `Ctrl+Shift+I`（Windows）打开开发者工具
2. 右键点击浏览器左上角的**刷新按钮**（保持开发者工具打开）
3. 选择 **"清空缓存并硬性重新加载"**（Empty Cache and Hard Reload）

**方法 2：通过设置清除缓存**
1. 按 `Ctrl+Shift+Delete`（Windows/Linux）或 `Cmd+Shift+Delete`（Mac）
2. 选择时间范围：**"全部时间"** 或 **"过去 24 小时"**
3. 勾选 **"缓存的图片和文件"**
4. 点击 **"清除数据"**

**方法 3：通过地址栏**
1. 在地址栏输入：`chrome://net-internals/#dns`
2. 点击 **"Clear host cache"** 按钮

#### Firefox

**方法 1：通过设置清除缓存**
1. 按 `Ctrl+Shift+Delete`（Windows/Linux）或 `Cmd+Shift+Delete`（Mac）
2. 选择时间范围：**"全部"**
3. 勾选 **"缓存"**
4. 点击 **"立即清除"**

**方法 2：通过 about:config**
1. 在地址栏输入：`about:config`
2. 搜索 `network.dnsCacheExpiration`，将其值设置为 `0`（临时禁用缓存）
3. 刷新页面后，再将其改回原值或删除该设置

**方法 3：硬刷新**
- 按 `Ctrl+F5`（Windows/Linux）或 `Cmd+Shift+R`（Mac）

#### Safari

**方法 1：通过设置清除缓存**
1. 按 `Cmd+Option+E` 清空缓存
2. 或者：Safari → 偏好设置 → 高级 → 勾选 "显示开发菜单"
3. 然后：开发菜单 → 清空缓存

**方法 2：通过终端（Mac）**
```bash
# 清除 Safari DNS 缓存
killall -HUP mDNSResponder
```

#### 通用方法：无痕模式测试

如果清除缓存后仍有问题，使用**无痕/隐私模式**测试：
- **Chrome/Edge**: `Ctrl+Shift+N`（Windows）/ `Cmd+Shift+N`（Mac）
- **Firefox**: `Ctrl+Shift+P`（Windows）/ `Cmd+Shift+P`（Mac）
- **Safari**: `Cmd+Shift+N`

无痕模式不使用缓存，可以验证是否为缓存问题。

### 步骤 3：验证 DNS 解析

```bash
# 检查解析
dig www.wauramoon.com +short
# 应该返回：47.109.197.249

# 或使用 nslookup
nslookup www.wauramoon.com
# 应该显示：47.109.197.249
```

### 步骤 4：测试访问

```bash
# 使用 curl 测试
curl -I http://www.wauramoon.com

# 在浏览器访问
http://www.wauramoon.com
```

## 故障排查

### 问题 1：添加记录后仍显示 NXDOMAIN

**可能原因**：
1. DNS 记录未保存成功
2. 使用了错误的 DNS 服务器
3. DNS 传播未完成

**解决**：
1. 在域名注册商后台**再次确认**记录已保存
2. 使用 https://dnschecker.org/ 检查全球解析状态
3. 等待更长时间（最多 48 小时）

### 问题 2：部分工具显示有记录，部分显示 NXDOMAIN

**原因**：DNS 传播未完成

**解决**：等待 24-48 小时，DNS 会逐步在全球生效

### 问题 3：dig 显示有记录，但浏览器仍报错

**可能原因**：
1. 浏览器缓存
2. 本地 DNS 缓存
3. 使用了错误的 DNS 服务器

**解决**：
```bash
# 清除所有缓存
# 1. 清除本地 DNS 缓存（见上方）
# 2. 清除浏览器缓存（Ctrl+Shift+Delete）
# 3. 使用无痕模式测试
# 4. 尝试使用其他 DNS 服务器（如 8.8.8.8）
```

### 问题 4：域名注册商显示记录已添加，但 dig 仍显示 NXDOMAIN

**可能原因**：
1. 使用了自定义 DNS 服务器（如 Cloudflare），需要在自定义 DNS 服务商添加记录
2. DNS 服务器配置错误

**解决**：
1. 检查域名使用的 DNS 服务器：`dig NS wauramoon.com +short`
2. 如果使用自定义 DNS（如 `ns1.cloudflare.com`），需要在 Cloudflare 添加记录
3. 如果使用注册商默认 DNS，确保在注册商添加记录

## 完整检查清单

- [ ] 登录域名注册商后台
- [ ] 检查是否有 `www` 的 A 记录
- [ ] 如果没有，添加 A 记录：`www` → `47.109.197.249`
- [ ] （可选）添加根域名记录：`@` → `47.109.197.249`
- [ ] 保存 DNS 记录
- [ ] 等待 10-30 分钟
- [ ] 清除本地 DNS 缓存
- [ ] 使用 `dig` 或 `nslookup` 验证解析
- [ ] 使用在线工具（dnschecker.org）检查全球解析
- [ ] 清除浏览器缓存
- [ ] 在浏览器中测试访问

## 快速命令参考

```bash
# 1. 检查域名解析
dig www.wauramoon.com +short
nslookup www.wauramoon.com

# 2. 检查 DNS 服务器
dig NS wauramoon.com +short

# 3. 清除本地 DNS 缓存（Mac）
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# 4. 测试访问
curl -I http://www.wauramoon.com

# 5. 使用特定 DNS 服务器测试
dig @8.8.8.8 www.wauramoon.com +short
```

## 时间线

- **0 分钟**：在域名注册商添加/修改 DNS 记录
- **5-10 分钟**：部分 DNS 服务器开始更新
- **30 分钟-2 小时**：大部分地区 DNS 生效
- **24-48 小时**：全球 DNS 完全生效

## 如果问题仍然存在

1. **联系域名注册商客服**，确认：
   - 域名状态是否正常
   - DNS 记录是否已正确保存
   - 是否有其他限制或问题

2. **检查域名是否使用了第三方 DNS 服务**（如 Cloudflare）：
   - 如果是，需要在第三方服务商添加记录
   - 不是域名注册商

3. **使用在线 DNS 检查工具**确认全球解析状态：
   - https://dnschecker.org/
   - 如果大部分地区显示正确 IP，说明已生效，只需等待本地更新


# Nginx 配置优化指南

## 📋 优化内容

### ✅ 1. 字体文件缓存优化（重点）

针对刚刚优化的 WOFF2 字体文件，添加了专门的缓存配置：

```nginx
location ~* \.(woff2|woff|ttf|otf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Access-Control-Allow-Origin "*";
}
```

**效果**：
- 字体文件缓存 1 年，减少重复下载
- 使用 `immutable` 标记，告诉浏览器文件不会改变
- 支持跨域访问（如果需要在 CDN 上使用）

### ✅ 2. 静态资源缓存分层

- **字体文件**：1 年缓存（长期不变）
- **图片文件**：30 天缓存
- **CSS/JS**：7 天缓存
- **Next.js 静态资源**：1 年缓存（`/_next/static/`）

### ✅ 3. SSL/TLS 安全优化

- 移除了不安全的 TLSv1.1
- 仅保留 TLSv1.2 和 TLSv1.3
- 添加了安全响应头：
  - `Strict-Transport-Security`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `X-XSS-Protection`

### ✅ 4. HTTP/2 配置优化

- 移除了单独的 `http2 on;`（已在 `listen` 指令中配置）
- 注释掉了 QUIC/HTTP3（需要 Nginx 编译支持）

### ✅ 5. 代理配置优化

- 添加了 `X-Forwarded-Proto` 头（Next.js 需要）
- 优化了缓冲设置
- 动态内容禁用缓存，静态内容启用缓存

## 🚀 性能提升预期

1. **字体加载速度**：减少 61% 文件大小 + 长期缓存 = 显著提升
2. **页面加载速度**：静态资源缓存减少重复请求
3. **服务器负载**：减少对后端 Next.js 的请求

## 📝 使用方法

### 方法 1：直接替换（推荐）

1. 备份原配置文件：
```bash
cp /www/server/panel/vhost/nginx/瓦闻.conf /www/server/panel/vhost/nginx/瓦闻.conf.backup
```

2. 将优化后的配置复制到服务器：
```bash
# 在本地项目目录
scp nginx-optimized.conf user@server:/www/server/panel/vhost/nginx/瓦闻.conf
```

3. 测试配置：
```bash
nginx -t
```

4. 重载 Nginx：
```bash
nginx -s reload
# 或使用宝塔面板重载
```

### 方法 2：手动合并

将优化配置中的以下部分添加到你的现有配置：

1. **字体文件缓存配置**（最重要）
2. **图片文件缓存配置**
3. **CSS/JS 缓存配置**
4. **安全头配置**

## ⚠️ 注意事项

1. **QUIC/HTTP3**：如果服务器不支持，请保持注释状态
2. **缓存清除**：如果更新了字体文件，需要清除浏览器缓存或更改文件名
3. **测试**：部署前务必测试所有页面，确保字体正常加载
4. **备份**：修改前务必备份原配置文件

## 🔍 验证优化效果

### 1. 检查字体缓存

在浏览器开发者工具中：
- Network 标签 → 查看字体文件
- 应该看到 `Cache-Control: public, immutable`
- 第二次访问应该显示 `(from disk cache)`

### 2. 检查文件大小

```bash
# 在服务器上检查字体文件
ls -lh /www/portfolio-with-sanity/public/fonts/方正兰亭黑_GBK.*
```

应该看到：
- `方正兰亭黑_GBK.woff2` - 约 2.9MB
- `方正兰亭黑_GBK.TTF` - 约 7.4MB（降级方案）

### 3. 性能测试

使用以下工具测试：
- Chrome DevTools → Network 标签
- Lighthouse 性能评分
- WebPageTest: https://www.webpagetest.org/

## 📊 优化前后对比

| 项目 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 字体文件大小 | 7.4MB | 2.9MB | ↓ 61% |
| 字体缓存 | 无 | 1年 | ✅ |
| 静态资源缓存 | 无 | 分层缓存 | ✅ |
| SSL 协议 | TLSv1.1-1.3 | TLSv1.2-1.3 | ✅ |
| 安全头 | 部分 | 完整 | ✅ |

## 🎯 下一步优化建议

1. **启用 Brotli 压缩**（如果 Nginx 支持）
2. **使用 CDN**：将字体文件放到 CDN 上
3. **字体子集化**：如果只使用部分字符，可以进一步减小文件
4. **HTTP/3**：如果服务器支持，可以启用 QUIC

## 📞 问题排查

如果遇到问题：

1. **字体不显示**：
   - 检查文件路径是否正确
   - 检查 CORS 头是否正确
   - 检查浏览器控制台错误

2. **缓存不生效**：
   - 检查 `expires` 和 `Cache-Control` 头
   - 清除浏览器缓存测试

3. **配置错误**：
   - 运行 `nginx -t` 检查语法
   - 查看错误日志：`/www/wwwlogs/瓦闻.error.log`


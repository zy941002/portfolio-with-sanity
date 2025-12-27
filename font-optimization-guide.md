# 字体加载优化指南

## 当前问题

`方正兰亭黑_GBK.TTF` 字体文件大小为 **7.4MB**，导致浏览器加载非常慢。

## 已实施的优化

### ✅ 1. 添加字体预加载（Preload）

在 `_app.tsx` 中添加了字体预加载，让浏览器提前开始下载字体文件：

```tsx
<link
  rel="preload"
  href="/fonts/方正兰亭黑_GBK.TTF"
  as="font"
  type="font/ttf"
  crossOrigin="anonymous"
/>
```

**效果**：浏览器会在页面加载早期开始下载字体，而不是等到 CSS 解析后才开始。

### ✅ 2. 优化 CSS 字体定义

- **移除了重复的字体定义**：之前有 3 个相同的 `@font-face` 定义
- **添加了 `unicode-range`**：限制字体只加载中文字符范围，优化加载性能
- **保留了 `font-display: swap`**：确保文字在字体加载期间可见

## 进一步优化方案（推荐）

### 方案 1：转换为 WOFF2 格式（强烈推荐）

WOFF2 格式通常可以减小 50-70% 的文件大小，且现代浏览器都支持。

#### 转换步骤：

1. **安装字体转换工具**：

```bash
# 使用 fonttools (Python)
pip install fonttools brotli

# 或者使用在线工具：https://cloudconvert.com/ttf-to-woff2
# 或者使用 Node.js 工具
npm install -g ttf2woff2
```

2. **转换字体文件**：

```bash
# 使用 ttf2woff2
ttf2woff2 public/fonts/方正兰亭黑_GBK.TTF public/fonts/方正兰亭黑_GBK.woff2

# 或者使用 Python fonttools
pyftsubset public/fonts/方正兰亭黑_GBK.TTF --output-file=public/fonts/方正兰亭黑_GBK.woff2 --flavor=woff2
```

3. **更新 CSS**：

```css
@font-face {
  font-family: '方正兰亭细黑';
  src: url('/fonts/方正兰亭黑_GBK.woff2') format('woff2'),
       url('/fonts/方正兰亭黑_GBK.TTF') format('truetype'); /* 降级方案 */
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

**预期效果**：文件大小从 7.4MB 减少到约 2-3MB

### 方案 2：字体子集化（Subset）

只包含实际使用的字符，可以大幅减小文件大小。

#### 使用 pyftsubset：

```bash
# 安装
pip install fonttools brotli

# 创建字符列表（提取页面中使用的所有中文字符）
# 或者使用常用字符集
pyftsubset public/fonts/方正兰亭黑_GBK.TTF \
  --output-file=public/fonts/方正兰亭黑_GBK.subset.woff2 \
  --text-file=常用汉字.txt \
  --flavor=woff2 \
  --layout-features='*' \
  --glyph-names \
  --symbol-cmap \
  --legacy-cmap \
  --notdef-glyph \
  --notdef-outline \
  --recommended-glyphs

# 或者使用 Unicode 范围（常用汉字）
pyftsubset public/fonts/方正兰亭黑_GBK.TTF \
  --output-file=public/fonts/方正兰亭黑_GBK.subset.woff2 \
  --unicodes="U+4E00-9FFF,U+3400-4DBF" \
  --flavor=woff2
```

#### 在线工具（推荐，简单易用）：

1. **Font Squirrel Webfont Generator**: https://www.fontsquirrel.com/tools/webfont-generator
2. **Transfonter**: https://transfonter.org/
3. **CloudConvert**: https://cloudconvert.com/ttf-to-woff2

**预期效果**：如果只包含常用汉字（3000-5000 个字符），文件大小可能减少到 500KB-1MB

### 方案 3：使用 CDN（可选）

将字体文件放到 CDN 上，利用 CDN 的全球加速：

```css
@font-face {
  font-family: '方正兰亭细黑';
  src: url('https://cdn.example.com/fonts/方正兰亭黑_GBK.woff2') format('woff2');
  font-display: swap;
}
```

### 方案 4：延迟加载非关键字体

对于非首屏使用的字体，可以延迟加载：

```css
.chinese {
  font-family: '方正兰亭细黑', 'Noto Serif SC', serif;
  /* 先使用系统字体，字体加载后再切换 */
}

/* 字体加载完成后再应用 */
.chinese.font-loaded {
  font-family: '方正兰亭细黑', sans-serif;
}
```

```tsx
// 在组件中检测字体加载
useEffect(() => {
  if ('fonts' in document) {
    document.fonts.load('16px 方正兰亭细黑').then(() => {
      document.documentElement.classList.add('font-loaded');
    });
  }
}, []);
```

## 推荐的最佳实践组合

1. ✅ **已实施**：添加预加载 + 优化 CSS
2. 🔄 **强烈推荐**：转换为 WOFF2 格式（可立即减少 50-70% 大小）
3. 🔄 **进一步优化**：字体子集化（如果只使用部分字符）
4. 📝 **可选**：使用 CDN 加速

## 快速优化脚本

创建一个优化脚本 `scripts/optimize-fonts.sh`：

```bash
#!/bin/bash

# 转换字体为 WOFF2
echo "正在转换字体为 WOFF2 格式..."

# 需要先安装工具
# npm install -g ttf2woff2
# 或 pip install fonttools brotli

# 转换主要字体
if command -v ttf2woff2 &> /dev/null; then
  ttf2woff2 public/fonts/方正兰亭黑_GBK.TTF public/fonts/方正兰亭黑_GBK.woff2
  echo "✅ 转换完成"
elif command -v pyftsubset &> /dev/null; then
  pyftsubset public/fonts/方正兰亭黑_GBK.TTF \
    --output-file=public/fonts/方正兰亭黑_GBK.woff2 \
    --unicodes="U+4E00-9FFF,U+3400-4DBF" \
    --flavor=woff2
  echo "✅ 转换完成"
else
  echo "❌ 请先安装 ttf2woff2 或 fonttools"
  echo "   npm install -g ttf2woff2"
  echo "   或 pip install fonttools brotli"
fi

# 显示文件大小对比
echo ""
echo "文件大小对比："
ls -lh public/fonts/方正兰亭黑_GBK.*
```

## 测试优化效果

优化后，使用以下工具测试：

1. **Chrome DevTools**：
   - Network 标签查看字体加载时间
   - Coverage 标签查看未使用的字体资源

2. **Lighthouse**：
   ```bash
   npx lighthouse https://www.wauramoon.com --view
   ```

3. **WebPageTest**：
   - https://www.webpagetest.org/

## 注意事项

⚠️ **字体版权**：确保你有使用和转换字体的合法权利

⚠️ **测试覆盖**：转换后需要测试所有页面，确保所需字符都包含在内

⚠️ **降级方案**：始终提供 TTF 作为降级方案，以确保旧浏览器兼容性

## 当前字体文件大小对比

```
134K  GOTHIC.TTF          ✅ 正常
127K  GOTHICB.TTF         ✅ 正常
136K  GOTHICBI.TTF        ✅ 正常
145K  GOTHICI.TTF         ✅ 正常
2.8M  MPLUS中文像素.TTF   ⚠️ 较大，建议优化
5.4M  方正兰亭细黑.TTF    ⚠️ 较大，建议优化
7.4M  方正兰亭黑_GBK.TTF  ❌ 很大，急需优化
```

## 下一步行动

1. ✅ 已完成：添加预加载和优化 CSS
2. 🔄 下一步：将 `方正兰亭黑_GBK.TTF` 转换为 WOFF2 格式
3. 🔄 可选：对字体进行子集化处理
4. 📝 长期：考虑使用更轻量的中文字体替代方案


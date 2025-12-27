#!/bin/bash

# ERR_CONNECTION_CLOSED 诊断脚本
# 在服务器上运行此脚本进行快速诊断

echo "=========================================="
echo "ERR_CONNECTION_CLOSED 诊断脚本"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 检查 Next.js 进程
echo "1. 检查 Next.js 进程..."
NEXT_PROCESS=$(ps aux | grep -E "next|node.*start" | grep -v grep)
if [ -z "$NEXT_PROCESS" ]; then
    echo -e "${RED}❌ Next.js 进程未运行${NC}"
else
    echo -e "${GREEN}✅ Next.js 进程正在运行:${NC}"
    echo "$NEXT_PROCESS"
fi
echo ""

# 2. 检查端口监听
echo "2. 检查端口 3000 监听状态..."
PORT_LISTEN=$(netstat -tlnp 2>/dev/null | grep :3000 || ss -tlnp 2>/dev/null | grep :3000)
if [ -z "$PORT_LISTEN" ]; then
    echo -e "${RED}❌ 端口 3000 未在监听${NC}"
else
    echo -e "${GREEN}✅ 端口监听状态:${NC}"
    echo "$PORT_LISTEN"
    
    # 检查是否监听 0.0.0.0
    if echo "$PORT_LISTEN" | grep -q "0.0.0.0:3000\|:::3000"; then
        echo -e "${GREEN}✅ 正确监听在 0.0.0.0:3000${NC}"
    elif echo "$PORT_LISTEN" | grep -q "127.0.0.1:3000"; then
        echo -e "${YELLOW}⚠️  只监听在 127.0.0.1:3000，Nginx 可能无法连接${NC}"
    fi
fi
echo ""

# 3. 测试本地连接
echo "3. 测试本地连接..."
LOCAL_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
if [ "$LOCAL_TEST" = "200" ] || [ "$LOCAL_TEST" = "000" ]; then
    if [ "$LOCAL_TEST" = "200" ]; then
        echo -e "${GREEN}✅ 本地连接成功 (HTTP $LOCAL_TEST)${NC}"
        echo "响应内容预览:"
        curl -s http://localhost:3000 | head -5
    else
        echo -e "${RED}❌ 本地连接失败 (无法连接)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  本地连接返回 HTTP $LOCAL_TEST${NC}"
fi
echo ""

# 4. 检查 Nginx 状态
echo "4. 检查 Nginx 状态..."
if command -v systemctl > /dev/null; then
    NGINX_STATUS=$(systemctl is-active nginx 2>/dev/null)
    if [ "$NGINX_STATUS" = "active" ]; then
        echo -e "${GREEN}✅ Nginx 正在运行${NC}"
    else
        echo -e "${RED}❌ Nginx 未运行 (状态: $NGINX_STATUS)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  无法检查 Nginx 状态 (systemctl 不可用)${NC}"
fi
echo ""

# 5. 检查 Nginx 配置
echo "5. 检查 Nginx 配置语法..."
if command -v nginx > /dev/null; then
    NGINX_TEST=$(nginx -t 2>&1)
    if echo "$NGINX_TEST" | grep -q "syntax is ok"; then
        echo -e "${GREEN}✅ Nginx 配置语法正确${NC}"
    else
        echo -e "${RED}❌ Nginx 配置有错误:${NC}"
        echo "$NGINX_TEST"
    fi
else
    echo -e "${YELLOW}⚠️  nginx 命令不可用${NC}"
fi
echo ""

# 6. 检查 Nginx 错误日志
echo "6. 检查最近的 Nginx 错误日志..."
LOG_FILES=(
    "/www/wwwlogs/瓦闻.error.log"
    "/var/log/nginx/error.log"
    "/etc/nginx/logs/error.log"
)

LOG_FOUND=false
for LOG_FILE in "${LOG_FILES[@]}"; do
    if [ -f "$LOG_FILE" ]; then
        echo -e "${GREEN}找到日志文件: $LOG_FILE${NC}"
        echo "最近 10 条错误:"
        tail -10 "$LOG_FILE" 2>/dev/null | grep -i error || echo "  无错误记录"
        LOG_FOUND=true
        break
    fi
done

if [ "$LOG_FOUND" = false ]; then
    echo -e "${YELLOW}⚠️  未找到 Nginx 错误日志文件${NC}"
fi
echo ""

# 7. 检查项目目录和构建
echo "7. 检查项目状态..."
PROJECT_DIR="/www/portfolio-with-sanity"
if [ -d "$PROJECT_DIR" ]; then
    echo -e "${GREEN}✅ 项目目录存在: $PROJECT_DIR${NC}"
    
    if [ -d "$PROJECT_DIR/.next" ]; then
        echo -e "${GREEN}✅ .next 构建目录存在${NC}"
    else
        echo -e "${RED}❌ .next 构建目录不存在，需要运行 npm run build${NC}"
    fi
    
    if [ -f "$PROJECT_DIR/package.json" ]; then
        echo -e "${GREEN}✅ package.json 存在${NC}"
    fi
else
    echo -e "${RED}❌ 项目目录不存在: $PROJECT_DIR${NC}"
fi
echo ""

# 8. 测试 Nginx 代理
echo "8. 测试 Nginx 代理..."
PROXY_TEST=$(curl -s -o /dev/null -w "%{http_code}" -H "Host: www.wauramoon.com" http://localhost 2>/dev/null)
if [ "$PROXY_TEST" = "200" ]; then
    echo -e "${GREEN}✅ Nginx 代理工作正常 (HTTP $PROXY_TEST)${NC}"
elif [ "$PROXY_TEST" = "000" ]; then
    echo -e "${RED}❌ Nginx 代理连接失败${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx 代理返回 HTTP $PROXY_TEST${NC}"
fi
echo ""

# 总结
echo "=========================================="
echo "诊断完成"
echo "=========================================="
echo ""
echo "如果发现问题，请参考以下修复步骤:"
echo "1. 如果 Next.js 未运行: cd $PROJECT_DIR && npm start"
echo "2. 如果端口未监听: 检查启动命令和进程状态"
echo "3. 如果 Nginx 配置错误: nginx -t 查看详细错误"
echo "4. 查看完整日志: tail -100 /www/wwwlogs/瓦闻.error.log"




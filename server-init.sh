#!/bin/bash
# 服务器初始化脚本 - 首次部署时在服务器上执行

set -e  # 遇到错误立即退出

echo "=== 开始初始化服务器环境 ==="

# 1. 创建项目目录
echo "1. 创建项目目录..."
sudo mkdir -p /opt/ewu
sudo chown -R $USER:$USER /opt/ewu
cd /opt/ewu

# 2. 克隆仓库
echo "2. 克隆 GitHub 仓库..."
if [ -d ".git" ]; then
    echo "仓库已存在，执行 git pull..."
    git pull origin master
else
    echo "克隆新仓库..."
    git clone https://github.com/superanet/ewu.git .
fi

# 3. 创建 .env 文件
echo "3. 创建 .env 文件..."
cat > .env << 'EOF'
# 数据库配置（使用Neon云数据库）
DATABASE_URL=your_database_url_here
POSTGRES_URL=your_database_url_here

# NextAuth 配置
NEXTAUTH_URL=https://ewutech.top
NEXTAUTH_SECRET=your_nextauth_secret_here
AUTH_SECRET=your_auth_secret_here

# Stripe 支付配置（可选）
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# 应用配置
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
EOF

echo ""
echo "=== 初始化完成 ==="
echo ""
echo "下一步操作："
echo "1. 编辑 .env 文件，填入实际的环境变量值："
echo "   nano /opt/ewu/.env"
echo ""
echo "2. 确保 Docker 和 Docker Compose 已安装"
echo ""
echo "3. 手动触发 GitHub Actions 部署，或推送代码触发自动部署"
echo ""

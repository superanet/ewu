#!/bin/bash

# 易物地质勘察平台 - 自动部署脚本
# 用于在服务器上自动化部署流程

set -e

echo "=========================================="
echo "开始部署易物地质勘察平台"
echo "=========================================="

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 项目目录
PROJECT_DIR="/opt/ewu"

# 检查是否在项目目录
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}错误: 项目目录不存在: $PROJECT_DIR${NC}"
    exit 1
fi

cd $PROJECT_DIR

# 1. 拉取最新代码
echo -e "${YELLOW}[1/5] 拉取最新代码...${NC}"
git pull origin master

# 2. 停止并删除旧容器
echo -e "${YELLOW}[2/5] 停止旧容器...${NC}"
docker-compose down

# 3. 构建新镜像
echo -e "${YELLOW}[3/5] 构建新镜像...${NC}"
docker-compose build --no-cache

# 4. 启动新容器
echo -e "${YELLOW}[4/5] 启动新容器...${NC}"
docker-compose up -d

# 5. 清理未使用的镜像
echo -e "${YELLOW}[5/5] 清理未使用的镜像...${NC}"
docker image prune -f

# 显示容器状态
echo -e "${GREEN}=========================================="
echo "部署完成！容器状态："
echo -e "==========================================${NC}"
docker-compose ps

# 显示最近的日志
echo -e "${GREEN}=========================================="
echo "最近的应用日志："
echo -e "==========================================${NC}"
docker-compose logs --tail=20 app

echo -e "${GREEN}部署成功完成！${NC}"

# CI/CD 快速开始指南

## 已完成的配置

✅ **Docker 配置**
- `Dockerfile` - 多阶段构建配置
- `docker-compose.yml` - 应用和数据库编排
- `.dockerignore` - 构建优化

✅ **GitHub Actions 配置**
- `.github/workflows/deploy.yml` - 自动部署工作流

✅ **部署脚本**
- `deploy.sh` - 服务器端部署脚本

✅ **环境配置**
- `.env.example` - 环境变量模板
- `next.config.ts` - 添加 standalone 输出

✅ **文档**
- `DEPLOYMENT.md` - 详细部署文档
- `CI-CD-CHECKLIST.md` - 测试清单

## 下一步操作

### 1. 配置 GitHub Secrets

进入 GitHub 仓库 `Settings` > `Secrets and variables` > `Actions`，添加：

```
SERVER_HOST=117.72.40.122
SERVER_USER=root
SERVER_PORT=22
SSH_PRIVATE_KEY=<生成的私钥>
DATABASE_URL=postgresql://postgres:密码@postgres:5432/ewu
NEXTAUTH_URL=https://ewutech.top
NEXTAUTH_SECRET=<使用 openssl rand -base64 32 生成>
```

### 2. 服务器初始化

SSH 连接到服务器并执行：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 创建项目目录
sudo mkdir -p /opt/ewu
sudo chown -R $USER:$USER /opt/ewu

# 克隆项目
cd /opt/ewu
git clone <你的仓库地址> .

# 配置环境变量
cp .env.example .env
nano .env  # 填入实际配置

# 赋予执行权限
chmod +x deploy.sh
```

### 3. 配置 SSH 密钥

```bash
# 本地生成密钥
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/ewu_deploy

# 添加公钥到服务器
ssh-copy-id -i ~/.ssh/ewu_deploy.pub root@117.72.40.122

# 将私钥内容添加到 GitHub Secrets
cat ~/.ssh/ewu_deploy
```

### 4. 测试部署

```bash
# 推送代码触发自动部署
git add .
git commit -m "feat: 配置 CI/CD"
git push origin master

# 在 GitHub Actions 中查看部署进度
```

### 5. 配置 SSL（可选）

```bash
# 安装 Nginx 和 Certbot
sudo apt install nginx certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d ewutech.top
```

## 详细文档

- 📖 [完整部署文档](./DEPLOYMENT.md)
- ✅ [测试清单](./CI-CD-CHECKLIST.md)

## 工作流程

```
本地开发 → 提交代码 → 推送到 GitHub
    ↓
GitHub Actions 自动触发
    ↓
构建 Docker 镜像 → SSH 连接服务器
    ↓
拉取代码 → 重建容器 → 部署完成
```

## 需要帮助？

查看详细文档或联系技术团队。

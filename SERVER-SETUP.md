# 服务器初始化指南

本指南帮助你在阿里云服务器上首次部署 ewu 项目。

## 前置要求

服务器上需要安装：
- Git
- Docker
- Docker Compose

## 步骤 1：上传初始化脚本到服务器

在本地执行：

```bash
scp -P <端口号> server-init.sh <用户名>@117.72.40.122:/tmp/
```

例如：
```bash
scp -P 22 server-init.sh root@117.72.40.122:/tmp/
```

## 步骤 2：SSH 登录到服务器

```bash
ssh -p <端口号> <用户名>@117.72.40.122
```

## 步骤 3：执行初始化脚本

```bash
cd /tmp
chmod +x server-init.sh
./server-init.sh
```

脚本会自动：
- 创建 `/opt/ewu` 目录
- 克隆 GitHub 仓库
- 创建 `.env` 模板文件

## 步骤 4：配置环境变量

编辑 `.env` 文件：

```bash
cd /opt/ewu
nano .env
```

填入以下实际值：

```env
# 数据库配置（从 Neon 获取）
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
POSTGRES_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require

# NextAuth 配置
NEXTAUTH_URL=https://ewutech.top
NEXTAUTH_SECRET=<使用 openssl rand -base64 32 生成>
AUTH_SECRET=<使用 openssl rand -base64 32 生成>

# Stripe 配置（可选，如不使用可以填占位符）
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# 应用配置
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

保存并退出（Ctrl+X，然后 Y，然后 Enter）。

## 步骤 5：验证 Docker 环境

确保 Docker 和 Docker Compose 已安装并运行：

```bash
docker --version
docker-compose --version
sudo systemctl status docker
```

如果 Docker 未安装，请先安装：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
```

## 步骤 6：手动测试部署

在服务器上手动测试部署：

```bash
cd /opt/ewu
docker-compose down
docker-compose up -d --build
docker-compose logs --tail=50
```

查看容器状态：

```bash
docker-compose ps
```

## 步骤 7：触发 GitHub Actions 自动部署

服务器初始化完成后，可以通过以下方式触发自动部署：

### 方式 1：推送代码触发

在本地推送任何代码到 master 分支即可触发自动部署。

### 方式 2：手动触发

访问 GitHub Actions 页面手动触发：
https://github.com/superanet/ewu/actions

点击 "Deploy to Alibaba Cloud" 工作流，然后点击 "Run workflow"。

## 步骤 8：验证部署

部署成功后，访问：
- https://ewutech.top

检查应用是否正常运行。

## 故障排查

### 查看容器日志

```bash
cd /opt/ewu
docker-compose logs -f app
```

### 重启容器

```bash
docker-compose restart
```

### 完全重新构建

```bash
docker-compose down
docker-compose up -d --build
```

## 注意事项

1. 确保服务器防火墙开放 3000 端口
2. 确保域名 ewutech.top 已正确解析到服务器 IP
3. 如需 HTTPS，需要配置 Nginx 反向代理和 SSL 证书

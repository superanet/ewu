# 部署文档

## 概述

本文档说明如何将易物地质勘察平台部署到阿里云服务器。

## 前置要求

- 阿里云服务器（Ubuntu/Debian）
- Docker 和 Docker Compose 已安装
- 域名已配置（ewutech.top）
- GitHub 仓库访问权限

## 一、服务器初始化

### 1.1 安装必要软件

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo apt install docker-compose -y

# 安装 Git
sudo apt install git -y
```

### 1.2 创建项目目录

```bash
# 创建项目目录
sudo mkdir -p /opt/ewu
sudo chown -R $USER:$USER /opt/ewu

# 克隆项目
cd /opt/ewu
git clone https://github.com/your-username/ewu.git .
```

### 1.3 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑环境变量文件
nano .env
```

填入以下配置：

```env
# 数据库配置
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=ewu
DATABASE_URL=postgresql://postgres:your_secure_password_here@postgres:5432/ewu

# NextAuth 配置
NEXTAUTH_URL=https://ewutech.top
NEXTAUTH_SECRET=your_nextauth_secret_here

# 应用配置
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 1.4 生成 NextAuth Secret

```bash
# 生成随机密钥
openssl rand -base64 32
```

将生成的密钥填入 `.env` 文件的 `NEXTAUTH_SECRET` 字段。

## 二、配置 GitHub Secrets

在 GitHub 仓库中配置以下 Secrets：

### 2.1 进入 GitHub Secrets 设置

1. 打开 GitHub 仓库
2. 点击 `Settings` > `Secrets and variables` > `Actions`
3. 点击 `New repository secret`

### 2.2 添加以下 Secrets

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `SERVER_HOST` | 服务器 IP 地址 | `117.72.40.122` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SERVER_PORT` | SSH 端口 | `22` |
| `SSH_PRIVATE_KEY` | SSH 私钥 | 见下方说明 |
| `DATABASE_URL` | 数据库连接字符串 | `postgresql://...` |
| `NEXTAUTH_URL` | 应用 URL | `https://ewutech.top` |
| `NEXTAUTH_SECRET` | NextAuth 密钥 | 使用 openssl 生成 |

### 2.3 生成 SSH 密钥对

在本地机器上生成 SSH 密钥对：

```bash
# 生成 SSH 密钥对
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/ewu_deploy

# 查看公钥
cat ~/.ssh/ewu_deploy.pub

# 查看私钥
cat ~/.ssh/ewu_deploy
```

将公钥添加到服务器：

```bash
# 在服务器上执行
mkdir -p ~/.ssh
echo "your_public_key_here" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

将私钥内容复制到 GitHub Secrets 的 `SSH_PRIVATE_KEY` 字段。

## 三、部署流程

### 3.1 自动部署

当代码推送到 `master` 分支时，GitHub Actions 会自动触发部署流程：

1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖
4. 运行类型检查
5. 通过 SSH 连接到服务器
6. 拉取最新代码
7. 重新构建并启动 Docker 容器

### 3.2 手动部署

在服务器上手动部署：

```bash
cd /opt/ewu
./deploy.sh
```

### 3.3 查看日志

```bash
# 查看所有容器日志
docker-compose logs -f

# 查看应用日志
docker-compose logs -f app

# 查看数据库日志
docker-compose logs -f postgres
```

### 3.4 重启服务

```bash
# 重启所有服务
docker-compose restart

# 重启应用服务
docker-compose restart app
```

## 四、SSL 证书配置

### 4.1 使用 Nginx 反向代理

建议使用 Nginx 作为反向代理并配置 SSL 证书：

```bash
# 安装 Nginx
sudo apt install nginx -y

# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取 SSL 证书
sudo certbot --nginx -d ewutech.top
```

### 4.2 Nginx 配置示例

```nginx
server {
    listen 80;
    server_name ewutech.top;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ewutech.top;

    ssl_certificate /etc/letsencrypt/live/ewutech.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ewutech.top/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 五、故障排查

### 5.1 容器无法启动

```bash
# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs app

# 重新构建镜像
docker-compose build --no-cache
docker-compose up -d
```

### 5.2 数据库连接失败

```bash
# 检查数据库容器状态
docker-compose ps postgres

# 检查数据库日志
docker-compose logs postgres

# 测试数据库连接
docker-compose exec postgres psql -U postgres -d ewu
```

### 5.3 GitHub Actions 部署失败

1. 检查 GitHub Actions 日志
2. 验证 GitHub Secrets 配置是否正确
3. 确认服务器 SSH 连接正常
4. 检查服务器磁盘空间

## 六、维护建议

### 6.1 定期备份

```bash
# 备份数据库
docker-compose exec postgres pg_dump -U postgres ewu > backup_$(date +%Y%m%d).sql

# 备份到远程
scp backup_*.sql user@backup-server:/backups/
```

### 6.2 监控日志

```bash
# 实时监控应用日志
docker-compose logs -f --tail=100 app
```

### 6.3 更新依赖

定期更新 Docker 镜像和应用依赖：

```bash
# 拉取最新镜像
docker-compose pull

# 重新构建
docker-compose up -d --build
```

## 七、安全建议

1. 定期更新系统和软件包
2. 使用强密码和密钥
3. 配置防火墙规则
4. 启用 fail2ban 防止暴力破解
5. 定期备份数据
6. 监控服务器资源使用情况

## 联系方式

如有问题，请联系技术团队。

# CI/CD 测试清单

## 一、部署前检查

### 1.1 本地环境检查

- [ ] 确认所有代码已提交到 Git
- [ ] 确认 `next.config.ts` 包含 `output: 'standalone'`
- [ ] 确认 `Dockerfile` 存在且配置正确
- [ ] 确认 `docker-compose.yml` 存在且配置正确
- [ ] 确认 `.dockerignore` 存在
- [ ] 确认 `.env.example` 包含所有必需的环境变量

### 1.2 GitHub 配置检查

- [ ] 确认代码已推送到 GitHub 仓库
- [ ] 确认 `.github/workflows/deploy.yml` 存在
- [ ] 确认 GitHub Actions 已启用

### 1.3 GitHub Secrets 配置

进入 `Settings` > `Secrets and variables` > `Actions`，确认以下 Secrets 已配置：

- [ ] `SERVER_HOST` - 服务器 IP (117.72.40.122)
- [ ] `SERVER_USER` - SSH 用户名 (root)
- [ ] `SERVER_PORT` - SSH 端口 (22)
- [ ] `SSH_PRIVATE_KEY` - SSH 私钥
- [ ] `DATABASE_URL` - 数据库连接字符串
- [ ] `NEXTAUTH_URL` - 应用 URL (https://ewutech.top)
- [ ] `NEXTAUTH_SECRET` - NextAuth 密钥

## 二、服务器初始化

### 2.1 SSH 连接测试

```bash
# 测试 SSH 连接
ssh root@117.72.40.122

# 如果连接成功，继续下一步
```

### 2.2 安装必要软件

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 验证 Docker 安装
docker --version
docker-compose --version

# 安装 Git
sudo apt install git -y
git --version
```

### 2.3 创建项目目录

```bash
# 创建项目目录
sudo mkdir -p /opt/ewu
sudo chown -R $USER:$USER /opt/ewu

# 克隆项目
cd /opt/ewu
git clone https://github.com/your-username/ewu.git .
```

### 2.4 配置环境变量

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑环境变量
nano .env
```

填入实际配置值：
- 数据库密码
- NextAuth Secret (使用 `openssl rand -base64 32` 生成)
- 其他必需的环境变量

### 2.5 配置 SSH 密钥

```bash
# 在本地生成 SSH 密钥对
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/ewu_deploy

# 将公钥添加到服务器
ssh-copy-id -i ~/.ssh/ewu_deploy.pub root@117.72.40.122

# 测试密钥登录
ssh -i ~/.ssh/ewu_deploy root@117.72.40.122
```

将私钥内容添加到 GitHub Secrets 的 `SSH_PRIVATE_KEY`。

## 三、测试部署流程

### 3.1 手动部署测试

在服务器上手动测试部署：

```bash
cd /opt/ewu

# 赋予部署脚本执行权限
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh
```

检查输出：
- [ ] 代码拉取成功
- [ ] Docker 镜像构建成功
- [ ] 容器启动成功
- [ ] 应用日志正常

### 3.2 验证容器状态

```bash
# 查看容器状态
docker-compose ps

# 应该看到两个容器运行中：
# - ewu-postgres (healthy)
# - ewu-app (running)
```

### 3.3 验证应用访问

```bash
# 测试应用是否响应
curl http://localhost:3000

# 应该返回 HTML 内容
```

### 3.4 验证数据库连接

```bash
# 进入数据库容器
docker-compose exec postgres psql -U postgres -d ewu

# 执行测试查询
\dt

# 退出
\q
```

## 四、测试 GitHub Actions

### 4.1 触发自动部署

```bash
# 在本地做一个小改动
echo "# Test CI/CD" >> README.md

# 提交并推送
git add README.md
git commit -m "test: 测试 CI/CD 流程"
git push origin master
```

### 4.2 监控 GitHub Actions

1. 打开 GitHub 仓库
2. 点击 `Actions` 标签
3. 查看最新的工作流运行
4. 确认所有步骤都成功完成

### 4.3 验证部署结果

在服务器上检查：

```bash
# 查看最新的 Git 提交
cd /opt/ewu
git log -1

# 查看容器日志
docker-compose logs --tail=50 app

# 验证应用是否更新
curl http://localhost:3000
```

## 五、配置 SSL 证书

### 5.1 安装 Nginx

```bash
sudo apt install nginx -y
sudo systemctl status nginx
```

### 5.2 配置 Nginx 反向代理

```bash
# 创建 Nginx 配置
sudo nano /etc/nginx/sites-available/ewu
```

添加配置（见 DEPLOYMENT.md）。

### 5.3 安装 SSL 证书

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书
sudo certbot --nginx -d ewutech.top

# 测试自动续期
sudo certbot renew --dry-run
```

### 5.4 验证 HTTPS 访问

```bash
# 测试 HTTPS 访问
curl https://ewutech.top

# 在浏览器中访问
# https://ewutech.top
```

## 六、故障排查

### 6.1 GitHub Actions 失败

**问题：SSH 连接失败**
- 检查 `SERVER_HOST` 是否正确
- 检查 `SSH_PRIVATE_KEY` 是否完整
- 检查服务器防火墙设置
- 验证 SSH 密钥是否已添加到服务器

**问题：Docker 构建失败**
- 检查 Dockerfile 语法
- 检查依赖安装是否成功
- 查看构建日志

### 6.2 容器启动失败

```bash
# 查看详细日志
docker-compose logs app

# 常见问题：
# - 环境变量未配置
# - 数据库连接失败
# - 端口被占用
```

### 6.3 数据库连接失败

```bash
# 检查数据库容器状态
docker-compose ps postgres

# 检查数据库日志
docker-compose logs postgres

# 验证环境变量
cat .env | grep DATABASE_URL
```

## 七、完成确认

所有检查项完成后，确认：

- [ ] 本地可以推送代码到 GitHub
- [ ] GitHub Actions 自动触发并成功执行
- [ ] 服务器自动拉取最新代码
- [ ] Docker 容器自动重建并启动
- [ ] 应用可以通过域名访问
- [ ] HTTPS 证书配置正确
- [ ] 数据库连接正常
- [ ] 日志输出正常

## 八、后续维护

### 8.1 监控建议

- 设置服务器监控（CPU、内存、磁盘）
- 配置日志轮转
- 定期备份数据库
- 监控应用错误日志

### 8.2 更新流程

日常开发流程：
1. 本地开发并测试
2. 提交代码到 GitHub
3. GitHub Actions 自动部署
4. 验证部署结果

## 完成！

CI/CD 流程配置完成。现在每次推送代码到 master 分支，都会自动部署到服务器。

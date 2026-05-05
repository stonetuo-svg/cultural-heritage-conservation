# 文化遗产保护与利用 - 网站项目

基于 MkDocs + Material 主题构建的静态网站

## 项目结构

```
website/
├── mkdocs.yml          # MkDocs 配置文件
├── docs/
│   ├── index.html      # 首页（可独立预览）
│   ├── about.md        # 关于页面
│   ├── chapters/       # 章节内容
│   │   ├── chapter1.md ~ chapter7.md  # 各章概述
│   │   └── 1-1.md ~ 7-6.md            # 详细内容
│   ├── cases/          # 案例库
│   │   ├── index.md
│   │   ├── settlement.md
│   │   ├── architecture.md
│   │   ├── intangible.md
│   │   ├── industry.md
│   │   └── folklore.md
│   ├── stylesheets/
│   │   └── extra.css
│   └── images/         # 图片目录
└── README.md
```

## 快速预览

### 方式一：直接打开 HTML（无需安装）

直接双击打开 `docs/index.html` 文件即可预览首页效果。

注意：HTML 预览版不包含完整导航和搜索功能。

### 方式二：使用 MkDocs 本地预览

1. 安装 Python（如果尚未安装）
2. 安装 MkDocs 和 Material 主题：

```bash
pip install mkdocs mkdocs-material
```

3. 在 `website` 目录下运行：

```bash
mkdocs serve
```

4. 打开浏览器访问 `http://127.0.0.1:8000`

## 功能特性

- ✅ 搜索功能
- ✅ 暗色/亮色主题切换
- ✅ 响应式设计
- ✅ 案例库导航
- ✅ 各章节简介

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库
2. 修改 `mkdocs.yml` 中的仓库地址
3. 运行部署命令：

```bash
mkdocs gh-deploy
```

## 联系信息

联系邮箱：sdtshi@scut.edu.cn

---

华南理工大学设计学院

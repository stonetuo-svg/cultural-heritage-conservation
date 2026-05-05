---
title: 章节概览
---

# 章节概览

本课程共分为七个章节，系统介绍文化遗产保护与利用的理论与实践。

---

## 章节总览

| 章节 | 主题 | 小节数 | 案例数 |
|------|------|--------|--------|
| 第一章 | 文化遗产概述 | 5 | 2 |
| 第二章 | 保护发展历程 | 4 | 2 |
| 第三章 | 聚落文化遗产 | 5 | 3 |
| 第四章 | 建筑文化遗产 | 5 | 3 |
| 第五章 | 非物质文化遗产 | 5 | 3 |
| 第六章 | 产业文化遗产 | 6 | 3 |
| 第七章 | 民俗文物 | 6 | 3 |

---

## 学习路径

```mermaid
graph LR
    A[第一章 概述] --> B[第二章 历程]
    B --> C[第三章 聚落]
    B --> D[第四章 建筑]
    B --> E[第五章 非遗]
    C --> F[第六章 产业]
    D --> G[第七章 民俗]
```

---

## 快速导航

<div class="chapter-quick-nav">

[第一章 文化遗产概述](chapters/chapter1/)
: 概念界定、价值体系、国际保护体系、中国保护制度

[第二章 保护发展历程](chapters/chapter2/)
: 国际发展、中国发展、基本原则、主要方法

[第三章 聚落文化遗产](chapters/chapter3/)
: 认知基础、保护原则、实践、更新利用、制度保障

[第四章 建筑文化遗产](chapters/chapter4/)
: 概念类型、保护技术、管理、活化利用、城市更新

[第五章 非物质文化遗产](chapters/chapter5/)
: 概念特征、保护原则、措施、传承发展、数字化保护

[第六章 产业文化遗产](chapters/chapter6/)
: 概述、农业遗产、工业遗产、手工业遗产、交通水利、商业服务

[第七章 民俗文物](chapters/chapter7/)
: 概念类型、保护利用、分类特征、调查认定、保护技术、展示传播

</div>

<style>

.chapter-quick-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.chapter-quick-nav a {
    display: block;
    background: var(--md-surface-bg-color);
    border: 1px solid var(--md-typeset-table-border-color);
    border-radius: 10px;
    padding: 1rem;
    text-decoration: none;
    transition: all 0.2s ease;
}

.chapter-quick-nav a:hover {
    border-color: var(--md-primary-fg-color);
    box-shadow: 0 4px 15px rgba(0, 105, 92, 0.1);
    transform: translateY(-2px);
}

.chapter-quick-nav strong {
    color: var(--md-primary-fg-color);
    display: block;
    margin-bottom: 0.5rem;
}

.chapter-quick-nav p {
    font-size: 0.85rem;
    color: var(--md-typeset-color);
    margin: 0;
}

</style>

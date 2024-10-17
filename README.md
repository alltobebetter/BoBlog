# BoBlog / 轻量级简洁博客文档系统

## 项目简介

MDUI Project 是一个基于 MDUI 框架的响应式网页应用程序。它提供了一个简洁、现代的用户界面，支持动态加载 Markdown 内容、主题切换和响应式设计。

## 特性

- 响应式设计，适配桌面和移动设备
- 动态侧边栏菜单
- Markdown 内容渲染
- 明暗主题切换
- 平滑的过渡动画效果

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- [MDUI](https://www.mdui.org/) - Material Design 风格的前端框架
- [Marked](https://marked.js.org/) - Markdown 解析器

## 安装

1. 克隆仓库：
   ```
   git clone https://github.com/your-username/mdui-project.git
   ```
2. 进入项目目录：
   ```
   cd mdui-project
   ```
3. 使用您喜欢的网页服务器启动项目。例如，如果您安装了 Python，可以使用：
   ```
   python -m http.server 8000
   ```
   然后在浏览器中访问 `http://localhost:8000`。

## 使用说明

1. 创建 `sidebar.md` 文件来定义侧边栏菜单项。格式如下：
   ```
   [icon][菜单名称][文件路径]
   ```
   例如：
   ```
   [home][首页][home.md]
   [info][关于][about.md]
   ```

2. 为每个菜单项创建对应的 Markdown 文件，放置在项目根目录下。

3. 打开 `index.html` 文件，您将看到基于 `sidebar.md` 生成的菜单，点击菜单项可以加载对应的 Markdown 内容。

4. 使用右上角的图标切换明暗主题。

## 自定义

- 修改 `<style>` 标签中的 CSS 来自定义界面样式。
- 在 `<script>` 标签中修改 JavaScript 代码来调整功能。

## 贡献

欢迎提交 issues 和 pull requests 来帮助改进这个项目。

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 联系方式

如果您有任何问题或建议，请通过以下方式联系我们：

- 邮箱：your-email@example.com
- GitHub：[您的 GitHub 主页]

感谢您使用 BoBlog.

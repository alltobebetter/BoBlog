document.addEventListener('DOMContentLoaded', function() {
    const $ = mdui.$;
    const sidebar = $('#sidebar-menu');
    const cardTitle = $('#card-title');
    const cardContent = $('#card-content');
    const themeToggle = $('#theme-toggle');

    // 加载侧边栏内容
    fetch('sidebar.md')
        .then(response => response.text())
        .then(text => {
            console.log('成功加载 sidebar.md');
            const lines = text.split('\n');
            lines.forEach(line => {
                const match = line.match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]/);
                if (match) {
                    const [, icon, name, path] = match;
                    const li = $('<li class="mdui-list-item mdui-ripple">');
                    li.html(`
                        <i class="mdui-list-item-icon mdui-icon material-icons">${icon}</i>
                        <div class="mdui-list-item-content">${name}</div>
                    `);
                    li.on('click', () => loadContent(path, name));
                    sidebar.append(li);
                }
            });
            console.log('侧边栏菜单项已创建');
            // 默认加载第一个菜单项
            if (lines.length > 0) {
                const firstMatch = lines[0].match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]/);
                if (firstMatch) {
                    loadContent(firstMatch[3], firstMatch[2]);
                }
            }
        })
        .catch(error => {
            console.error('加载 sidebar.md 失败:', error);
            sidebar.html('<li class="mdui-list-item">加载菜单失败</li>');
        });

    // 加载内容
    function loadContent(path, title) {
        fetch(path)
            .then(response => response.text())
            .then(markdown => {
                cardTitle.text(title);
                const html = DOMPurify.sanitize(marked.parse(markdown));
                cardContent.html(html);
            })
            .catch(error => {
                console.error('加载内容出错:', error);
                cardTitle.text('错误');
                cardContent.html('<p>无法加载内容</p>');
            });
    }

    // 切换主题
    themeToggle.on('click', () => {
        $('body').toggleClass('mdui-theme-layout-dark');
        const icon = themeToggle.find('i');
        icon.text(icon.text() === 'brightness_4' ? 'brightness_5' : 'brightness_4');
    });
});

// 存储所有 Markdown 文件的内容
const markdownContents = {};

// 读取sidebar.md并生成菜单
fetch('sidebar.md')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        const sidebarMenu = document.getElementById('sidebar-menu');
        lines.forEach(line => {
            const match = line.match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]/);
            if (match) {
                const [, icon, name, path] = match;
                const li = document.createElement('li');
                li.className = 'mdui-list-item mdui-ripple';
                li.innerHTML = `
                    <i class="mdui-list-item-icon mdui-icon material-icons">${icon}</i>
                    <div class="mdui-list-item-content">${name}</div>
                `;
                li.addEventListener('click', () => loadContent(path));
                sidebarMenu.appendChild(li);
            }
        });
        // 默认加载第一个菜单项
        if (lines.length > 0) {
            const firstPath = lines[0].match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]/)[3];
            loadContent(firstPath);
        }
    });

// 加载内容
function loadContent(path) {
    fetch(path)
        .then(response => response.text())
        .then(markdown => {
            document.getElementById('content').innerHTML = marked.parse(markdown);
            document.querySelector('.content-card').style.display = 'block';
            document.getElementById('search-container').style.display = 'none';
        });
}

// 切换主题
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('mdui-theme-layout-dark');
    const icon = themeToggle.querySelector('i');
    icon.textContent = icon.textContent === 'brightness_4' ? 'brightness_7' : 'brightness_4';
});

// 获取所有 Markdown 文件的内容
function fetchAllMarkdownContents() {
    fetch('sidebar.md')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            lines.forEach(line => {
                const match = line.match(/\[(.*?)\]\[(.*?)\]\[(.*?)\]/);
                if (match) {
                    const [, , , path] = match;
                    fetch(path)
                        .then(response => response.text())
                        .then(content => {
                            markdownContents[path] = content;
                        });
                }
            });
        });
}

// 搜索功能
function searchContent(query) {
    const results = [];
    for (const [path, content] of Object.entries(markdownContents)) {
        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push({ path, content });
        }
    }
    return results;
}

// 显示搜索结果
function displaySearchResults(results) {
    const searchContainer = document.getElementById('search-container');
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<p>没有找到匹配的结果。</p>';
    } else {
        results.forEach(result => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3><a href="#" onclick="loadContent('${result.path}'); return false;">${result.path}</a></h3>
                <p>${result.content.substring(0, 200)}...</p>
            `;
            searchResults.appendChild(div);
        });
    }

    searchContainer.style.display = 'block';
    document.querySelector('.content-card').style.display = 'none';
}

// 初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
    fetchAllMarkdownContents();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length >= 2) {
            const results = searchContent(query);
            displaySearchResults(results);
        } else {
            document.getElementById('search-container').style.display = 'none';
            document.querySelector('.content-card').style.display = 'block';
        }
    });
});

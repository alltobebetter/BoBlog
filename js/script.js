// 加载侧边栏内容
fetch('sidebar.md')
    .then(response => response.text())
    .then(data => {
        const sidebar = document.querySelector('#sidebar ul');
        const lines = data.trim().split('\n');
        lines.forEach(line => {
            const [icon, name, url] = line.substring(1, line.length - 1).split('][');
            const li = document.createElement('li');
            li.classList.add('mdui-list-item', 'mdui-ripple');
            li.innerHTML = `
                <a href="#${url}" class="mdui-list-item-content">
                    <i class="mdui-list-item-icon mdui-icon material-icons">${icon}</i>
                    ${name}
                </a>
            `;
            li.addEventListener('click', () => loadContent(url));
            sidebar.appendChild(li);
        });
    });

// 加载卡片内容
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const content = document.querySelector('#content');
            content.innerHTML = marked(data);
        });
}

// 默认加载第一个菜单内容
loadContent('/caidan/caidan1.md');

// 主题切换
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('mdui-theme-layout-dark');
});

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        toggle.checked = savedTheme === 'light';
    } else {
        html.setAttribute('data-theme', 'dark');
        toggle.checked = false;
    }

    toggle.addEventListener('change', () => {
        const theme = toggle.checked ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});

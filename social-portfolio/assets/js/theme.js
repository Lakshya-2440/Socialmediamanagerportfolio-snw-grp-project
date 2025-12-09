const themeToggles = document.querySelectorAll('.theme-toggle');
function applyTheme(theme) {
    if (theme === 'dark') { document.documentElement.classList.add('theme-dark'); document.body.classList.add('theme-dark'); document.body.classList.remove('theme-light'); localStorage.setItem('siteTheme', 'dark'); }
    else { document.documentElement.classList.remove('theme-dark'); document.body.classList.remove('theme-dark'); document.body.classList.add('theme-light'); localStorage.setItem('siteTheme', 'light'); }
}
themeToggles.forEach(btn => {
    btn.addEventListener('click', e => {
        const isDark = document.body.classList.contains('theme-dark');
        applyTheme(isDark ? 'light' : 'dark');
        btn.setAttribute('aria-pressed', String(!isDark));
    });
});
const saved = localStorage.getItem('siteTheme');
if (saved) { applyTheme(saved) } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) { applyTheme('dark') } else { applyTheme('light') }

const menus = document.querySelectorAll('.menu-toggle');
menus.forEach(btn => {
    btn.addEventListener('click', e => {
        const nav = btn.closest('.site-nav').querySelector('.nav-list');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (nav.style.display === 'flex') { nav.style.display = 'none' } else { nav.style.display = 'flex' }
    });
});

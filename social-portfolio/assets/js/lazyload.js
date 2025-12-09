document.addEventListener('DOMContentLoaded', () => {
    if ('loading' in HTMLImageElement.prototype) return;
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src') || img.getAttribute('src');
                if (img.dataset.src) img.src = img.dataset.src;
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });
    imgs.forEach(img => obs.observe(img));
});

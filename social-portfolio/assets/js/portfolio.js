document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(c => {
        const target = +c.getAttribute('data-target') || 0;
        let current = 0;
        const step = Math.max(1, Math.floor(target / 80));
        const run = () => {
            current += step;
            if (current > target) current = target;
            c.textContent = current;
            if (current < target) requestAnimationFrame(run);
        };
        run();
    });

    const postsGrid = document.getElementById('postsGrid');
    const searchInput = document.getElementById('searchPosts');
    if (searchInput && postsGrid) {
        searchInput.addEventListener('input', e => {
            const q = e.target.value.trim().toLowerCase();
            const items = postsGrid.querySelectorAll('.post-preview');
            items.forEach(item => {
                const title = item.getAttribute('data-title') || '';
                if (title.includes(q)) item.style.display = ''; else item.style.display = 'none';
            });
        });
    }

    const filterInput = document.getElementById('filterInput');
    if (filterInput) {
        filterInput.addEventListener('input', e => {
            const q = e.target.value.trim().toLowerCase();
            const cases = document.querySelectorAll('.case-card');
            cases.forEach(c => {
                const txt = c.textContent.toLowerCase();
                c.style.display = txt.includes(q) ? '' : 'none';
            });
        });
    }

    const testimonials = document.querySelectorAll('.testimonial');
    let testIndex = 0;
    const showTest = (i) => {
        testimonials.forEach((t, idx) => { t.classList.toggle('is-visible', idx === i); t.setAttribute('aria-hidden', String(idx !== i)) });
    };
    showTest(0);
    const nextBtn = document.querySelector('.test-next');
    const prevBtn = document.querySelector('.test-prev');
    nextBtn && nextBtn.addEventListener('click', () => { testIndex = (testIndex + 1) % testimonials.length; showTest(testIndex) });
    prevBtn && prevBtn.addEventListener('click', () => { testIndex = (testIndex - 1 + testimonials.length) % testimonials.length; showTest(testIndex) });
});

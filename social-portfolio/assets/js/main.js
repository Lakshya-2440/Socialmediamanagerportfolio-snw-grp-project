document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal, .hero-title, .case-card, .post-preview');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target) }
        });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));

    const form = document.getElementById('contactForm');
    if (form) {
        const feedback = document.getElementById('formFeedback');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            if (!name || !email || !message) { feedback.textContent = 'Please complete required fields'; feedback.style.color = 'var(--accent)'; return }
            feedback.style.color = 'var(--color-primary)';
            feedback.textContent = 'Sending...';
            setTimeout(() => {
                feedback.textContent = 'Thanks! I received your message and will respond within 2 business days.';
                form.reset();
            }, 900);
        });
    }

    const newsForm = document.getElementById('newsletterForm');
    if (newsForm) {
        newsForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = newsForm.querySelector('input[type="email"]').value;
            if (!email) return;
            newsForm.querySelector('input[type="email"]').value = '';
        });
    }
});

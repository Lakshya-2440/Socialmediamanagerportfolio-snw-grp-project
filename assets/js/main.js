const SMMPortfolio = {
    init() {
        this.initMobileMenu();
        this.initScrollAnimations();
        this.initNavbarScroll();
        this.initStatCounter();

        this.initModals();
    },

    initMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav-links');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                const isOpen = nav.classList.contains('active');
                toggle.textContent = isOpen ? '✕' : '☰';
                toggle.setAttribute('aria-expanded', isOpen);

                document.body.style.overflow = isOpen ? 'hidden' : '';
            });
        }
    },

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    },

    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    },

    initStatCounter() {
        const stats = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-target'));
                    const suffix = el.getAttribute('data-suffix') || '';
                    const duration = 2000; // 2 seconds
                    const steps = 60;
                    const stepTime = duration / steps;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }

                        // Format number: if integer, show as integer, otherwise 1 decimal place
                        const displayValue = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
                        el.textContent = displayValue + suffix;
                    }, stepTime);

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    },

    initModals() {
        window.openModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    window.closeModal(modal.id);
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    window.closeModal(modal.id);
                });
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SMMPortfolio.init();
});

class Carousel {
    constructor(element) {
        this.container = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = element.querySelector('.carousel-btn.next');
        this.prevButton = element.querySelector('.carousel-btn.prev');
        this.dotsContainer = element.querySelector('.carousel-dots');

        this.currentIndex = 0;
        this.isPlaying = true;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        if (this.nextButton) this.nextButton.addEventListener('click', () => this.next());
        if (this.prevButton) this.prevButton.addEventListener('click', () => this.prev());

        this.track.addEventListener('touchstart', e => this.touchStartX = e.changedTouches[0].screenX, { passive: true });
        this.track.addEventListener('touchend', e => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => this.play());

        this.updateSlidePosition();
        this.startAutoplay();
    }

    updateSlidePosition() {
        const slideWidth = this.slides[0].getBoundingClientRect().width;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        if (this.touchStartX - this.touchEndX > swipeThreshold) this.next();
        if (this.touchEndX - this.touchStartX > swipeThreshold) this.prev();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            if (this.isPlaying) this.next();
        }, 4000);
    }

    pause() {
        this.isPlaying = false;
    }

    play() {
        this.isPlaying = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-container').forEach(el => new Carousel(el));
});

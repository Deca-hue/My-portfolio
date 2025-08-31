class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.animateOnScroll = this.animateOnScroll.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver(this.animateOnScroll, this.observerOptions);
        this.setupObservers();
        this.setupScrollEvents();
    }
    
    setupObservers() {
        document.querySelectorAll('.observe').forEach(element => {
            this.observer.observe(element);
        });
    }
    
    animateOnScroll(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    setupScrollEvents() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Navbar shadow on scroll
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll(); // Initialize on load
    }
    
    handleScroll() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.add('shadow-sm');
            navbar.classList.remove('shadow-md');
        }
    }
}

  // Animate the progress bar to 100% over 1.5 seconds with percentage
window.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('progress-bar');
    const percent = document.getElementById('progress-percent');
    if (bar && percent) {
        let progress = 0;
        const duration = 1500; // ms
        const interval = 15; // ms
        const step = 100 / (duration / interval);

        const animate = setInterval(() => {
            progress += step;
            if (progress >= 100) {
                progress = 100;
                clearInterval(animate);
            }
            bar.style.width = progress + '%';
            percent.textContent = Math.round(progress) + '%';
        }, interval);
    }
});
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});
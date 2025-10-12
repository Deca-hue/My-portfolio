// Preloader Functionality
class Preloader {
    constructor() {
      this.preloader = document.getElementById('preloader');
      this.minDisplayTime = 2500; // Minimum display time in ms (2.5 seconds)
      this.startTime = Date.now();
      
      this.init();
    }
    
    init() {
      // Hide preloader when all assets are loaded
      window.addEventListener('load', () => {
        const elapsed = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minDisplayTime - elapsed);
        
        setTimeout(() => {
          this.hidePreloader();
          // Remove preloader styles after animation completes
          setTimeout(() => {
            const styleElement = document.getElementById('preloader-style');
            if (styleElement) {
              styleElement.remove();
            }
            this.preloader.remove();
          }, 500); // Match this with CSS transition time
        }, remainingTime);
      });
      
      // Fallback in case load event doesn't fire
      setTimeout(() => {
        if (this.preloader.style.opacity !== '0') {
          this.hidePreloader();
        }
      }, 5000); // 5 seconds maximum
    }
    
    hidePreloader() {
      this.preloader.style.opacity = '0';
      this.preloader.style.visibility = 'hidden';
    }
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new Preloader();
    // Your other initialization code...
  });

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const currentYearElement = document.getElementById('currentYear');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Intersection Observer for lazy loading and animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observe').forEach(section => {
        observer.observe(section);
    });
}
/* Remove/hide preloader after window fully loads */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (!pre) return;

  // smooth hide
  pre.classList.add('hidden');

  // optional: remove element after animation so it can't block anything
  setTimeout(() => {
    if (pre.parentNode) pre.parentNode.removeChild(pre);
  }, 400);
});

// Animated Counters in About Section
const counters = document.querySelectorAll('.count');
  let hasAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        counter.textContent = Math.floor(progress * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + (counter.dataset.target.includes('+') ? '+' : '');
        }
      }
      requestAnimationFrame(update);
    });
  }

  // Trigger when section scrolls into view
  const aboutSection = document.getElementById('about');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(aboutSection);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupIntersectionObserver);
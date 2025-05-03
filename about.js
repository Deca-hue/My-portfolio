// Animate elements when they come into view
 document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = () => {
        document.querySelectorAll('.animate-fade-in').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8);
            
            if (isVisible) {
                el.style.animationPlayState = 'running';
            }
        });
    };
    
    // Initialize animation state
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.animationPlayState = 'paused';
    });
    
    // Run on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8);
            
            if (isVisible) {
                bar.style.animation = 'skillBar 1.5s ease-out forwards';
            }
        });
    };
    
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    // Download CV button
    const downloadCV = document.querySelector('[href="#"]');
    if(downloadCV) {
        downloadCV.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with actual CV download logic
            alert('CV download functionality would be implemented here');
        });
    }
});
// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve input values
        const email = document.getElementById('email').value.trim();
        const name = document.getElementById('name').value.trim();

        // Input validation
        if (!email || !name) {
            alert('Please fill out both your name and email.');
            return;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Here you would typically send to your email service
        console.log('Subscribing:', name, email);

        // Simulate success response
        alert(`Thanks for subscribing, ${name}! You'll hear from me soon.`);

        // Reset the form
        newsletterForm.reset();
    });
}
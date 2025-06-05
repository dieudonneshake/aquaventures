// Mobile Navigation Toggle
const mobileNavBtn = document.getElementById('mobileNavBtn');
const mobileNav = document.getElementById('mobileNav');

mobileNavBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileNavBtn.innerHTML = mobileNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile nav when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

document.querySelector('.slider-prev').addEventListener('click', () => {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
});

document.querySelector('.slider-next').addEventListener('click', () => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
}, 5000);

// Pause auto-rotation when hovering
const testimonialSlider = document.querySelector('.testimonials-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
});

// Form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your booking request! We will contact you shortly.');
        this.reset();
    });
}

// Ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Set position
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    });
});

// Gallery lightbox (would need actual implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // In a real implementation, this would open a lightbox
        console.log('Opening image:', this.querySelector('img').src);
    });
});
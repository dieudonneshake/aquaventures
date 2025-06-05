// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.slide-up, .fade-in, .hover-float, .hover-grow');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Animate stats counters
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / speed;
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                setTimeout(updateNumber, 1);
            } else {
                stat.textContent = target;
            }
        };
        
        // Only animate when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.unobserve(stat);
            }
        });
        
        observer.observe(stat);
    });
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateStats();
    
    // 3D hover effect for about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            aboutImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        aboutImage.addEventListener('mouseenter', () => {
            aboutImage.style.transition = 'none';
        });
        
        aboutImage.addEventListener('mouseleave', () => {
            aboutImage.style.transition = 'transform 0.5s ease';
            aboutImage.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
    
    // Play button hover effect
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('mouseenter', () => {
            playButton.style.transform = 'scale(1.1)';
        });
        
        playButton.addEventListener('mouseleave', () => {
            playButton.style.transform = 'scale(1)';
        });
    }
    
    // Water wave animation
    const waterWave = document.querySelector('.water-wave');
    if (waterWave) {
        waterWave.style.animation = 'wave 15s linear infinite';
        waterWave.querySelector('::before').style.animation = 'wave-reverse 10s linear infinite';
        waterWave.querySelector('::after').style.animation = 'wave 20s linear infinite reverse';
    }
    
    // Initialize hover effects
    document.querySelectorAll('.hover-float').forEach(item => {
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    document.querySelectorAll('.hover-grow').forEach(item => {
        item.style.transition = 'transform 0.3s ease';
    });
    
    document.querySelectorAll('.hover-zoom').forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.style.transition = 'transform 0.5s ease';
        }
        
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.transition = 'opacity 0.3s ease';
        }
    });
    
    document.querySelectorAll('.hover-3d').forEach(item => {
        item.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
    
    document.querySelectorAll('.hover-underline').forEach(item => {
        item.style.transition = 'text-decoration 0.3s ease';
    });
});
// DOM Elements
const cursor = document.querySelector('.cursor');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const skillLevels = document.querySelectorAll('.skill-level');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const header = document.querySelector('header');

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    // Set skill level widths based on their inline style
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.setProperty('--width', width);
    });
    
    // Show custom cursor
    cursor.style.display = 'block';
    
    // Initialize AOS-like scroll animations
    initScrollAnimations();
});

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Scale effect on hoverable elements
    const hoverable = e.target.closest('a, button, .portfolio-item, .social-link');
    if (hoverable) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }
});

// Hide cursor when it leaves the window
document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
});

document.addEventListener('mouseover', () => {
    cursor.style.display = 'block';
});

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate skill bars when about section is visible
                if (entry.target.id === 'about') {
                    skillLevels.forEach(level => {
                        level.style.animationPlayState = 'running';
                    });
                }
                
                // Add staggered animation to portfolio items
                if (entry.target.id === 'work') {
                    portfolioItems.forEach((item, index) => {
                        item.style.animationDelay = `${index * 0.1}s`;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Sticky Header & Active Nav Links
window.addEventListener('scroll', () => {
    // Toggle header background opacity
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    // Update active navigation link
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // In a real implementation, you would send the form data to a server
        // For now, we'll just show a success message
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (formValues.name && formValues.email && formValues.message) {
            // Simulate sending form
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        }
    });
}

// Portfolio Item Hover Effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Random color animation for blobs
function animateBlobs() {
    const blobs = document.querySelectorAll('.gradient-blob');
    
    blobs.forEach((blob, index) => {
        // Create a random movement animation
        const xMovement = Math.random() * 20 - 10; // -10 to 10
        const yMovement = Math.random() * 20 - 10; // -10 to 10
        
        blob.animate([
            { transform: 'translate(0, 0) rotate(0deg)' },
            { transform: `translate(${xMovement}px, ${yMovement}px) rotate(${index * 5}deg)` },
            { transform: 'translate(0, 0) rotate(0deg)' }
        ], {
            duration: 8000 + index * 1000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    });
}

// Call blob animation on load
window.addEventListener('load', animateBlobs); 
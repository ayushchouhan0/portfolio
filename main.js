// Particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    const particleCount = window.innerWidth > 768 ? 50 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing effect for heading
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth scroll to sections
function smoothScroll(target) {
    document.querySelector(target)?.scrollIntoView({
        behavior: 'smooth'
    });
}

// Handle navbar scroll effects
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.loading');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('loaded');
            element.classList.remove('loading');
        }
    });
}

// Initialize loading animations
function initializeLoadingAnimations() {
    // Immediately show content by removing loading class and adding loaded class
    const loadingElements = document.querySelectorAll('.loading');
    
    loadingElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.remove('loading');
            element.classList.add('loaded');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200); // Stagger the animations
    });
}

// Handle responsive navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Smooth button interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize project cards interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize skill items hover effects
function initializeSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.background = 'rgba(100, 255, 218, 0.1)';
            this.style.borderColor = 'var(--text-accent)';
            this.style.color = 'var(--text-accent)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.borderColor = 'var(--border-color)';
            this.style.color = 'var(--text-primary)';
        });
    });
}

// Initialize contact items
function initializeContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Handle window resize for particles
function handleResize() {
    createParticles();
}

// Main initialization function
function init() {
    // Create particles
    createParticles();
    
    // Initialize loading animations immediately
    initializeLoadingAnimations();
    
    // Initialize all interactive elements
    initializeNavigation();
    initializeButtons();
    initializeProjectCards();
    initializeSkillItems();
    initializeContactItems();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        animateOnScroll();
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Initial scroll check
    handleNavbarScroll();
    animateOnScroll();
    
    // Apply typing effect to main heading if it exists
    const mainHeading = document.querySelector('.intro h1');
    if (mainHeading) {
        const originalText = mainHeading.textContent;
        setTimeout(() => {
            typeWriter(mainHeading, originalText, 80);
        }, 500);
    }
}

// Enhanced page load handling
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Additional fallback for ensuring content shows
window.addEventListener('load', () => {
    // Force show all content if still hidden after 2 seconds
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.loading');
        hiddenElements.forEach(element => {
            element.classList.remove('loading');
            element.classList.add('loaded');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 2000);
});

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            entry.target.classList.remove('loading');
        }
    });
}, observerOptions);

// Observe all loading elements
document.addEventListener('DOMContentLoaded', () => {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => observer.observe(el));
});

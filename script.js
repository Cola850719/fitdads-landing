// script.js

// ==================== NAVBAR ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');
const navLinkElements = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SCROLL REVEAL ANIMATION ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// ==================== FAQ ACCORDION ====================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all other FAQs
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            }
        });

        // Toggle current FAQ
        question.classList.toggle('active');
        answer.classList.toggle('active');
    });
});

// ==================== BILLING TOGGLE ====================
const billingToggle = document.getElementById('billingToggle');
const starterPrice = document.getElementById('starter-price');
const proPrice = document.getElementById('pro-price');
const elitePrice = document.getElementById('elite-price');

const prices = {
    monthly: { starter: 29, pro: 59, elite: 99 },
    yearly: { starter: 245, pro: 495, elite: 835 }
};

billingToggle.addEventListener('click', () => {
    billingToggle.classList.toggle('active');
    
    if (billingToggle.classList.contains('active')) {
        starterPrice.textContent = prices.yearly.starter;
        proPrice.textContent = prices.yearly.pro;
        elitePrice.textContent = prices.yearly.elite;
    } else {
        starterPrice.textContent = prices.monthly.starter;
        proPrice.textContent = prices.monthly.pro;
        elitePrice.textContent = prices.monthly.elite;
    }
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== BUTTON INTERACTIONS ====================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== HERO ANIMATIONS ON LOAD ====================
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-tag, .hero h1, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((element, index) => {
        element.style.opacity = '1';
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0px ${scrollY * 0.5}px`;
    }
});

// ==================== FORM VALIDATION ====================
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement?.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        this.parentElement?.classList.remove('focused');
    });
});

// ==================== ACCESSIBILITY: FOCUS MANAGEMENT ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ==================== PERFORMANCE: LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== STAGGER ANIMATION SETUP ====================
const staggerItems = document.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5, .stagger-6');
staggerItems.forEach(item => {
    const staggerClass = Array.from(item.classList).find(c => c.startsWith('stagger-'));
    const delay = parseInt(staggerClass.split('-')[1]) * 0.1;
    item.style.animationDelay = `${delay}s`;
});

console.log('✅ FitDads 40+ Landing Page Loaded Successfully');

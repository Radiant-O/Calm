// Meditation Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.meditation-slider .row');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    
    if (slider && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const slideWidth = 300; // Approximate width of each slide
        
        prevBtn.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - slideWidth, 0);
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            scrollAmount = Math.min(scrollAmount + slideWidth, slider.scrollWidth - slider.clientWidth);
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    
    // Responsive navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }
});

// Update greeting based on time of day
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.hero h1');
    
    if (greetingElement) {
        let timeOfDay = '';
        if (hour >= 5 && hour < 12) timeOfDay = 'Morning';
        else if (hour >= 12 && hour < 17) timeOfDay = 'Afternoon';
        else if (hour >= 17 && hour < 22) timeOfDay = 'Evening';
        else timeOfDay = 'Night';
        
        greetingElement.textContent = `Good ${timeOfDay}, Emmanuel`;
    }
}

updateGreeting();

// Breathing Exercise Animation
const breathingCircle = document.querySelector('.breathing-circle');
if (breathingCircle) {
    let isBreathingIn = true;
    
    function animateBreathing() {
        if (isBreathingIn) {
            breathingCircle.style.transform = 'scale(1.2)';
            document.querySelector('.breathing-text').textContent = 'IN';
        } else {
            breathingCircle.style.transform = 'scale(1)';
            document.querySelector('.breathing-text').textContent = 'OUT';
        }
        isBreathingIn = !isBreathingIn;
    }
    
    setInterval(animateBreathing, 4000); // 4 seconds per breath cycle
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Meditation slider functionality
const slider = document.querySelector('.meditation-slider .row');
const prevBtn = document.querySelector('.slider-controls .prev');
const nextBtn = document.querySelector('.slider-controls .next');

if (slider && prevBtn && nextBtn) {
    const cardWidth = 300; // Width of each card including margin
    const scrollAmount = cardWidth * 2; // Scroll two cards at a time

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.challenge-card, .meditation-card, .chat-message').forEach(el => {
    observer.observe(el);
});

// Add hover effect to cards
document.querySelectorAll('.challenge-card, .meditation-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Particle background effect for hero section
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
};

createParticles();

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const circle = document.createElement('span');
        circle.classList.add('ripple');
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        this.appendChild(circle);

        setTimeout(() => circle.remove(), 1000);
    });
});

// Typewriter effect for hero heading
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

const heroHeading = document.querySelector('.hero h1');
if (heroHeading) {
    const originalText = heroHeading.textContent;
    typeWriter(heroHeading, originalText);
}

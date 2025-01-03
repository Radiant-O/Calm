
document.addEventListener('DOMContentLoaded', function() {
    
    // Responsive navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Mobile Menu Handler
    const toggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    toggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbarCollapse.contains(event.target) || toggler.contains(event.target);
        if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
            toggler.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                toggler.setAttribute('aria-expanded', 'false');
            }
        });
    });
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

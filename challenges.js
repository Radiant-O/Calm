document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bar on load
    const progressBar = document.querySelector('.progress-bar');
    setTimeout(() => {
        progressBar.style.width = '60%';
    }, 500);

    // Add hover animations to step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        // Add staggered animation on load
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        card.style.opacity = '0';

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('completed')) {
                card.style.transform = 'translateX(10px)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('completed')) {
                card.style.transform = 'translateX(0)';
            }
        });
    });

    // Add click animation to "Start Now" button
    const startButton = document.querySelector('.step-card.active .btn');
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            const circle = document.createElement('div');
            circle.classList.add('click-circle');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            
            this.appendChild(circle);
            
            setTimeout(() => {
                circle.remove();
            }, 500);
        });
    }

    // Add parallax effect to challenge image
    const challengeImage = document.querySelector('.challenge-image');
    if (challengeImage) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            challengeImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});

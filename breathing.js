document.addEventListener('DOMContentLoaded', () => {
    const breathingCircle = document.querySelector('.breathing-circle');
    const circleText = document.querySelector('.circle-text');
    const timer = document.querySelector('.timer');
    const instruction = document.querySelector('.breathing-instruction');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    let isBreathing = false;
    let currentPhase = 'inhale';
    let breathCount = 0;
    
    const breathingPattern = {
        inhale: 4,
        holdIn: 4,
        exhale: 4,
        holdOut: 4
    };

    function updateTimer(seconds) {
        timer.textContent = `${seconds}s`;
    }

    function updateInstruction(text) {
        instruction.textContent = text;
        instruction.style.opacity = '0';
        instruction.style.transform = 'translateY(20px)';
        
        // Reset animation
        instruction.style.animation = 'none';
        instruction.offsetHeight; // Trigger reflow
        instruction.style.animation = 'fadeInUp 0.5s ease forwards';
    }

    function breathingAnimation() {
        if (!isBreathing) return;

        switch(currentPhase) {
            case 'inhale':
                breathingCircle.classList.add('inhale');
                breathingCircle.classList.remove('exhale');
                circleText.textContent = 'Inhale';
                updateInstruction('Breathe In');
                
                let inhaleCount = breathingPattern.inhale;
                const inhaleInterval = setInterval(() => {
                    if (!isBreathing) {
                        clearInterval(inhaleInterval);
                        return;
                    }
                    updateTimer(inhaleCount);
                    inhaleCount--;
                    if (inhaleCount < 0) {
                        clearInterval(inhaleInterval);
                        currentPhase = 'holdIn';
                        breathingAnimation();
                    }
                }, 1000);
                break;

            case 'holdIn':
                circleText.textContent = 'Hold';
                updateInstruction('Hold');
                
                let holdInCount = breathingPattern.holdIn;
                const holdInInterval = setInterval(() => {
                    if (!isBreathing) {
                        clearInterval(holdInInterval);
                        return;
                    }
                    updateTimer(holdInCount);
                    holdInCount--;
                    if (holdInCount < 0) {
                        clearInterval(holdInInterval);
                        currentPhase = 'exhale';
                        breathingAnimation();
                    }
                }, 1000);
                break;

            case 'exhale':
                breathingCircle.classList.remove('inhale');
                breathingCircle.classList.add('exhale');
                circleText.textContent = 'Exhale';
                updateInstruction('Breathe Out');
                
                let exhaleCount = breathingPattern.exhale;
                const exhaleInterval = setInterval(() => {
                    if (!isBreathing) {
                        clearInterval(exhaleInterval);
                        return;
                    }
                    updateTimer(exhaleCount);
                    exhaleCount--;
                    if (exhaleCount < 0) {
                        clearInterval(exhaleInterval);
                        currentPhase = 'holdOut';
                        breathingAnimation();
                    }
                }, 1000);
                break;

            case 'holdOut':
                circleText.textContent = 'Hold';
                updateInstruction('Hold');
                
                let holdOutCount = breathingPattern.holdOut;
                const holdOutInterval = setInterval(() => {
                    if (!isBreathing) {
                        clearInterval(holdOutInterval);
                        return;
                    }
                    updateTimer(holdOutCount);
                    holdOutCount--;
                    if (holdOutCount < 0) {
                        clearInterval(holdOutInterval);
                        breathCount++;
                        currentPhase = 'inhale';
                        breathingAnimation();
                    }
                }, 1000);
                break;
        }
    }

    startBtn.addEventListener('click', () => {
        if (!isBreathing) {
            isBreathing = true;
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
            breathingAnimation();
        }
    });

    pauseBtn.addEventListener('click', () => {
        isBreathing = false;
        startBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });

    resetBtn.addEventListener('click', () => {
        isBreathing = false;
        currentPhase = 'inhale';
        breathCount = 0;
        startBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
        breathingCircle.classList.remove('inhale', 'exhale');
        circleText.textContent = 'Breathe';
        updateTimer('4s');
        updateInstruction('Click Start to Begin');
    });

    // Initialize
    pauseBtn.style.display = 'none';
    updateInstruction('Click Start to Begin');
});

// Add click handlers for technique cards
document.querySelectorAll('.technique-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const techniqueName = this.closest('.technique-card').querySelector('h3').textContent;
        
        // Update breathing pattern based on technique
        switch(techniqueName) {
            case 'Box Breathing':
                breathingPattern = {
                    inhale: 4,
                    holdIn: 4,
                    exhale: 4,
                    holdOut: 4
                };
                break;
            case '4-7-8 Breathing':
                breathingPattern = {
                    inhale: 4,
                    holdIn: 7,
                    exhale: 8,
                    holdOut: 0
                };
                break;
            case 'Deep Breathing':
                breathingPattern = {
                    inhale: 5,
                    holdIn: 2,
                    exhale: 5,
                    holdOut: 2
                };
                break;
        }
        
        // Reset and start new technique
        resetBtn.click();
        startBtn.click();
    });
});

// Audio files
const audioFiles = {
    rain: 'https://cdn.pixabay.com/download/audio/2022/02/21/audio_d0a13f69d2.mp3?filename=rain-ambient-114354.mp3',
    waves: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_1e2d2a7d71.mp3?filename=ocean-waves-112624.mp3',
    forest: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=forest-ambient-114351.mp3',
    'white-noise': 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1e2d2a7d71.mp3?filename=white-noise-115672.mp3'
};

let currentAudio = null;
let isPlaying = false;
let currentTime = 0;
let duration = 900; // 15 minutes in seconds

// Initialize player
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('meditationModal');
    const startButtons = document.querySelectorAll('.start-session');
    const soundButtons = document.querySelectorAll('.sound-btn');
    const playBtn = document.getElementById('playBtn');
    const restartBtn = document.getElementById('restartBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.querySelector('.volume-slider');
    const progressBar = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration');

    // Modal trigger
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            const meditationType = button.dataset.meditation;
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            stopAudio();
            resetTimer();
        });
    });

    // Sound selection
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sound = button.dataset.sound;
            soundButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            if (currentAudio) {
                stopAudio();
            }
            playAudio(sound);
        });
    });

    // Play/Pause button
    playBtn.addEventListener('click', () => {
        if (!currentAudio) {
            const activeSound = document.querySelector('.sound-btn.active').dataset.sound;
            playAudio(activeSound);
        } else if (isPlaying) {
            pauseAudio();
        } else {
            resumeAudio();
        }
    });

    // Restart button
    restartBtn.addEventListener('click', () => {
        resetTimer();
        if (currentAudio) {
            currentAudio.currentTime = 0;
        }
    });

    // Volume controls
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        if (currentAudio) {
            currentAudio.volume = volume;
        }
        updateVolumeIcon(volume);
    });

    volumeBtn.addEventListener('click', () => {
        const newVolume = currentAudio && currentAudio.volume > 0 ? 0 : 1;
        volumeSlider.value = newVolume * 100;
        if (currentAudio) {
            currentAudio.volume = newVolume;
        }
        updateVolumeIcon(newVolume);
    });

    // Timer update
    setInterval(updateTimer, 1000);
});

function playAudio(sound) {
    if (currentAudio) {
        currentAudio.pause();
    }
    currentAudio = new Audio(audioFiles[sound]);
    currentAudio.loop = true;
    currentAudio.volume = document.querySelector('.volume-slider').value / 100;
    currentAudio.play();
    isPlaying = true;
    updatePlayButton();
}

function pauseAudio() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        updatePlayButton();
    }
}

function resumeAudio() {
    if (currentAudio) {
        currentAudio.play();
        isPlaying = true;
        updatePlayButton();
    }
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        isPlaying = false;
        updatePlayButton();
    }
}

function updatePlayButton() {
    const playBtn = document.getElementById('playBtn');
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function updateVolumeIcon(volume) {
    const icon = document.querySelector('#volumeBtn i');
    icon.className = 'fas ' + (
        volume === 0 ? 'fa-volume-mute' :
        volume < 0.5 ? 'fa-volume-down' :
        'fa-volume-up'
    );
}

function updateTimer() {
    if (isPlaying) {
        currentTime++;
        if (currentTime >= duration) {
            stopAudio();
            resetTimer();
            return;
        }
    }
    updateProgress();
}

function resetTimer() {
    currentTime = 0;
    updateProgress();
}

function updateProgress() {
    const progress = (currentTime / duration) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
    
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = currentTime % 60;
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = duration % 60;
    
    document.querySelector('.current-time').textContent = 
        `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    document.querySelector('.duration').textContent = 
        `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

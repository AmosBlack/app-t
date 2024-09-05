let timer;
let isRunning = false;
let remainingTime = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const endBtn = document.getElementById('endBtn');
const minuteInput = document.getElementById('minuteInput');
const secondInput = document.getElementById('secondInput');

// Load the sound
const countdownSound = new Audio('beep.mp3');

// Function to trigger a device vibration
function vibrateDevice() {
    if (navigator.vibrate) {
        navigator.vibrate([500, 500, 500]); // Vibration pattern: vibrate for 500ms, pause for 500ms, then vibrate again
    }
}

// Function to show a visual alert (like flashing or color change on the timer display)
function showVisualAlert() {
    const timerDisplay = document.querySelector('.timer-display');
    timerDisplay.classList.add('alert'); // Add a class for alert (CSS will handle flashing)
    setTimeout(() => {
        timerDisplay.classList.remove('alert'); // Remove the class after 3 seconds
    }, 3000);
}

function updateDisplay(minutes, seconds) {
    minutesDisplay.innerHTML = `<span>${String(minutes).padStart(2, '0')}</span>`;
    secondsDisplay.innerHTML = `<span>${String(seconds).padStart(2, '0')}</span>`;
}

function startTimer() {
    if (!isRunning && remainingTime > 0) {
        isRunning = true;
        startPauseBtn.querySelector('#playIcon').style.display = 'none';
        startPauseBtn.querySelector('#pauseIcon').style.display = 'inline'; // Show pause icon

        timer = setInterval(() => {
            remainingTime--;

            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            updateDisplay(minutes, seconds);

            if (remainingTime <= 0) {
                clearInterval(timer);
                isRunning = false;
                startPauseBtn.querySelector('#playIcon').style.display = 'inline'; // Show play icon
                startPauseBtn.querySelector('#pauseIcon').style.display = 'none'; // Hide pause icon

                // Play sound, vibrate device, and show visual alert
                playEndSound();
                vibrateDevice();
                showVisualAlert();
            }
        }, 1000);
    } else if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.querySelector('#playIcon').style.display = 'inline'; // Show play icon
        startPauseBtn.querySelector('#pauseIcon').style.display = 'none'; // Hide pause icon
    }
}

function playEndSound() {
    countdownSound.currentTime = 0; // Reset sound to start
    countdownSound.play(); // Play sound once
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    const inputMinutes = parseInt(minuteInput.value) || 0;
    const inputSeconds = parseInt(secondInput.value) || 0;
    remainingTime = inputMinutes * 60 + inputSeconds;
    updateDisplay(inputMinutes, inputSeconds);
    startPauseBtn.querySelector('#playIcon').style.display = 'inline'; // Show play icon
    startPauseBtn.querySelector('#pauseIcon').style.display = 'none'; // Hide pause icon
}

function restartTimer() {
    resetTimer();
    startTimer();
}

function endTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = 0;
    updateDisplay(0, 0);
    startPauseBtn.querySelector('#playIcon').style.display = 'inline'; // Show play icon
    startPauseBtn.querySelector('#pauseIcon').style.display = 'none'; // Hide pause icon
}

startPauseBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
restartBtn.addEventListener('click', restartTimer);
endBtn.addEventListener('click', endTimer);

// Initialize timer length from input when the input values change
minuteInput.addEventListener('change', resetTimer);
secondInput.addEventListener('change', resetTimer);

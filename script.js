let timerInterval;
let isRunning = false;
let remainingSeconds = 0;
let audio = new Audio('beep.mp3');

// Ensure audio is initialized on user interaction for iOS
audio.load();

// Function to update the timer display
function updateTimerDisplay() {
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Function to start the timer
function startTimer() {
    if (remainingSeconds > 0) {
        isRunning = true;
        timerInterval = setInterval(() => {
            remainingSeconds--;
            updateTimerDisplay();
            
            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                isRunning = false;

                // Play audio after the timer ends, ensure it's after user interaction for iOS
                audio.play().catch(err => {
                    console.error("Audio play blocked by iOS restrictions: ", err);
                });
            }
        }, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    remainingSeconds = 0;
    updateTimerDisplay();
}

// Function to restart the timer
function restartTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    let minuteInput = parseInt(document.getElementById('minuteInput').value) || 0;
    let secondInput = parseInt(document.getElementById('secondInput').value) || 0;
    remainingSeconds = minuteInput * 60 + secondInput;
    updateTimerDisplay();
    startTimer();
}

// Event listeners for buttons
document.getElementById('startPauseBtn').addEventListener('click', () => {
    if (!isRunning && remainingSeconds === 0) {
        // Restart the timer if it's at 0
        restartTimer();
    } else if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('restartBtn').addEventListener('click', restartTimer);
document.getElementById('endBtn').addEventListener('click', () => {
    resetTimer();
    remainingSeconds = 0;
    updateTimerDisplay();
});

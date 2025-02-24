let workTime = 25;
let breakTime = 5;
let minutes = workTime;
let seconds = 0;
let timerInterval;
let isWorkTime = true;
let totalTime; // Total time in seconds for work or break

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const outerCircle = document.querySelector('.outer-circle');

function updateDisplay() {
    minutesDisplay.innerText = String(minutes).padStart(2, '0');
    secondsDisplay.innerText = String(seconds).padStart(2, '0');
}

function updateCircle() {
    const elapsedTime = totalTime - (minutes * 60 + seconds);
    const percentage = (elapsedTime / totalTime) * 100;
    outerCircle.style.background = `conic-gradient(#4CAF50 ${percentage}%, #ddd ${percentage}%)`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                // Timer finished, switch between work and break
                if (isWorkTime) {
                    minutes = breakTime;
                    isWorkTime = false;
                    totalTime = breakTime * 60;
                } else {
                    minutes = workTime;
                    isWorkTime = true;
                    totalTime = workTime * 60;
                }
                seconds = 0;
                updateDisplay();
                updateCircle();
                startStopButton.innerText = 'Start'; // Change button text back to 'Start'
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
        updateCircle();
    }, 1000);
    startStopButton.innerText = 'Pause';
}

function stopTimer() {
    clearInterval(timerInterval);
    startStopButton.innerText = 'Start';
}

startStopButton.addEventListener('click', () => {
    if (timerInterval) {
        stopTimer();
        timerInterval = null; // Clear the interval ID
    } else {
        startTimer();
    }
});

resetButton.addEventListener('click', () => {
    stopTimer();
    workTime = parseInt(workTimeInput.value);
    breakTime = parseInt(breakTimeInput.value);
    minutes = workTime;
    seconds = 0;
    isWorkTime = true;
    totalTime = workTime * 60;
    updateDisplay();
    updateCircle();
});

workTimeInput.addEventListener('change', () => {
    workTime = parseInt(workTimeInput.value);
    minutes = workTime;
    totalTime = workTime * 60;
    updateDisplay();
    updateCircle();
});

breakTimeInput.addEventListener('change', () => {
    breakTime = parseInt(breakTimeInput.value);
});

// Initialize
workTime = parseInt(workTimeInput.value);
breakTime = parseInt(breakTimeInput.value);
minutes = workTime;
totalTime = workTime * 60;
updateDisplay();
updateCircle();

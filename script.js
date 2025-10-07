let timer;
let timeLeft = 25 * 60;
let isRunning = false;
let cycleCount = 0;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

const pomodoroBtn = document.getElementById('pomodoro');
const shortBreakBtn = document.getElementById('shortBreak');
const longBreakBtn = document.getElementById('longBreak');

const countDisplay = document.getElementById('count');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      cycleCount++;
      countDisplay.textContent = cycleCount;
      alert("Time's up! Take a break.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  setMode('pomodoro');
}

function setMode(mode) {
  pomodoroBtn.classList.remove('active');
  shortBreakBtn.classList.remove('active');
  longBreakBtn.classList.remove('active');

  if (mode === 'pomodoro') {
    timeLeft = 25 * 60;
    pomodoroBtn.classList.add('active');
  } else if (mode === 'shortBreak') {
    timeLeft = 5 * 60;
    shortBreakBtn.classList.add('active');
  } else if (mode === 'longBreak') {
    timeLeft = 15 * 60;
    longBreakBtn.classList.add('active');
  }

  updateTimerDisplay();
}

// Button events
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => setMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => setMode('shortBreak'));
longBreakBtn.addEventListener('click', () => setMode('longBreak'));

// Initial display
updateTimerDisplay();

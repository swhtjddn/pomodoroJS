class Timer {
    constructor(timer, pomodoroBtn, shortBreakBtn, longBreakBtn, startBtn, pauseBtn, resetBtn) {
        this.timer = timer;
        this.pomodoroBtn = pomodoroBtn;
        this.shortBreakBtn = shortBreakBtn;
        this.longBreakBtn = longBreakBtn;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;
        this.resetBtn = resetBtn;

        this.active = 'pomodoro';
        this.duration = 1500;
        this.pomodoroBtn.classList.add('activeBtn');
        this.timer.innerHTML = new Date(this.duration * 1000).toISOString().substr(14, 5);

        this.pomodoroBtn.addEventListener('click', this.pomodoro);
        this.shortBreakBtn.addEventListener('click', this.shortBreak);
        this.longBreakBtn.addEventListener('click', this.longBreak);
        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
        this.resetBtn.addEventListener('click', this.reset);

    }

    pomodoro = () => {
        this.pause();
        this.active = 'pomodoro';
        this.duration = 1500;
        this.timer.innerHTML = new Date(this.duration * 1000).toISOString().substr(14, 5);
        this.pomodoroBtn.classList.add('activeBtn');
        this.shortBreakBtn.classList.remove('activeBtn');
        this.longBreakBtn.classList.remove('activeBtn');
    }

    shortBreak = () => {
        this.pause();
        this.active = 'short';
        this.duration = 300;
        this.timer.innerHTML = new Date(this.duration * 1000).toISOString().substr(14, 5);
        this.shortBreakBtn.classList.add('activeBtn');
        this.pomodoroBtn.classList.remove('activeBtn');
        this.longBreakBtn.classList.remove('activeBtn');
    }

    longBreak = () => {
        this.pause();
        this.active = 'long';
        this.duration = 900;
        this.timer.innerHTML = new Date(this.duration * 1000).toISOString().substr(14, 5);
        this.longBreakBtn.classList.add('activeBtn');
        this.pomodoroBtn.classList.remove('activeBtn');
        this.shortBreakBtn.classList.remove('activeBtn');
    }
  
    start = () => {
        if (this.interval) {
            return;
        } else {
            this.tick();
            this.interval = setInterval(this.tick, 1000);
        }
    };
  
    pause = () => {
        clearInterval(this.interval);
        this.interval = 0;
    };

    reset = () => {
        clearInterval(this.interval);
        if (this.active === 'pomodoro') {
            this.duration = 1500;
        } else if (this.active === 'long') {
            this.duration = 900;
        } else if (this.active === 'short') {
            this.duration = 300;
        }
        this.timer.innerHTML = new Date(this.duration * 1000).toISOString().substr(14, 5);
    }
  
    tick = () => {
      if (this.timeRemaining <= 0) {
        this.pause();
        let audio = new Audio('assets/sounds/alarm.m4a');
        audio.play();
        this.reset();
      } else {
        this.timeRemaining = this.timeRemaining - 1;
        if (this.onTick) {
          this.onTick();
        }
      }
    };
  
    get timeRemaining() {
        return this.duration;
    }
  
    set timeRemaining(time) {
        this.duration = time;
        this.timer.innerHTML = new Date(this.duration * 1000).toISOString().substr(14, 5);
    }
}

screen.orientation.lock() 

const timerContainer = document.getElementById('timer');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const timer = new Timer(timerContainer, pomodoroBtn, shortBreakBtn, longBreakBtn, startBtn, pauseBtn, resetBtn);
  


// Quotes


const quote = document.getElementById('quote');
const author = document.getElementById('quoteAuthor');

async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random?maxLength=50');
    const data = await response.json();
    quote.textContent = `${data.content}`;
    author.textContent = `- ${data.author}`;
}

setInterval(randomQuote, 180000);
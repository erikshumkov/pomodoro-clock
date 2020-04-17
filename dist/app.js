// TODO
// TIMER

// Make code prettier
// Add different text depending on what time it is.

// Bugs
// 1 sec delay when timer starts.

class Timer {
  constructor() {
    this.clockSound = document.querySelector("audio");
    this.time = document.getElementById("time");
    this.type = document.getElementById("type");
    this.startBtn = document.getElementById("start");
    this.resetBtn = document.getElementById("reset");
    this.saveBtn = document.getElementById("save");
    this.defaultBtn = document.getElementById("default");
    this.testBtn = document.getElementById("test");
    this.volume = document.getElementById("volume");
    this.setTime = document.querySelector(".times");
    this.settings = document.querySelector(".ul-nav li a");
    this.overlay = document.querySelector(".overlay");
    this.logList = document.querySelector(".list ul");
    this.isRunning = null;
    this.pomodoro = 25 * 60;
    this.shortbreak = 5 * 60;
    this.longbreak = 15 * 60;
    this.counter = this.pomodoro;
    this.trackTime = this.pomodoro;
  }
  updateDisplay(duration) {
    let minutes = parseInt(this.counter / 60, 10);
    let seconds = parseInt(this.counter % 60, 10);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    this.time.innerText = `${minutes}:${seconds}`;
  }
  updateProgressCircle() {
    // Set css variable every second so the circle gets updated / updates the progress bar. 
    document.body.style.setProperty('--circle-percent', `calc(440 - (440 * (${this.trackTime} - ${this.counter})) / ${this.trackTime})`);
  }
  start() {
    if (!this.isRunning) {
      this.startBtn.firstElementChild.className = "fas fa-pause";
      this.isRunning = setInterval(() => {
        let minutes = parseInt(this.counter / 60, 10);
        let seconds = parseInt(this.counter % 60, 10);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        if (this.counter < 0) {
          clearInterval(this.isRunning);
          this.isRunning = null;
          this.startBtn.firstElementChild.className = "fas fa-play";
          this.playSound();
          this.addToLog(this.trackTime);
          document.title = `Time is up!`;
        } else {
          this.updateProgressCircle();
          this.counter--;
          this.time.innerText = `${minutes}:${seconds}`;
          document.title = `(${this.time.innerText}) Pomodoro Timer`;
        }
      }, 1000);

    } else {
      clearInterval(this.isRunning);
      this.isRunning = null;
      this.startBtn.firstElementChild.className = "fas fa-play";
    }
  }
  reset() {
    clearInterval(this.isRunning);
    this.isRunning = null;
    this.counter = this.trackTime;
    this.updateDisplay(this.trackTime);
    this.startBtn.firstElementChild.className = "fas fa-play";
    document.title = `Pomodoro Timer`;
  }
  setDefaults() {
    pomodoroTime = 25;
    shortTime = 5;
    longTime = 15;
    document.getElementById("pomodoro").value = pomodoroTime;
    document.getElementById("short").value = shortTime;
    document.getElementById("long").value = longTime;
    document.getElementById("volume").value = 0.5;
    timer.clockSound.volume = 0.5;
    this.pomodoro = pomodoroTime * 60;
    this.shortbreak = shortTime * 60;
    this.longbreak = longTime * 60;
    this.counter = pomodoroTime * 60;
  }
  playSound() {
    this.clockSound.play();
  }
  switchTime(setTime) {
    clearInterval(this.isRunning);
    this.isRunning = null;
    this.counter = setTime;
    this.trackTime = setTime;
    this.updateDisplay(setTime);
  }
  closeSettings() {
    this.overlay.classList.add("fade2");
    document.querySelector(".settings").classList.remove("jump");
    document.querySelector(".settings").classList.add("jump2");
    setTimeout(() => {
      document.querySelector(".overlay").style.visibility = "hidden";
      this.overlay.classList.remove("fade2");
    }, 600);
  }
  addToLog(time) {
    time = time / 60;
    const li = document.createElement("li");
    if (time === 5) {
      li.innerText = `Short break for ${time} minutes`;
    } else if (time === 15) {
      li.innerText = `Long break for ${time} minutes`;
    } else if (time === 25) {
      li.innerText = `Pomodoro, ${time} minutes`;
    } else {
      li.innerText = `You just did ${time} minutes`;
    }
    this.logList.prepend(li);
  }
}
const timer = new Timer();

timer.updateDisplay();

// Event listeners
// Click start button
timer.startBtn.addEventListener("click", e => {
  timer.start();
});

// Click reset button
timer.resetBtn.addEventListener("click", e => {
  timer.reset();
});

// Click test sound button
timer.testBtn.addEventListener("click", e => {
  timer.playSound();
});

// Start or stop - Space button
window.addEventListener("keydown", e => {
  if (e.keyCode === 32) {
    timer.start();
  }

  // Pomodoro - Alt + P
  if (e.altKey && e.keyCode === 80) {
    timer.switchTime(timer.pomodoro);
    timer.start();
  }

  // Short break - Alt + S
  if (e.altKey && e.keyCode === 83) {
    timer.switchTime(timer.shortbreak);
    timer.start();
  }

  // Long break - Alt + L
  if (e.altKey && e.keyCode === 76) {
    timer.switchTime(timer.longbreak);
    timer.start();
  }

  // Reset timer - Alt + R
  if (e.altKey && e.keyCode === 82) {
    timer.reset();
  }
});

// Open settings modal
timer.settings.addEventListener("click", () => {
  timer.overlay.classList.add("fade");
  document.querySelector(".overlay").style.visibility = "visible";
  document.querySelector(".settings").classList.remove("jump2");
  document.querySelector(".settings").classList.add("jump");
  setTimeout(() => {
    timer.overlay.classList.remove("fade");
  }, 400);
});

// Close settings modal
timer.overlay.addEventListener("click", (e) => {
  if (e.target.className === "overlay") {
    timer.closeSettings();
  }
});

// Set custom volume
timer.volume.addEventListener("input", e => {
  timer.clockSound.volume = e.target.value;
});

// Settings set custom times
let pomodoroTime = 25, shortTime = 5, longTime = 15;
timer.setTime.addEventListener("input", e => {
  if (e.target.id === "pomodoro") {
    pomodoroTime = +e.target.value;
  }
  if (e.target.id === "short") {
    shortTime = +e.target.value;
  }
  if (e.target.id === "long") {
    longTime = +e.target.value;
  }
});

// Save custom times
timer.saveBtn.addEventListener("click", () => {
  timer.pomodoro = pomodoroTime * 60;
  timer.shortbreak = shortTime * 60;
  timer.longbreak = longTime * 60;
  timer.counter = timer.pomodoro;
  timer.trackTime = timer.pomodoro;
  timer.updateDisplay(timer.pomodoro);
  timer.closeSettings();
});

// Switch back to the default times
timer.defaultBtn.addEventListener("click", () => {
  const pomodoro = 25 * 60;
  timer.setDefaults();
  timer.switchTime(pomodoro);
});

// Add ripple effect on start, stop and reset buttons.
const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(btn => {
  btn.addEventListener("click", function (e) {

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement("span");
    ripples.className = "ripples";
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    this.appendChild(ripples);

    setTimeout(() => ripples.remove(), 1000);
  })
})
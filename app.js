// TODO
// TIMER

// Make code prettier
// Add different text depending on what time it is.
// Switch back title when reset

// Bugs
// 1 sec delay when timer starts.
// Fix, favicon error when sound plays

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
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    this.time.innerText = `${minutes}:${seconds}`;
  }
  start() {
    if (!this.isRunning) {
      this.startBtn.firstElementChild.className = "fas fa-pause";
      this.isRunning = setInterval(() => {
        let minutes = parseInt(this.counter / 60, 10);
        let seconds = parseInt(this.counter % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (this.counter < 0) {
          clearInterval(this.isRunning);
          this.isRunning = null;
          this.startBtn.firstElementChild.className = "fas fa-play";
          this.playSound();
          this.addToLog(this.trackTime);
          document.title = `Time is up!`;
        } else {
          this.counter--;
          this.time.innerText = `${minutes}:${seconds}`;
          document.title = `(${this.time.innerText}) TomatoTimer`;
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
  }
  setDefaults() {
    document.getElementById("pomodoro").value = 25;
    document.getElementById("short").value = 5;
    document.getElementById("long").value = 15;
    document.getElementById("volume").value = 0.5;
    pomodoroTime = 25;
    shortTime = 5;
    longTime = 15;
    timer.clockSound.volume = 0.5;
    this.pomodoro = 25 * 60;
    this.shortbreak = 5 * 60;
    this.longbreak = 15 * 60;
    this.counter = 25 * 60;
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
timer.startBtn.addEventListener("click", function (e) {
  timer.startBtn.classList.add("pulse");
  setTimeout(() => timer.startBtn.classList.remove("pulse"), 1500);
  timer.start();
});

// Click reset button
timer.resetBtn.addEventListener("click", function (e) {
  timer.resetBtn.classList.add("pulse2");
  setTimeout(() => timer.resetBtn.classList.remove("pulse2"), 1500);
  timer.reset();
});

// Click test sound button
timer.testBtn.addEventListener("click", function (e) {
  timer.playSound();
});

// Start or stop - Space button
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 32) {
    timer.startBtn.classList.add("pulse");
    setTimeout(() => timer.startBtn.classList.remove("pulse"), 1500);
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
    timer.resetBtn.classList.add("pulse2");
    setTimeout(() => timer.resetBtn.classList.remove("pulse2"), 1500);
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


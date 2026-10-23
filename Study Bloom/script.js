
const timer = document.getElementById("timer");
const modeTitle = document.getElementById("mode-title");
const message = document.getElementById("message");

const studyBtn = document.getElementById("study-btn");
const breakBtn = document.getElementById("break-btn");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

let studyTime = 25 * 60;
let breakTime = 5 * 60;

let timeLeft = studyTime;
let interval = null;
let currentMode = "study";

// Menampilkan angka timer
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// Memilih mode belajar atau istirahat
function selectMode(mode) {
    clearInterval(interval);
    interval = null;

    currentMode = mode;
    timeLeft = mode === "study" ? studyTime : breakTime;

    modeTitle.textContent =
        mode === "study" ? "Waktu Belajar" : "Waktu Istirahat";

    message.textContent =
        mode === "study"
            ? "Yuk, fokus dan selesaikan tugasmu!"
            : "Istirahat sebentar, kamu hebat!";

    studyBtn.classList.toggle("active", mode === "study");
    breakBtn.classList.toggle("active", mode === "break");

    updateTimer();
}

// Tombol Start
startBtn.addEventListener("click", function () {
    if (interval !== null || timeLeft <= 0) return;

    interval = setInterval(function () {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(interval);
            interval = null;
            message.textContent = "Waktu selesai! Kerja bagus!";
        }
    }, 1000);
});

// Tombol Pause
pauseBtn.addEventListener("click", function () {
    clearInterval(interval);
    interval = null;
});

// Tombol Reset
resetBtn.addEventListener("click", function () {
    selectMode(currentMode);
});

// Tombol mode belajar
studyBtn.addEventListener("click", function () {
    selectMode("study");
});

// Tombol mode istirahat
breakBtn.addEventListener("click", function () {
    selectMode("break");
});

// Menampilkan waktu awal
updateTimer();

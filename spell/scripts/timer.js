const maxTime = 5 * 1000;
const interval = 0.01 * 1000;

let currentTime = maxTime;

function timer() {
    const timer = document.getElementById("timer");
    timer.style.width = ((currentTime / maxTime) * 100) + "%";
    currentTime -= interval;

    if (currentTime < ((1/3) * maxTime)) {
        timer.style.background = "linear-gradient(#ff5252 0%, #b33939 100%)"
    } else if (currentTime < ((2/3) * maxTime)) {
        timer.style.background = "linear-gradient(#ff793f 0%, #cd6133 100%)"
    }
}

window.setInterval(timer, interval);
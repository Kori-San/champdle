let intervalID;

function timer() {
    const timer = document.getElementById("timer");
    const interval = 1;

    const maxTime = 30;

    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + maxTime);

    window.clearInterval(intervalID);
    timer.style.background = "linear-gradient(#33d9b2 0%, #218c74 100%)";

    intervalID = window.setInterval(async () => {
        /* Calculating the difference between the current time and the expiration time. */
        const currentTime = new Date();
        const diffSecond = ((expirationTime - currentTime) / 1000);

        /* Setting the width of the timer bar to the percentage of time left. */
        timer.style.width = ((diffSecond / maxTime) * 100) + "%";

        /* Checking if the timer is at 0% and if it is, it clears the interval. */
        if (Math.floor(diffSecond) < 0) {
            timer.style.width = "0%";
            console.log("Done");
            window.clearInterval(intervalID);
        }

        if (Math.round(diffSecond) === (2 / 3) * maxTime) {
            timer.style.background = "linear-gradient(#ff793f 0%, #cd6133 100%)"
        }
        else if (Math.round(diffSecond) === (1 / 3) * maxTime) {
            timer.style.background = "linear-gradient(#ff5252 0%, #b33939 100%)"
        }

        return;

    }, interval);
    return;
}

export function resetTimer() {
    timer();
}
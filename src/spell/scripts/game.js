import { getLatestVersion, getRandomChampURL, getRandomAbilty, getAllChamp } from "/lib/fetch.js";
import { clearInput, animateElement } from "/lib/utilities.js";
import { checkTimer, disableTimer, resetTimer } from "../../lib/timer.js";
import { autocomplete, closeList, disableAutocomplete } from "/lib/autocomplete.js";

/* User preference */
let language = "fr_FR";

// Gameplay vars
/* Basic mechanic initValues */
const initLives = 3;
const initSkip = 1;
const initStreak = 0;
const initScore = 0;

/* Const gain and ceils */
const gain = 100;
const comboGain = gain / 2;
const comboForHeal = 5;
const animationTime = 0.5; // In seconds

/* Basic mechanic */
let lives = initLives;
let skip = initSkip;
let streak = initStreak;
let score = initScore;

// Data vars
/* DDragon's vars */
let surnames = "";
let randomAbility = "";
let champName = "";
let intervalID;

// DOM vars
/* Buttons */
const skipButton = document.getElementById("skip-button");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");

/* Texts */
const abilityDescription = document.getElementById("description");
const livesStat = document.getElementById("lives");
const skipStat = document.getElementById("skip");
const streakStat = document.getElementById("streak");

/* Input */
const guessInput = document.getElementById('guess');

/* Image */
const hourglass = document.getElementById("hourglass");

/**
 * It's getting the latest version of the game, the base endpoint, the image endpoint, the data from
 * the API, and assigning the data from the API to the variables.
 * 
 * It's also checking if the streak is a multiple of 5 and if it is, it's increasing the lives by 1.
 * 
 * It's displaying the ability description, the number of lives, the number of skips, and the current streak
 * 
 * Returns:
 *   Nothing.
 */
export async function game() {
    /* It's getting the latest version of the game and the base endpoint and the image endpoint. */
    const latestVersion = await getLatestVersion();
    const baseEndpoint = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/data/" + language + "/";
    const imgEndpoint = "http://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/img/champion/";

    /* It's getting the data from the API. */
    const allChamp = await getAllChamp(baseEndpoint, imgEndpoint);
    const randomChampURL = await getRandomChampURL(baseEndpoint);
    const data = await getRandomAbilty(randomChampURL);

    /* It's assigning the data from the API to the variables. */
    randomAbility = data[0];
    surnames = data[1];
    champName = data[2];

    /* It's checking if the streak is a multiple of 5 and if it's not the initial streak. If it is, it's
    increasing the lives by 1. */
    if (streak % comboForHeal == 0 && streak != initStreak) {
        lives++;
        animateElement("heal", livesStat.parentElement, animationTime);
    }

    /* It's displaying the ability description, the number of lives, the number of skips, and the current
     * streak. */
    abilityDescription.scrollTop = 0;
    displayGameInfo();
    resetTimer(streak);
    autocomplete(guessInput, allChamp);

    /*It's clearing the old checker. Check if the timer is over, if it is, it's calling the lose function. */
    window.clearInterval(intervalID);

    intervalID = window.setInterval(() => {
        if (checkTimer()) {
            window.clearInterval(intervalID);
            lose();
            return;
        }
    }, 1 /* Every millisecond */)

    return;
}

/**
 * It displays the ability description, the number of lives, the number of skips, and the current
 * streak.
 * 
 * Returns:
 *   Nothing.
 */
function displayGameInfo() {
    /* Either displays the ability or the champion name and the score, depending on the lives of the player */
    abilityDescription.innerHTML = lives > 0 ? randomAbility : "<div>The answer was <b>" + champName + "</b><br>Your score is: " + score + ".</div>";
    livesStat.innerHTML = lives;
    skipStat.innerHTML = skip;
    streakStat.innerHTML = streak;
    return;
}

/**
 * It's decreasing the lives by 1 and resetting the streak to its initial value.
 * When the player has no more lives, it shows the right answer and switch to the losing screen.
 * 
 * Returns:
 *   Nothing.
 */
export function lose() {
    /* It's shaking the ability description and flashing the lives. */
    animateElement("shake", abilityDescription.parentElement, animationTime);

    /* It's decreasing the lives by 1 and resetting the streak to its initial value. */
    streak = initStreak;
    lives--;

    /* When the player has no more lives */
    if (lives === 0) {
        /* It's displaying the champName, closing and disabling the autocomplete list and the timer. */
        displayGameInfo();
        closeList();
        disableAutocomplete(guessInput);
        disableTimer();

        /* It's disabling the submit button, the skip button, making the hourglass invisible, and making the
        retry button visible. */
        submitButton.disabled = true;
        skipButton.disabled = true;
        hourglass.hidden = true;
        retryButton.hidden = false;

        return;
    }

    /* It's resetting the timer and restarting the game. */
    resetTimer(0);
    game();
    return;
}

/**
 * It checks if the user's guess is correct
 * 
 * Returns:
 *   Nothing.
 */
function checkGuess() {
    /* Taking the first suggestion or the guess of the user */
    const suggestions = document.getElementById("suggestions");
    const guess = suggestions ? suggestions.firstChild.textContent.toLowerCase() : guessInput.value.toLowerCase();

    /* It's checking if the user has no more lives or if the guess is empty. */
    if (lives <= 0 || !guess) {
        return;
    }

    /* Closing the autocomplete list and clearing the input. */
    closeList();
    clearInput(guessInput);

    /* Checking if the user's guess is correct. */
    for (const surname of surnames) {
        if (guess === surname.toLowerCase()) {
            /* Adding the gain to the score, and then adding the streak multiplied by the comboGain to the score. */
            score += gain + (streak++ * comboGain);

            /* Resetting the game. */
            game();
            return;
        }
    }

    /* Calling the lose function. */
    lose();
    return;
}

/* Listen whenever the user use the skip button, reducing his skips and restarting the game. */
skipButton.onclick = function (event) {
    /* Decreasing the skip variable by 1. */
    streak = initStreak;
    skip--;

    /* It's shaking the ability description and flashing the skip button. */
    animateElement("glitch", abilityDescription.parentElement, animationTime);

    /* Disabling the skip button if the user has no more skips. */
    if (skip === 0) {
        skipButton.disabled = true;
    }

    /* Restarting the game. */
    game();
    return;
}

/* An event listener that listens for the enter key to be pressed and then check the guess. */
guessInput.onkeydown = function (event) {
    /* If the enter key is pressed it prevents the default action and check the guess. */
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess();
    }

    return;
}

/* Assigning the function `checkGuess()` to the `onclick` event of the `submitButton` element. */
submitButton.onclick = function (event) {
    checkGuess();
    return;
}

/* The function that is called when the retry button is clicked. */
retryButton.onclick = () => {
    /* Making the hourglass visible, the submit button enabled, the skip button enabled, and the retry
    button hidden. */
    hourglass.hidden = false;
    submitButton.disabled = false;
    skipButton.disabled = false;
    retryButton.hidden = true;

    /* Resetting the lives, skip, and score to their initial values. */
    lives = initLives;
    skip = initSkip;
    score = initScore;

    /* Calling the game function and returning. */
    game();
    return;
}
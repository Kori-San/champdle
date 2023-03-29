import { getLatestVersion, getRandomChampURL, getRandomAbilty, getAllChamp } from "./fetch.js";
import { clearInput } from "./utilities.js";
import { disableTimer, resetTimer } from "./timer.js";
import { autocomplete, closeList, disableAutocomplete } from "./autocomplete.js";

// Gameplay vars
/* Basic mechanic */
let lives = 3;
let skip = 1;
let streak = 0;

/* Score mechanic */
let score = 0;
const gain = 100;
const comboGain = gain / 2;

// Data vars
let surnames = "";
let randomAbility = "";
let champName = "";
const language = "fr_FR";

// DOM vars
const guessInput = document.getElementById('guess');

/**
 * It's getting the latest version of the game, getting the base endpoint, getting the URL of a random
 * champion, getting the data of the champion, getting the name of the ability, the surnames of the
 * champion and the name of the champion, setting the scroll of the description to the top and
 * displaying the game info, resetting the timer, adding an event listener to the input field,
 * disabling the skip button and restarting the game, adding an event listener to the input field,
 * adding an event listener to the button and checking the guess.
 * 
 * Returns:
 *   Nothing.
 */
export async function game() {
    /* It's getting the latest version of the game and using it to get the base endpoint. */
    const latestVersion = await getLatestVersion();
    const baseEndpoint = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/data/" + language + "/";
    const imgEndpoint = "http://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/img/champion/";

    /* It's getting the URL of a random champion and getting the data of the champion. */
    const allChamp = await getAllChamp(baseEndpoint, imgEndpoint);
    const randomChampURL = await getRandomChampURL(baseEndpoint);
    const data = await getRandomAbilty(randomChampURL);

    /* It's getting the name of the ability, the surnames of the champion and the name of the champion. */
    randomAbility = data[0];
    surnames = data[1];
    champName = data[2];

    if (streak % 5 == 0 && streak != 0) {
        lives++;
    }

    /* It's setting the scroll of the description to the top and displaying the game info. */
    document.getElementById("description").scrollTop = 0;
    displayGameInfo();

    /* It's resetting the timer. */
    resetTimer(streak);

    /* It's adding an event listener to the input field. */
    autocomplete(guessInput, allChamp);

    /* It's adding an event listener to the skip button. */
    document.getElementById("skip-button").onclick = function (event) {
        /* It's decreasing the number of skips by 1 and resetting the streak to 0. */
        streak = 0;
        skip--;

        /* It's disabling the skip button if the player has no more skips left. */
        if (skip === 0) {
            this.disabled = true;
        }

        /* It's restarting the game. */
        displayGameInfo();
        game();
        return;
    }

    /* It's adding an event listener to the input field. */
    guessInput.onkeydown = function (event) {
        /* It's checking if the key pressed is the enter key. */
        if (event.key === "Enter") {
            /* It's preventing the default action of the event. */
            event.preventDefault();
            checkGuess();
        }
    }

    /* It's adding an event listener to the button. */
    document.getElementById("submit").onclick = function (event) {
        checkGuess();
    }
}

/**
 * It displays the game information on the screen
 * 
 * Returns:
 *   Nothing.
 */
function displayGameInfo() {
    document.getElementById("description").innerHTML = randomAbility;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("skip").innerHTML = skip;
    document.getElementById("streak").innerHTML = streak;
}

/**
 * It's displaying the name of the champion, disabling the timer, the submit button and the skip
 * button, removing the event listeners from the input field and the timer, and restarting the game if
 * the player has no lives left
 * 
 * Args:
 *   time: It's a boolean value. It's true if the player has lost because the timer has run out.
 * 
 * Returns:
 *   Nothing.
 */
export function lose(time) {
    /* It's resetting the streak to 0. */
    streak = 0;

    /* It's checking if the player has no lives left. */
    lives--;

    displayGameInfo();

    if (lives === 0) {
        /* It's displaying the name of the champion. */
        document.getElementById("description").innerHTML = "<div><div>The answer was " + "<b>" + champName + "</b></div>Your score is: " + score + ".</div>";

        /* It's disabling the timer, the submit button and the skip button. */
        disableTimer();
        document.getElementById("submit").disabled = true;
        document.getElementById("skip-button").disabled = true;

        /* It's removing the event listeners from the input field and the timer. */
        closeList();
        disableAutocomplete(guessInput);
        disableGuess();

        return;
    }

    /* It's checking if the parameter `time` is true. If it is, it's restarting the game. */
    if (time) {
        game();
        return;
    }

    return;
}

/**
 * It's checking if the guess is correct
 * 
 * Returns:
 *   Nothing.
 */
function checkGuess() {
    /* It's getting the list of suggestions. */
    const suggestionsDiv = document.getElementById("suggestions");

    /* It's checking if the list of suggestions is open. If it is, it's getting the first
    suggestion. If it isn't, it's getting the value of the input field. */
    const guess = suggestionsDiv ? suggestionsDiv.firstChild.textContent.toLowerCase() : guessInput.value.toLowerCase();

    /* It's checking if the guess is empty. */
    if (!guess) {
        return;
    }

    /* It's closing the list of suggestions. */
    closeList();

    /* It's clearing the input field. */
    clearInput(guessInput);

    /* It's checking if the guess is correct. */
    for (const surname of surnames) {
        if (guess === surname.toLowerCase() && guess) {
            /* It's adding the score and the streak. */
            score += gain + (streak * comboGain)
            streak += 1;

            /* It's restarting the game. */
            game();
            return;
        }
    }

    /* It's calling the function `lose()` with the parameter `false`. */
    lose(false);
    return;
}

/**
 * Disable the guess input field by setting its onkeydown event handler to null.
 * 
 * Returns:
 *   Nothing.
 */
function disableGuess() {
    guessInput.onkeydown = null;
    return;
}
import { getLatestVersion, getRandomChampURL, getRandomAbilty, getAllChamp } from "./fetch.js";
import { clearInput } from "./utilities.js";
import { resetTimer } from "./timer.js";
import { autocomplete, closeList } from "./autocomplete.js";

/* It's declaring the variables `lives`, `skip` and `streak` */
let lives = 3;
let skip = 1;
let streak = 0;

/* It's setting the language to French. */
const language = "fr_FR";

/* It's getting the input field. */
const guessInput = document.getElementById('guess');

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
    const randomAbility = data[0];
    const surnames = data[1];
    const champName = data[2];

    function displayGameInfo() {
        document.getElementById("description").innerHTML = randomAbility;
        document.getElementById("lives").innerHTML = lives;
        document.getElementById("skip").innerHTML = skip;
        document.getElementById("streak").innerHTML = streak;
    }

    displayGameInfo();

    /* It's resetting the timer. */
    resetTimer();

    /* It's adding an event listener to the input field. */
    autocomplete(guessInput, allChamp);

    /**
     * It's checking if the guess is correct
     */
    function checkGuess() {
        /* It's closing the list of suggestions. */
        closeList();

        /* It's getting the value of the input field and converting it to lowercase. */
        const guess = guessInput.value.toLowerCase();

        /* It's clearing the input field. */
        clearInput(guessInput);

        /* It's checking if the guess is correct. */
        for (const surname of surnames) {
            if (guess === surname.toLowerCase() && guess) {
                /* It's increasing the streak by 1. */
                streak += 1;

                /* It's restarting the game. */
                game();
                return;
            }
        }

        /* It's resetting the streak to 0. */
        streak = 0;

        /* It's checking if the player has no lives left. */
        lives--;
        displayGameInfo();

        if (lives === 0) {
            /* It's displaying the name of the champion. */
            document.getElementById("description").innerHTML = "The answer was " + "<b>" + champName + "</b>";

            /* It's removing the event listener from the input field. */
            guessInput.onkeydown = null;
            return;
        }
    }

    function skipButton() {
        if (skip === 0) {
            return;
        }

        streak = 0;
        skip--;

        displayGameInfo();
        game();
        return;
    }

    document.getElementById("skip-button").onclick = function (event) {
        skipButton();
    }

    /* It's adding an event listener to the input field. */
    guessInput.onkeydown = function (event) {
        if (event.key === "Enter") {
            /* It's preventing the default action of the event. */
            event.preventDefault();

            /* It's calling the function `checkGuess()`. */
            checkGuess();
        }
    }

    /* It's adding an event listener to the button. */
    document.getElementById("submit").onclick = function (event) {
        /* It's calling the function `checkGuess()`. */
        checkGuess();
    }
}

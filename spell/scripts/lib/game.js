import { getLatestVersion, getRandomChampURL, getRandomAbilty, getAllChamp } from "./fetch.js";
import { clearInput } from "./utilities.js";
import { resetTimer } from "./timer.js";
import { autocomplete, closeList } from "./autocomplete.js";

let lives = 3;
let skip = 1;
let streak = 0;

export async function game() {
    const language = "fr_FR";

    /* It's getting the latest version of the game and using it to get the base endpoint. */
    const latestVersion = await getLatestVersion();
    const baseEndpoint = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/data/" + language + "/";
    const imgEndpoint = "http://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/img/champion/";

    /* It's getting the URL of a random champion and getting the data of the champion. */
    const allChamp = await getAllChamp(baseEndpoint, imgEndpoint);
    const randomChampURL = await getRandomChampURL(baseEndpoint);
    const data = await getRandomAbilty(randomChampURL);

    const randomAbility = data[0];
    const surnames = data[1];
    const champName = data[2];

    document.getElementById("description").innerHTML = randomAbility;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("skip").innerHTML = skip;
    document.getElementById("streak").innerHTML = streak;

    resetTimer();

    const guessInput = document.getElementById('guess');
    autocomplete(guessInput, allChamp);

    guessInput.onkeydown = function (event) {
        if (event.key === "Enter") {
            /* It's preventing the default action of the event. */
            event.preventDefault();

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
            document.getElementById("streak").innerHTML = streak;

            /* It's checking if the player has no lives left. */
            lives--;
            document.getElementById("lives").innerHTML = lives;

            if (lives === 0) {
                /* It's displaying the name of the champion. */
                document.getElementById("description").innerHTML = "The answer was " + "<b>" + champName + "</b>";

                /* It's removing the event listener from the input field. */
                guessInput.onkeydown = null;
                return;
            }
        }
    }
}

import { getLatestVersion, getRandomChamp, getRandomAbilty } from "./fetch.js";
import { clearInput } from "./utilities.js";

let lives = 3;
let skip = 1;

export async function game() {
    /* It's getting the latest version of the game and using it to get the base endpoint. */
    const latestVersion = await getLatestVersion();
    const baseEndpoint = "https://ddragon.leagueoflegends.com/cdn/" + latestVersion + "/data/en_US";

    /* It's getting the URL of a random champion and getting the data of the champion. */
    const randomChampURL = await getRandomChamp(baseEndpoint);
    const data = await getRandomAbilty(randomChampURL);

    const randomAbility = data[0];
    const surnames = data[1];
    const champName = data[2];

    document.getElementById("description").innerHTML = randomAbility;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("skip").innerHTML = skip;

    const guessInput = document.getElementById('guess');
    guessInput.onkeydown = function (event) {
        if (event.key === "Enter") {
            /* It's preventing the default action of the event. */
            event.preventDefault();

            /* It's getting the value of the input field and converting it to lowercase. */
            const guess = guessInput.value.toLowerCase();

            /* It's clearing the input field. */
            clearInput(guessInput);

            /* It's checking if the guess is correct. */
            for (const surname of surnames) {
                if (guess === surname.toLowerCase() && surname.length > 1) {
                    /* It's restarting the game. */
                    game();
                    return;
                }
            }

            /* It's checking if the player has no lives left. */
            if (--lives === 0) {
                document.getElementById("lives").innerHTML = lives;
                /* It's displaying the name of the champion. */
                document.getElementById("description").innerHTML = "The answer was " + "<b>" + champName + "</b>";

                /* It's removing the event listener from the input field. */
                guessInput.onkeydown = null;
                return;
            }

            document.getElementById("lives").innerHTML = lives;
            /* It's decreasing the number of lives by 1 and displaying the number of lives and the ability. */
            document.getElementById("description").innerHTML = randomAbility;
        };
    }
}

/**
 * It's getting the latest version of the game
 * 
 * Returns:
 *   The first element of the data array.
 */
async function getLatestVersion() {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";

    /* It's fetching the data from the API. */
    const response = await fetch(url);
    /* It's getting the data from the response. */
    const data = await response.json();

    /* It's returning the first element of the data array. */
    return data[0];
}

/**
 * We're fetching the data from the API, getting the list of champions, getting a random number between
 * 0 and the length of the list of champions, and returning the name of the champion
 * 
 * Returns:
 *   The name of the champion.
 */
async function getRandomChamp(url) {
    /* It's fetching the data from the API and getting the data from the response. */
    const response = await fetch(url + "/champion.json"); // fetch(url) -> (response) => {...}
    const data = await response.json() // (response) => {...} -> (data) => {...}

    /* Getting the list of champions from the data. */
    const champList = (Object.keys(data.data));

    /* Getting a random number between 0 and the length of the champList. */
    const randomIndex = Math.floor(Math.random() * champList.length);

    /* Getting the name of the champion from the list of champions. */
    const champId = champList[randomIndex];

    /* It's getting the URL of the champion. */
    const champURL = url + "/champion/" + champId + ".json";
    return champURL;
};

async function getRandomAbilty(url) {
    /* It's fetching the data from the API and getting the data from the response. */
    const response = await fetch(url);
    const data = await response.json();

    /* It's getting the name of the champion. */
    const champId = Object.keys(data.data);
    const champName = data.data[champId].name;

    /* It's getting the list of spells from the champion. */
    const spells = data.data[champId].spells;

    /* It's getting the description of the spells. */
    for (const index in spells) {
        spells[index] = spells[index].description;
    }

    /* Getting a random number between 0 and the length of the champList. */
    const randomIndex = Math.floor(Math.random() * spells.length);
    let randomAbility = spells[randomIndex]
        /* It's replacing the name of the champion with ???. */
        .replaceAll(champName, "???")
        .replaceAll(champId, "???")
        /* It's removing the HTML tags from the description of the spell. */
        .replace(/<[^>]*>/g, "");

    /* It's replacing the name of the champion with ???. */
    const surnames = champName.split(' ');
    for (const surname of surnames) {
        randomAbility = randomAbility.replaceAll(surname, "???");
    }

    return [randomAbility, url, champId, champName];
}

getLatestVersion().then((version) => {
    const url = "https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US";
    getRandomChamp(url).then((champURL) => {
            getRandomAbilty(champURL).then((info) => {
                const randomAbility = info[0];
                const url = info[1];
                const champId = info[2][0];
                const champName = info[3];

                document.getElementById("champion").innerHTML = randomAbility;
                const guessInput = document.getElementById('guess')
                guessInput.onkeydown = function (event) {
                    if (event.key === "Enter") {
                        event.preventDefault();

                        const guess = guessInput.value.toLowerCase();
                        if (guess === champId.toLowerCase() || guess === champName.toLowerCase()) {
                            console.log("gg");
                            return;
                        } else {
                            // WRONG ANSWER HERE
                        }
                    };
                }
            })
        })
});
import { pushIfNotPresent, cleanSurnames } from "./utilities.js";

/**
 * It's getting the latest version of the game from the API
 * 
 * Returns:
 *   The first element of the data array.
 */
export async function getLatestVersion() {
    /* URL which lists all the versions. */
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";

    /* It's fetching the data from the API. */
    const response = await fetch(url);
    const data = await response.json();

    /* It's returning the first element of the data array. */
    return data[0];
}

/**
 * It's fetching the data from the API and getting the data from the response
 * 
 * Args:
 *   url: The URL of the API.
 *   imgURL: It's the URL of the champion's image.
 * 
 * Returns:
 *   It's returning the list of champions.
 */
export async function getAllChamp(url, imgURL) {
    /* It's fetching the data from the API and getting the data from the response. */
    const response = await fetch(url + "champion.json");
    const data = await response.json();

    /* Getting the list of champions from the data. */
    const champList = [];

    for (const key in data.data) {
        champList.push([imgURL + data.data[key].id + ".png", data.data[key].name]);
    }

    /* It's getting the URL of the champion. */
    return champList;
};

/**
 * It's getting the data from the API, getting the list of champions, getting a random number between 0
 * and the length of the list of champions, getting the name of the champion from the list of
 * champions, and getting the URL of the champion
 * 
 * Args:
 *   url: The URL of the API.
 * 
 * Returns:
 *   The URL of the champion.
 */
export async function getRandomChampURL(url) {
    /* It's fetching the data from the API and getting the data from the response. */
    const response = await fetch(url + "champion.json");
    const data = await response.json();

    /* Getting the list of champions from the data. */
    const champList = (Object.keys(data.data));

    /* Getting a random number between 0 and the length of the champList. */
    const randomIndex = Math.floor(Math.random() * champList.length);

    /* Getting the name of the champion from the list of champions. */
    const champId = champList[randomIndex];

    /* It's getting the URL of the champion. */
    const champURL = url + "champion/" + champId + ".json";
    return champURL;
};

/**
 * It's getting the description of a random ability of a random champion.
 * 
 * Args:
 *   url: The URL of the API.
 * 
 * Returns:
 *   It's returning an array with the description of the ability and the list of surnames.
 */
export async function getRandomAbilty(url) {
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

    /* It's adding the description of the passive to the list of spells. */
    spells.push(data.data[champId].passive.description);
    console.log(spells);

    /* Getting a random number between 0 and the length of the champList. */
    const randomIndex = Math.floor(Math.random() * spells.length);

    /* It's getting the description of the spell. */
    let randomAbility = spells[randomIndex]
        /* It's replacing the name of the champion with ???. */
        .replaceAll(champName, "???")
        .replaceAll(champId, "???")
        /* It's removing the HTML tags from the description of the spell. */
        .replace(/<[^>]*>/g, "");

    /* It's splitting the name of the champion into an array of strings. */
    const surnames = champName.split(' ');

    cleanSurnames(surnames);

    /* It's replacing the surname with ???. */
    for (const surname of surnames) {
        randomAbility = randomAbility.replaceAll(surname, "???");
    }

    /* It's adding the name of the champion and the ID of the champion to the list of surnames. */
    pushIfNotPresent(surnames, champId[0]);
    pushIfNotPresent(surnames, champName);

    /* It's returning an array with the description of the ability and the list of surnames. */
    return [randomAbility, surnames, champName];
}
import { cleanSurnames, pushIfNotPresent } from "./utilities.js";


/**
 * It creates a suggestions list for the input element when the user clicks on it, removes the
 * suggestions list from the DOM when the user clicks outside of the input element, and removes the
 * suggestions list from the DOM and creates a new one when the user types into the input element
 * 
 * Args:
 *   input: The input element that the user types into.
 *   list: The list of suggestions.
 * 
 * Returns:
 *   Nothing.
 */
export function autocomplete(input, list) {
    /* Closing the suggestions list when the user clicks outside of the input element. */
    input.onblur = function (event) {
        closeList();
        return;
    }

    /* Creating the suggestions list when the user clicks on the input element. */
    input.onfocus = function (event) {
        createSuggestions(input, list);
        return;
    }

    /* Removing the suggestions list from the DOM and creating a new one when the user types into the input
    element. */
    input.oninput = function (event) {
        /* It removes the suggestions list from the DOM. */
        closeList();

        /* Creating the suggestions list. */
        createSuggestions(input, list);
        return;
    }

    return;
}

/**
 * It creates a list of suggestions based on the value that the user has typed into the input element
 * 
 * Args:
 *   input: The input element that the user is typing into.
 *   list: The list of champions.
 * 
 * Returns:
 *   Nothing.
 */
function createSuggestions(input, list) {
    /* Checking if the input element is empty. If it is, it returns. */
    const value = input.value;
    if (!value) {
        return;
    }

    /* Creating a div element and appending it to the parent of the input element. */
    const suggestions = document.createElement("div");
    suggestions.setAttribute("id", "suggestions");
    suggestions.setAttribute("class", "autocomplete-items");
    input.parentNode.appendChild(suggestions);

    /* Creating the suggestions list. */
    for (const element of list) {
        /* Getting the champion's name and image URL from the list of champions. */
        const name = element[1];
        const img = element[0];

        /* Splitting the champion's name into an array of strings. For example, "Miss Fortune" will be ["Miss",
        "Fortune"]. */
        const surnames = name.split(' ');
        cleanSurnames(surnames);

        if (surnames.length > 1) {
            let abbreviation = "";

            /* Creating an abbreviation for the champion's name. For example, "Miss Fortune" will be "MF". */
            for (const namePart of name.split(' ')) {
                abbreviation += namePart[0];
            }

            pushIfNotPresent(surnames, abbreviation);
        }

        /* Creating an array with both possible names. Normalized name have the diacritics removed from the champion's name.
        For example, "Séraphine" will be "Seraphine" and the array will be ["Séraphine", "Seraphine"] */
        const possibleNames = [name, name.normalize("NFD").replace(/\p{Diacritic}/gu, "")];

        /* Normalize is removing the diacritics from the champion's name. For example, "Séraphine" will be "Seraphine". */
        for (const possibleName of possibleNames) {
            /* Adding the full name and full normalized name to the list of surnames. */
            pushIfNotPresent(surnames, possibleName);

            /* Removing the apostrophe from the name. (Kai'Sa, K'Sante, etc...) */
            pushIfNotPresent(surnames, possibleName.replace("'", ""));
        }

        for (const surname of surnames) {
            /* Checking if the surname starts with the value that the user has typed into the input element. */
            if (surname.substr(0, value.length).toLowerCase() == value.toLowerCase()) {

                /* Creating a div element and appending it to the suggestions div. */
                const suggestion = document.createElement("div");
                suggestion.className = "suggestion league-font";
                suggestion.innerHTML = "<div id=\"suggestion-img\"><img src=\"" + img + "\"></div><div id=\"suggestion-name\">" + name + "</div>";
                suggestion.addEventListener("click", function () {
                    input.value = name;
                    closeList();
                });

                /* Appending the suggestion to the suggestions div and then breaking out of the for loop. */
                suggestions.appendChild(suggestion);
                break;
            }
        }
    }
    return;
}

/**
 * It removes the suggestions list from the DOM
 * 
 * Returns:
 *   Nothing.
 */
export function closeList() {
    const suggestions = document.getElementById('suggestions');

    if (suggestions) {
        suggestions.parentNode.removeChild(suggestions);
    }
    return;
}

/**
 * Disable the autocomplete feature of an input element.
 * 
 * Args:
 *   input: The input element that you want to disable autocomplete on.
 * 
 * Returns:
 *   Nothing.
 */
export function disableAutocomplete(input) {
    /* Removing the event listeners from the input element. */
    input.oninput = null;
    input.onfocus = null;
    input.onblur = null;

    return;
}
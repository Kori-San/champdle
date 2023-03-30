import { cleanSurnames, pushIfNotPresent } from "./utilities.js";

/**
 * It creates a list of suggestions based on the value that the user has typed into the input element
 * 
 * Args:
 *   input: The input element that the user is typing into.
 *   list: An array of arrays. Each array contains the champion's image URL and name.
 * 
 * Returns:
 *   Nothing.
 */
export function autocomplete(input, list) {
    input.oninput = function (event) {
        /* It removes the suggestions list from the DOM. */
        closeList();

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

            /* Creating an abbreviation for the champion's name. For example, "Miss Fortune" will be "MF". */
            if (surnames.length === 2) {
                const abbreviation = surnames[0][0] + surnames[1][0];
                pushIfNotPresent(surnames, abbreviation);
            }

            /* Adding the full name to the list of surnames. */
            pushIfNotPresent(surnames, name);

            /* Removing the apostrophe from the name. (Kai'Sa, K'Sante, etc...) */
            pushIfNotPresent(surnames, name.replace("'", ""));

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
    input.oninput = null;
    return;
}
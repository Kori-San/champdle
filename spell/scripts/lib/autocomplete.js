import { cleanSurnames, pushIfNotPresent } from "./utilities.js";

/**
 * It creates a div element for each suggestion and appends it to the suggestions div.
 * 
 * Args:
 *   input: The input element.
 *   list: An array of arrays. Each array contains the image of the champion and the name of the
 * champion.
 */
export function autocomplete(input, list) {
    input.oninput = function (event) {
        /* Closing the list of suggestions. */
        closeList();

        /* Getting the value of the input element. */
        const value = this.value;

        /* Checking if the input is empty. If it is, it returns. */
        if (!value) {
            return;
        }

        /* Creating a div element and appending it to the parent of the input element. */
        const suggestions = document.createElement('div');
        suggestions.setAttribute('id', 'suggestions');
        suggestions.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(suggestions);

        for (const element of list) {

            /* Splitting the name into an array of strings. */
            const name = element[1];
            const surnames = name.split(' ');

            /* It removes the empty strings from the array. */
            cleanSurnames(surnames);

            /* Creating an abbreviation for the champion's name. For example, if the champion's name is
            "Miss Fortune", it will create an abbreviation for it, which is "MF". */
            if (surnames.length === 2) {
                const abbreviation = surnames[0][0] + surnames[1][0];
                pushIfNotPresent(surnames, abbreviation);
            }

            /* Adding the full name to the list of surnames. */
            pushIfNotPresent(surnames, name);

            /* Removing the apostrophe from the name. (Kai'Sa, K'Sante, etc...) */
            pushIfNotPresent(surnames, name.replace("'", ""));

            /* Creating a div element for each suggestion and appending it to the suggestions div. */
            for (const surname of surnames) {
                /* Checking if the surname starts with the value of the input element. If it does, it
                creates a div element for the suggestion and appends it to the suggestions div. */
                if (surname.substr(0, value.length).toLowerCase() == value.toLowerCase()) {
                    /* Creating a div element for each suggestion and appending it to the suggestions
                    div. */
                    const suggestion = document.createElement('div');
                    suggestion.innerHTML = "<div id=\"suggestion-img\"><img src=\"" + element[0] + "\"></div>";
                    suggestion.innerHTML += "<div id=\"suggestion-name\">" + name + "</div>";

                    /* Setting the class of the suggestion div to "suggestion league-font". */
                    suggestion.className = "suggestion league-font";

                    /* Setting the value of the input element to the name of the champion when the user clicks on the
                    suggestion. */
                    suggestion.addEventListener('click', function () {
                        input.value = name;
                        closeList();
                    });

                    /* It changes the cursor to a pointer when the user hovers over the suggestion. */
                    suggestion.style.cursor = 'pointer';

                    /* Appending the suggestion to the suggestions div and then breaking out of the for loop. */
                    suggestions.appendChild(suggestion);
                    break;
                }
            }
        }

    };
}

/**
 * It removes the suggestions list from the DOM
 */
export function closeList() {
    let suggestions = document.getElementById('suggestions');
    if (suggestions) {
        suggestions.parentNode.removeChild(suggestions);
    }
}

/**
 * "Disable the autocomplete feature of the input element by setting its oninput event handler to
 * null."
 * 
 * The oninput event handler is the event handler that is called when the user types something into the
 * input element
 * 
 * Args:
 *   input: The input element to disable autocomplete on.
 */
export function disableAutocomplete(input) {
    input.oninput = null;
}
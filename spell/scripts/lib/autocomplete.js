import { cleanSurnames, pushIfNotPresent } from "./utilities.js";

export function autocomplete(input, list) {
    input.addEventListener('input', function () {
        closeList();

        const value = this.value;

        if (!value)
            return;

        const suggestions = document.createElement('div');
        suggestions.setAttribute('id', 'suggestions');
        suggestions.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(suggestions);

        for (const element of list) {

            const name = element[1];

            const surnames = name.split(' ');
            cleanSurnames(surnames);
            pushIfNotPresent(surnames, name);

            for (const surname of surnames) {
                if (surname.substr(0, value.length).toLowerCase() == value.toLowerCase()) {
                    const suggestion = document.createElement('div');
                    suggestion.innerHTML = "<div><img src=\"" + element[0] + "\"></div>";
                    suggestion.innerHTML += "<div>" + name + "</div>";

                    suggestion.className = "suggestion league-font";

                    suggestion.addEventListener('click', function () {
                        input.value = name;
                        closeList();
                    });

                    suggestion.style.cursor = 'pointer';

                    suggestions.appendChild(suggestion);
                    break;
                }
            }
        }

    });
}

export function closeList() {
    let suggestions = document.getElementById('suggestions');
    if (suggestions) {
        suggestions.parentNode.removeChild(suggestions);
    }
}
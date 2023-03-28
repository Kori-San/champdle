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
            if (element[1].substr(0, value.length).toLowerCase() == value.toLowerCase()) {

                const suggestion = document.createElement('div');
                suggestion.innerHTML = "<div><img src=\"" + element[0] + "\"></div>";
                suggestion.innerHTML += "<div><b>" + element[1].substr(0, value.length) + "</b>" + element[1].substr(value.length) + "</div>";

                suggestion.className = "suggestion league-font";

                suggestion.addEventListener('click', function () {
                    input.value = element[1];
                    closeList();
                });

                suggestion.style.cursor = 'pointer';

                suggestions.appendChild(suggestion);
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
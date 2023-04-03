/* Declaring the localeStorage key and the default lang. */
const languageKey = "lang";
const defaultLang = "en_US";

/**
 * It initializes the languageSelect element.
 * 
 * Returns:
 *   Nothing.
 */
export function initLanguage() {
    /* Getting the languageSelect element. */
    const languageSelect = document.getElementById("language-select");

    /* Display the right language on the footer. */
    displayLanguage();

    /* It removes the event listener from the languageSelect element. */
    languageSelect.removeEventListener("change", () => {
        storeLanguage();
    });

    languageSelect.addEventListener("change", () => {
        storeLanguage();
    });

    return;
}

/**
 * If the language key exists in local storage, return the value of the language key, otherwise return
 * the default language
 * 
 * Returns:
 *   The language that is stored in localStorage.
 */
export function getLanguage() {
    return localStorage.getItem(languageKey) ? localStorage.getItem(languageKey) : defaultLang;
}

/**
 * It gets the value of the selected language, sets the languageKey to the selectedLanguage, and
 * reloads the page
 * 
 * Returns:
 *   The selected language.
 */
function storeLanguage() {
    /* Getting the languageSelect element. */
    const languageSelect = document.getElementById("language-select");

    /* Getting the value of the selected language. */
    const selectedLanguage = languageSelect.value;

    /* Setting the languageKey to the selectedLanguage. */
    localStorage.setItem(languageKey, selectedLanguage);

    /* It reloads the page. */
    window.location.reload();
    return;
}

/**
 * It loops through the languageSelect and sets the selected language to the current language
 * 
 * Returns:
 *   Nothing.
 */
function displayLanguage() {
    /* Getting the languageSelect element. */
    const languageSelect = document.getElementById("language-select");

    /* Getting the current language. */
    const currentLang = getLanguage();

    /* Looping through the languageSelect and setting the selected language to the current language. */
    for (const language of languageSelect) {
        /* Setting the selected language to the current language. */
        language.selected = (language.value === currentLang);
    }

    return;
}
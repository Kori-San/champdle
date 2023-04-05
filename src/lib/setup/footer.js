const languages = {
    "en_US": "English (United States)",
    "fr_FR": "Français (France)",
    "es_ES": "Español (España)",
    "de_DE": "Deutsch (Deutschland)",
    "ru_RU": "Русский (Россия)",
    "ja_JP": "日本語 (日本)",
    "ko_KR": "한국어 (한국)",
    "zh_CN": "中文 (中国)"
}

/**
 * It creates a footer element, adds a class to it, adds social media links to it, adds a language
 * selector to it, and then adds it to the body
 * 
 * Returns:
 *   Nothing.
 */
export function createFooter() {
    /* Creating a footer element it to the body. */
    const footer = document.createElement("footer");

    /* Adding a class to the footer element. */
    footer.classList.add("footer");

    /* Adding the social media links to the footer. */
    footer.innerHTML += generateSocial("https://www.twitter.com/rizaukori", "/images/icon/socials/twitter.svg");
    footer.innerHTML += generateSocial("https://www.github.com/Kori-San/", "/images/icon/socials/github.svg");
    footer.innerHTML += generateSocial("http://www.example.com/", "/images/icon/socials/ko-fi.svg");

    /* Adding the language select to the footer. */
    footer.innerHTML += generateLanguageSelector();
    document.body.appendChild(footer);

    return;
}

/**
 * It takes two strings as arguments, and returns a string that contains a link to a social media page
 * 
 * Args:
 *   socialURL: The URL of the social media page.
 *   imgURL: The URL of the image you want to use.
 * 
 * Returns:
 *   A link to a social media page.
 */
function generateSocial(socialURL, imgURL) {
    /* Creating a link to a social media page. */
    let socialLink = "<a href=\"" + socialURL + "\">";
    socialLink += "<img src=\"" + imgURL + "\">";
    socialLink += "</a>";

    return socialLink;
}

/**
 * It loops through the languages object, and adds an option element to the language selector for each
 * language
 * 
 * Returns:
 *   A string containing a select element with options for each language.
 */
function generateLanguageSelector() {
    /* Creating a select element, and adding the class "language" to it. */
    let languageSelector = "<select class=\"language league-box league-font\" name=\"language\" id=\"language-select\">";

    /* Looping through the languages object, and adding an option element to the language selector for each
    language. */
    for (const [code, language] of Object.entries(languages)) {
        languageSelector += "<option class=\"ignore-translation\" value=\"" + code + "\">" + language + "</option>";
    }

    /* Adding the closing tag for the select element, and returning the language selector. */
    languageSelector += "</select>";
    return languageSelector;
}
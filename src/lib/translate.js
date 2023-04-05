import { getLanguage } from "./language.js";

/**
 * This function translates all content within a specified parent element, except for elements with a
 * class of "ignore-translation", using an asynchronous translation function.
 * 
 * Args:
 *   parent: The `parent` parameter is a string that represents the CSS selector for the parent element
 * that contains all the content to be translated. The function uses this selector to find all the
 * child elements that need to be translated.
 * 
 * Returns:
 *   Nothing.
 */
export async function translateAllContent(parent) {
    const allNodes = document.querySelectorAll(parent + " *");

    for (const element of allNodes) {
        if (element.classList.contains("ignore-translation")) {
            continue;
        }
        else if (element.childNodes.length === 1) {
            element.innerText = await translate(element.innerText);
        }
    }

    return;
}


/**
 * The function translates a given text to the language of the user's choice using the libertranslate
 * API.
 * 
 * Args:
 *   text: The text to be translated.
 * 
 * Returns:
 *   The function `translate` returns a Promise that resolves to a string, which is the translated
 * text.
 */
async function translate(text) {
    /* It checks if `text` is falsy (i.e. `null`, `undefined`, `false`, `0`, `NaN`, or an empty string) then it returns an empty string. */
    if (!text) {
        return "";
    }

    /* Get current language ('en_US' by default) and remove the region tag (e.g remove '_US') */
    const language = getLanguage().replace(/_.*/, "");

    /* Make a request for libertranslate, giving the text to translate and the targeted language. */
    const response = await fetch("http://localhost:8080/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: "auto",
            target: language,
            format: "text",
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });

    /* Parse the response into an object and return the text translated. */
    const data = await response.json();
    return data.translatedText;
}
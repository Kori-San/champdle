import { getLanguage } from "./language.js";

export async function translateAllContent(parent) {
    const allNodes = document.querySelectorAll(parent + " *");

    for (const element of allNodes) {
        if (element.innerText && element.childNodes.length === 1 && !element.classList.contains("ignore-translation")) {
            element.innerText = await translate(element.innerText);
        }
    }

    return;
}

async function translate(text) {
    const language = getLanguage().replace(/_.*/, "");

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

    const data = await response.json();
    return data.translatedText;
}
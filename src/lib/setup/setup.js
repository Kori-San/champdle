import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";

import { initLanguage } from "/lib/language.js";
import { translateAllContent } from "/lib/translate.js";

setup();

async function setup() {
    /* Calling the `createHeader()` and `createFooter()` functions. */
    createHeader();
    createFooter();

    /* Calling the `initLanguage()` function from the `language.js` file. */
    initLanguage();
    translateAllContent("body");

    return;
}
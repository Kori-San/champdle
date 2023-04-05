/**
 * It creates a header element and adds it to the body.
 * 
 * Returns:
 *   Nothing.
 */
export function createHeader() {
    /* Creating a header element and adding it to the body. */
    const header = document.createElement("header");

    /* It adds the class "center" to the header element. */
    header.classList.add("center");

    /* It adds the logo to the header. */
    header.innerHTML += "<a href=\"/\" class=\"logo\"> <img src=\"/images/logo.png\"> </a>";

    /* It adds the header to the body. */
    document.body.prepend(header);
    return;
}

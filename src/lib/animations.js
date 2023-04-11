/**
 * It's shaking the screen for 'quakeTime' seconds
 * 
 * Args:
 *   element: The element that you want to shake.
 *   seconds: The number of seconds to shake the screen.
 * 
 * Returns:
 *   Nothing.
 */
export function animateElementCSS(animation, element, seconds) {
    /* It's removing the class 'quake' from the element. */
    element.classList.remove(animation);

    /* It's shaking the screen for 'quakeTime' seconds. */
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, seconds * 1000);
    return;
}

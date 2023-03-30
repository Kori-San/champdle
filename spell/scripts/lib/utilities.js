/**
 * If the element is not present in the array, push it.
 * 
 * Args:
 *   array: The array to push the element to.
 *   element: The element to add to the array.
 * 
 * Returns:
 *   Nothing.
 */
export function pushIfNotPresent(array, element) {
    if (array.indexOf(element) === -1) {
        array.push(element);
    }
    return;
}


/**
 * It takes an array of strings, and removes any strings that are 2 character long or less
 * 
 * Args:
 *   array: an array of strings
 * 
 * Returns:
 *   Nothing.
 */
export function cleanSurnames(array) {
    for (const element of array) {
        if (element.length <= 2) {
            const index = array.indexOf(element);
            array.splice(index, 1);
        }
    }
    return;
}

/**
 * Clear the value of the element passed to the function.
 * 
 * Args:
 *   element: The element to clear.
 * 
 * Returns:
 *   Nothing.
 */
export function clearInput(element) {
    element.value = "";
    return;
}

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
export function shakeScreen(element, seconds) {
    /* It's removing the class 'quake' from the element. */
    element.classList.remove("quake");

    /* It's shaking the screen for 'quakeTime' seconds. */
    element.classList.add("quake");
    setTimeout(() => {
        element.classList.remove("quake");
    }, seconds * 1000);
}

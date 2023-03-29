/**
 * If the element is not present in the array, push it.
 * 
 * Args:
 *   array: The array to push the element to.
 *   element: The element to add to the array.
 */
export function pushIfNotPresent(array, element) {
    if (array.indexOf(element) === -1) {
        array.push(element);
    }
    return;
}


/**
 * It takes an array of strings, and removes any strings that are either one character long, or equal
 * to "IV"
 * 
 * Args:
 *   array: an array of strings
 * 
 * Returns:
 *   Nothing.
 */
export function cleanSurnames(array) {
    for (const element of array) {
        if (element.length === 1) {
            const index = array.indexOf(element);
            array.splice(index, 1);
        }
        else if (element === "IV") {
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
 */
export function clearInput(element) {
    element.value = "";
    return;
}

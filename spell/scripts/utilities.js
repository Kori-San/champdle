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
 * This function takes an array and a number as arguments and removes all elements from the array that
 * have the same length as the number.
 * 
 * Args:
 *   array: the array to be filtered
 *   length: the length of the elements you want to remove
 */
export function getRidOfLenght(array, length) {
    for (const element of array) {
        if (element.length === length) {
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

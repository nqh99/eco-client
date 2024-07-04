/**
 * Checks if a value is sense.
 * 
 * @param val - The value to check.
 * @returns `true` if the value is null, empty string, or undefined; otherwise, `false`.
 */
const isNull = (val: any): boolean => {
    return val == null || val == "" || val == undefined;
}

export {isNull};
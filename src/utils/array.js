/**
 * Converts array to map
 *
 * @param {array} arr array to convert
 * @param {function} getId function to get the id of each item in array
 * @returns Map
 */
export const toMap = (arr, getId) => {
  return new Map(arr.map((obj) => [getId(obj), obj]));
};

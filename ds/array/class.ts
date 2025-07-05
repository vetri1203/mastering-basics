// ts-node-esm class.ts
class Arrays<T> {
  data: T[];

  constructor(props: T[]) {
    this.data = props;
  }

  /**
   * Calculates the number of elements in the array by iterating through it.
   * @returns {number} The number of elements.
   * @complexity O(n)
   * @see Built-in `Array.prototype.length` is O(1).
   */
  get length() {
    let i = 0;
    while (i in this.data) {
      i++;
    }
    return i;
  }

  /**
   * A helper method to calculate the length of an external array without using the built-in .length property.
   * @param {T[]} items The array to measure.
   * @returns {number} The number of elements in the provided array.
   * @complexity O(k) - where k is the length of the items array.
   */
  private itemsLength(items: T[]) {
    let i = 0;
    while (i in items) {
      i++;
    }
    return i;
  }

  /**
   * Adds one or more elements to the end of the array without using built-in length.
   * Optimized by caching the current length to avoid repeated O(n) calculations.
   *
   * @param {T[]} element - An array of elements to be added at the end.
   * @returns {number} The new length of the array after the elements are added.
   * @complexity O(n + k) - n for initial length calculation, k for inserting elements.
   * @see Built-in `Array.prototype.push` is O(k).
   */
  push(element: T[]): number {
    let len = this.length;
    for (const ele of element) {
      this.data[len] = ele;
      len++;
    }
    return len;
  }

  /**
   * Removes the last element from an array and returns that element.
   * @returns {T | undefined} The removed element, or undefined if the array is empty.
   * @complexity O(n) - as it rebuilds the array.
   * @see Built-in `Array.prototype.pop` is O(1).
   */
  pop() {
    const len = this.length;
    if (this.length == 0) return undefined;

    const lastElement = this.data[len - 1];
    const newArray = [];
    for (let index = 0; index < len - 1; index++) {
      newArray[index] = this.data[index];
    }
    this.data = newArray;

    return lastElement;
  }

  /**
   * Adds one or more elements to the beginning of an array.
   * @param {...T} ele The elements to add to the front.
   * @returns {void}
   * @complexity O(n + k)
   * @see Built-in `Array.prototype.unshift` is O(n + k).
   */
  unshift(...ele: T[]) {
    this.data = [...ele, ...this.data];
  }

  /**
   * Removes the first element from an array and returns that element.
   * @returns {T | undefined} The removed element, or undefined if the array is empty.
   * @complexity O(n) - as it rebuilds the array.
   * @see Built-in `Array.prototype.shift` is O(n).
   */
  shift() {
    const len = this.length;
    if (len < 1) return undefined;
    const newArray = [];
    const firstElement = this.data[0];
    for (let index = 1; index < len; index++) {
      newArray[index - 1] = this.data[index];
    }
    this.data = newArray;
    return firstElement;
  }

  /**
   * Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
   * Note: This implementation is inefficient and contains bugs.
   * @param {number} position The index at which to start changing the array.
   * @param {number} remove An integer indicating the number of elements to remove.
   * @param {...T} items The elements to add to the array.
   * @returns {void}
   * @complexity O(n + k)
   * @see Built-in `Array.prototype.splice` is O(n).
   */
  splice(position: number, remove: number, ...items: T[]) {
    let newArray = [];
    let pointer = 0;

    // removing elements

    for (let index = 0; index < this.length; index++) {
      if (position == index) {
        index += remove;
        if (this.data[index]) {
          newArray[pointer] = this.data[index];
        }
        pointer++;
      } else {
        newArray[pointer] = this.data[index];
        pointer++;
      }
    }

    this.data = newArray;

    // adding the new elements in the exsisting array
    newArray = [];
    if (!items) return;
    pointer = 0;
    let isAdded = false;
    for (let index = 0; index < this.length; index++) {
      if (index == position && !isAdded) {
        for (let j = 0; j < this.itemsLength(items); j++) {
          newArray[pointer] = items[j];
          pointer++;
        }
        isAdded = true;
        index--;
      } else {
        newArray[pointer] = this.data[index];
        pointer++;
      }
    }

    this.data = newArray;
  }

  /**
   * Returns a shallow copy of a portion of an array into a new array object.
   * @param {number} startIndex The beginning index of the slice.
   * @param {number} endIndex The ending index of the slice (the element at this index is not included).
   * @returns {T[]} A new array containing the extracted elements.
   * @complexity O(n + k) - due to the O(n) length calculation.
   * @see Built-in `Array.prototype.slice` is O(k).
   */
  slice(startIndex: number, endIndex: number): T[] {
    const len = this.length;
    if (startIndex < 0) startIndex += len;
    console.log(startIndex, "startIndex");
    if (endIndex < 0) endIndex += len;
    console.log(endIndex, "endIndex");

    const newArray = [];
    let pointer = 0;
    for (let index = startIndex; index < endIndex; index++) {
      if (index >= len || index < 0) return newArray;
      newArray[pointer] = this.data[index];
      pointer++;
    }
    return newArray;
  }

  /**
   * Merges two or more arrays. This method returns a new array and does not change the existing arrays.
   * Note: This implementation is highly inefficient.
   * @param {...T[][]} arrays The arrays to concatenate.
   * @returns {T[]} A new array containing the elements of all arrays.
   * @complexity O(m^2) - where m is the total length of the final array.
   * @see Built-in `Array.prototype.concat` is O(m).
   */
  concat(...arrays: T[][]) {
    let index = 0;
    let newArray = [...this.data];
    while (index in arrays) {
      newArray = [...newArray, ...arrays[index]];
      index++;
    }
    return newArray;
  }
}

function result() {
  const dataSet = new Arrays(["Cecilie", "Lone"]);
  const arr = [1, 1, 1];
  console.log("Initital Array", dataSet.data);
  // console.log(" Array length : ", dataSet.length);
  // dataSet.push([5, 3]);

  // console.log("After push : ", dataSet.data);
  // console.log(" Array length : ", dataSet.length);
  // // pop()
  // dataSet.pop();
  // console.log("After pop : ", dataSet.data);

  // // console.log(" Array length : ", dataSet.length);

  // // unshift()

  // dataSet.unshift(6, 7, 8);
  // console.log("After unshift", dataSet.data);
  // console.log("dataSet Length : ", dataSet.length);

  // //shift()

  // console.log("shift() : ", dataSet.shift());
  // console.log("After shift : ", dataSet.data);
  // console.log(dataSet.length);

  // dataSet.splice(1, 3, 6, 7);
  // console.log("After Splice Removing : ", dataSet);
  // console.log("length : ", dataSet.length);

  const arr1 = ["Cecilie", "Lone"];
  const arr2 = ["Emil", "Tobias", "Linus"];
  const arr3 = ["Robin"];
  console.log(dataSet.concat(arr2, arr3));

  // console.log(dataSet.slice(0, 4));
}

result();

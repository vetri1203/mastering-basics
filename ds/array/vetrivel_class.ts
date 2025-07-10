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

    if (position < 0) {
      position = this.length + position;
      if (position < 0) position = 0;
    } else if (position > this.length) {
      position = this.length;
    }

    let removedElement = [];
    for (
      let index = position;
      index < position + remove && index < this.length;
      index++
    ) {
      removedElement[pointer] = this.data[index];
      pointer++;
    }
    newArray = [];
    pointer = 0;
    for (let index = 0; index < this.length; index++) {
      if (index === position) {
        index += remove - 1;
        continue;
      }
      newArray[pointer] = this.data[index];
      pointer++;
    }

    this.data = newArray;

    newArray = [];
    pointer = 0;
    let isAdded = false;
    for (let index = 0; index < this.length; index++) {
      if (index === position && !isAdded) {
        for (let j = 0; j < this.itemsLength(items); j++) {
          newArray[pointer++] = items[j];
        }
        isAdded = true;
      }
      newArray[pointer] = this.data[index];
      pointer++;
    }

    if (position >= this.length && items.length > 0) {
      for (let j = 0; j < this.itemsLength(items); j++) {
        newArray[pointer] = items[j];
        pointer++;
      }
    }

    this.data = newArray;
    return removedElement;
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

  includes(searchElement: T, startIndex: number = 0) {
    console.log(startIndex);
    let actualStartIndex = startIndex;
    if (startIndex < 0) {
      actualStartIndex = this.length + startIndex;
      if (actualStartIndex < 0) actualStartIndex = 0;
    }

    for (let index = actualStartIndex; index < this.length; index++) {
      if (searchElement === this.data[index]) {
        return true;
      }
    }
    return false;
  }

  indexOf(searchElement: T, startIndex: number = 0) {
    if (startIndex < 0 || startIndex > this.length) return -1;

    for (let index = startIndex; index < this.length; index++) {
      if (searchElement === this.data[index]) return index;
    }
    return -1;
  }

  lastIndexOf(searchElement: T, startIndex: number = 0) {
    if (startIndex < 0 || startIndex > this.length) return -1;
    let searchElementIndex = -1;

    for (let index = startIndex; index < this.length; index++) {
      if (searchElement === this.data[index]) searchElementIndex = index;
    }
    return searchElementIndex;
  }

  find(
    predicate: (value: T, index: number, obj: T[]) => value is T,
    thisArg?: any
  ) {
    for (let index = 0; index < this.length; index++) {
      if (predicate.call(thisArg || this, this.data[index], index, this.data)) {
        return this.data[index];
      }
    }
    return undefined;
  }

  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number {
    for (let index = 0; index < this.length; index++) {
      if (predicate.call(thisArg || this, this.data[index], index, this.data)) {
        return index;
      }
    }
    return -1;
  }

  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void {
    for (let index = 0; index < this.length; index++) {
      callbackfn.call(thisArg || this, this.data[index], index, this.data);
    }
  }

  map(
    callbackfn: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): unknown[] {
    const newArray = [];
    for (let index = 0; index < this.length; index++) {
      newArray[index] = callbackfn.call(
        thisArg || this,
        this.data[index],
        index,
        this.data
      );
    }
    return newArray;
  }

  filter(
    predicate: (value: T, index: number, array: T[]) => value is T,
    thisArg?: any
  ): T[] {
    const newArray = [];
    let pointer = 0;
    for (let index = 0; index < this.length; index++) {
      if (predicate.call(thisArg || this, this.data[index], index, this.data)) {
        newArray[pointer] = this.data[index];
        pointer++;
      }
    }
    return newArray;
  }

  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue?: T
  ) {
    if (this.length == 0) return;
    let result;
    let index = 0;
    if (initialValue) {
      result = initialValue;
    } else {
      result = this.data[index];
      index++;
    }
    for (; index < this.length; index++) {
      result = callbackfn(result, this.data[index], index, this.data);
    }
    return result;
  }

  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue?: T
  ) {
    if (this.length == 0) return;
    let index = this.length - 1;
    let result;
    if (initialValue) {
      result = initialValue;
    } else {
      result = this.data[index];
      index--;
    }

    for (; index >= 0; index--) {
      result = callbackfn(result, this.data[index], index, this.data);
    }

    return result;
  }

  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    if (this.length === 0) return false;
    for (let index = 0; index < this.length; index++) {
      if (predicate.call(thisArg || this, this.data[index], index, this.data))
        return true;
    }
    return false;
  }

  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    if (this.length === 0) return false;
    for (let index = 0; index < this.length; index++) {
      if (!predicate.call(thisArg || this, this.data[index], index, this.data))
        return false;
    }
    return false;
  }
}

function result() {
  const dataSet = new Arrays([1, 2, 3, 4]);
  const arr = [1, 1, 1];
  // arr.some();
  // arr.reduceRight();
  // arr.filter();
  // console.log(arr);
  // console.log("Initital Array", dataSet.data);
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

  // console.log(dataSet.splice(-1, 2, "Lemon", "Kiwi"), "splice");
  // console.log("After Splice Removing : ", dataSet);
  // console.log("length : ", dataSet.length);

  // const arr1 = ["Cecilie", "Lone"];
  // const arr2 = ["Emil", "Tobias", "Linus"];
  // const arr3 = ["Robin"];
  // console.log(dataSet.concat(arr2, arr3));

  // console.log(dataSet.slice(0, 4));
  // console.log(dataSet.includes("Banana", -10), "inclu");
  // console.log(dataSet.indexOf("Mango", 2));
  // console.log(dataSet.lastIndexOf("Apple"));

  // console.log(dataSet.findIndex((x) => x === "Mango"));
  // dataSet.forEach((data, index) => {
  //   consolenewa.log("Index : ", index, " Data for that index is :", data);
  // });

  console.log(dataSet.map((index) => index * 2));
  const newa = dataSet.reduceRight(
    (accumulator, currentValue) => accumulator - currentValue,
    1
  );
  console.log(newa);
  console.log(dataSet.some((x) => x > 2));
}

result();

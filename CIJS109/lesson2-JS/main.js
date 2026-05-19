// let fruits = ["apple", "banana", "cherry"];
// console.log("Fruits: ", fruits[0]);

// Thêm phần tử vào cuối
// fruits.push("orange");
// fruits.push("avocado");

// Xoá phần tử cuối cùng
// fruits.pop();

// Xoá phần tử ở đầu
// fruits.shift();

// Ở vị trí 1 -> "banana" -> 0 là không xoá gì -> thêm "grape" ở trước
// fruits.splice(1,0, "grape");

// console.log("Fruits: ", fruits);

// let arr = [1, 2, 3, 4, 5];
// let result = []
// for (let i = 0; i < arr.length; i++) {
//     result.push(arr[i] * 3);
// }

// .map tạo một mảng mới
// let result2 = arr.map((item) => {
//     console.log(" item:", item);
//     return item*2;
// });

// [2,3,4] => [4,9,16]
// let arr = [2,3,4];
// let result = arr.map((item) => {
//     return item * item;
// });
// console.log(result);

// filter: lọc các phần tử trong mảng

// let numbers = [1,2,3,4,5];
// let result = numbers.filter((currentValue) => {
//     return currentValue > 3;
// })

// console.log("Results: ", result);

// const person = {
//     name: "MindX",
//     age: 10,
//     country: "Vietnam",
// }

// for (const key in person) {
//     console.log("Key: ", key);

//     console.log(key + " is " + person[key]);
// }

import {
  cleanObject,
  countElements,
  countOccurrences,
  findMaxKey,
  findMostExpensiveProduct,
  findSecondLargest,
  flattenArray,
  groupByType,
  hasDuplicater,
  isSubset,
  isSymmetric,
  mergeObjectsSumValues,
  removeDuplicates,
  sortProductsByPrice,
  sumArray,
  sumByGroup,
  uniqueValues,
} from "./utils.js";
let arr = [1, 2, 3, 4];
console.log(sumArray(arr));

let arr2 = [1, 2, 2, 3, 2];
console.log(countOccurrences(arr2, 2));

let arr3 = [1, 2, 2, 3, 4, 4, 6, 2, 3, 6];
console.log(removeDuplicates(arr3));

let arr4 = [
  [1, 2],
  [3, 4],
];
console.log(flattenArray(arr4));

let arr5 = [1, 2, 3, 2, 1];
console.log(isSymmetric(arr5));

let arr6 = [3, 1, 4, 2, 4];
console.log(findSecondLargest(arr6));

let products = [
  { name: "Product A", price: 30 },
  { name: "Product B", price: 20 },
  { name: "Product C", price: 50 },
];
console.log(sortProductsByPrice(products));
console.log(findMostExpensiveProduct(products));

let arr7 = [
  { type: "fruit", name: "apple" },
  { type: "vegetable", name: "carrot" },
  { type: "fruit", name: "banana" },
];
console.log(groupByType(arr7));

let arr8 = [1, 2, 3, 4];
let arr9 = [2, 4];
console.log(isSubset(arr8, arr9));

let obj = { a: 10, b: 20, c: 15 };
console.log(findMaxKey(obj));

let obj2 = { a: 10, b: 20 };
let obj3 = { b: 30, c: 40 };
console.log(mergeObjectsSumValues(obj2, obj3));

let arr10 = ["a", "b", "a", "c", "b", "a"];
console.log(countElements(arr10));

let obj4 = { a: 1, b: null, c: undefined, d: 4 };
console.log(cleanObject(obj4));

let arr11 = [1, 2, 3, 4, 2];
console.log(hasDuplicater(arr11));

let arr12 = [
  { type: "fruit", price: 10 },
  { type: "vegetable", price: 20 },
  { type: "fruit", price: 30 },
];
console.log(sumByGroup(arr12, 'type'));

let arr13 = [1, 2, 3];
let arr14 = [3, 4, 5];
console.log(uniqueValues(arr13, arr14));

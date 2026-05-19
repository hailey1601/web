import {
  productInfo,
  greet,
  sum,
  square,
  isEven,
  firstElement,
  sum2,
  printUser,
  printName,
  findMax,
  findMin,
  stringLength,
  toUpperCase,
  isPrime,
} from "./utils.js";
console.log(productInfo("Sách", 20000));
console.log(greet("An"));
console.log(`Total of 1 to n = ${sum(5)}`);
console.log(`Square of 5 is ${square(5)}`);
console.log(isEven(7));
console.log(firstElement([1, 2, 3]));
console.log(sum2(1, 2, 3, 4));

const userObj = { name: "Nam", age: 30 };
console.log(printUser(userObj));

const person = [{ name: "An" }, { name: "Binh" }];
console.log(printName(person));

console.log(`The biggest number is ${findMax(3,4,2,5,6,7)}`);
console.log(`The smallest number is ${findMin(3,4,2,5,6,7)}`);

console.log(`String length is: ${stringLength("Hello World")}`);
console.log(`Upper case: ${toUpperCase("javascript")}`);
console.log(`Prime number check: ${isPrime(7)}`);
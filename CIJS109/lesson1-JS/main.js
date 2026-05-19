// console.log("Hello Word!");

// let price = 5000;
// let msg = "Giá " + price + " VND";
// let msg2 = `Giá ${price} VND`;

// console.log("msg: ", msg);
// console.log("msg2: ", msg2);

// let name = "Haanh";
// let age = 18;
// let school = "MindX";

// let msg = `Tên tôi là ${name} và tôi ${age} tuổi và tôi học tại ${school}`;
// console.log(msg);

// function greet(name, age, school) {
//     return `Hello my name is ${name} and i am ${age} years old and my school is ${school}`;
// }

// console.log(greet("Haanh", 18, "MindX"));

// const sum = (name) => {
//     return `Hello, ${name}!`;
// };

// // Arrow function (viết tắt)
// const sum2 = (name) => `Hello, ${name}`
// console.log(sum2("MindX"));

// Rest Operator (hứng toàn bộ nên lúc nào cũng phải ở cuối)
// const sumAll = (...numbers) => {
//     let sum = 0;
//     for(let i =0; i < numbers.length; i++){
//         sum = sum + numbers[i];
//     }
//     return sum;
// }

// console.log(sumAll(4,6,3,5,7,3,7));

import {sum, sub} from "./math.js";
console.log(sum(5,3));
console.log(sub(5,3));
// Vòng for dùng để thực thi 1 hành động lặp đi lặp lại nhiều lần

/* 
for (điểm bắt đầu; điều kiện; bước nhảy) {}
*/

// for (let i = 0; i < 10; i++){
//     console.log(i);
// }

// for (let i = 0; i < 10; i+=2) {
//     console.log(i)
// }

let tong = 0 
let result = ""
let array = []
let sum = 0; 


for (let i = 0; i < 1000; i++) {
    if (i%17 == 0 && (i-2)%3 == 0 && i > 500) {
        tong = tong + 1;
        console.log(i); 
        result = result + i + " ";
        array.push(i);
    } 
}


for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    sum = sum + array[i]
}

console.log("tổng bằng: " + tong);
console.log("các số đủ điều kiện là: " + result);
console.log(array);
console.log("tổng các số trong mảng là: "+ sum); 
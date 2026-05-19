let a = 10
let b = 20 

console.log(`a + b = ${a + b}`); 
// console.log("a + b =" + (a + b));


// function co tham so - tham so la x,y 
function chuc_nang(x,y) {
    console.log("a x b = " + x * y); 
}
// x,y = 3,4 
chuc_nang(3,4) 

// function return 
function tra_ve(firstName, lastName) {
    return firstName + " " + lastName; 
}

console.log(`Ten 1: ` + tra_ve("Ha Anh", "Nguyen")); 
tra_ve("Ha Anh", "Nguyen")

// let array = [1,2,3,4,5]
// function mang(array) {
//     return array.length; 
// }

// console.log(`Chieu dai cua mang do bang: ` + mang(array));


let array_member = [
    {
      name: "Phương",
      stt: 10,
    },
  
    {
      name: "Chau",
      stt: 20,
    },
  
    {
      name: "Quan",
      stt: 30,
    },
];

// function doiTuong(array_member) {
//     let sum = 0
//     for (let i = 0; i < array_member.length; i++) {
//         sum = sum + array_member[i].stt
//     }; 
//     return sum; 
// }

// console.log(`Tong stt trong mang la ` + doiTuong(array_member)); 


// function tongHaiMang() {
//     return doiTuong(array_member) + mang(array);
// }
// console.log(`Tong cua hai mang la ` + tongHaiMang())

// console.log(doiTuong(array_member) + mang(array))


function check(array_member) {
    let count = 0

    for (let i = 0; i < array_member.length; i++) {
        if (array_member[i].name.includes("a") === true) {
            count = count + 1; 
        }
    }; 

    if (count === array_member.length) {
        return true; 
    } else {
        return false; 
    }

//     for (let i = 0; i < array_member.length; i++) {
//         if (array_member[i].name.includes("a") === false) {
//             return false
//         }
//     }
//     // Khong de ben trong boi vi khi no check mot doi tuong ma co "a" la no se dung luon khong check nhung doi tuong con lai
//     return true
}

console.log(`Cac ten deu co chu "a" khong ` + check(array_member));



let big_array_number = [1, 20, 54, 39, 88, 3245, 99, 32, 87];

// Tìm số chẵn
function check_even_number(even_array) {
    let evenNumbers = [];  // Để mảng đấy rỗng để lát vòng for đi qua từng số trong mảng đã cho kia thì số nào thoả mãn yêu cầu sẽ cho vào

    for (let i = 0; i < even_array.length; i++) {
      if (even_array[i] % 2 === 0) {
        evenNumbers.push(even_array[i]); // Tăng biến đếm khi tìm thấy số chẵn
      }
    }
  
    return evenNumbers;
  }
  
console.log("Số lượng số chẵn:", check_even_number(big_array_number));

// Tìm số lẻ
function check_odd_numbers(odd_array) {
    let oddNumbers = [];

    for (let i = 0; i < odd_array.length; i++) {
      if (odd_array[i] % 2 !== 0) {
        oddNumbers.push(odd_array[i]);
      }
    }
    return oddNumbers;
  }

console.log("Tổng số lẻ là: ", check_odd_numbers(big_array_number))

// Hoán đổi số đầu số cuối 
function changeNumber() {
    let newBigArray = [1, 20, 54, 39, 88, 3245, 99, 32, 87];
    
    let temp = newBigArray[0]; 
    // Gán giá trị đầu xuống cuối trong newBigArray 
    newBigArray[0] = newBigArray[8]; 
    // Gán giá trị cuối lên đầu 
    newBigArray[8] = temp; 

    return newBigArray; 
}

console.log("Mảng mới là: ", changeNumber(big_array_number));
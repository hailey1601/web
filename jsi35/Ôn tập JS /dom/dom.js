// Lấy 1 thẻ thông qua ID 
// let h1 = document.getElementById("myName");

// Cách để truy cập nội dung của 1 thẻ: 
// tên_thẻ.innerText, tên_thẻ.innerHTML
// console.log('Nội dung của thẻ là: ' + h1.innerText); 

// Thay đổi nội dung của 1 thẻ thông qua dom
// tên_thẻ.innerText = "giá trị mới"
// h1.innerText = "Hahaha"
// h1.style.backgroundColor = "yellow"


// Thay đổi màu nền của từng box 
// Cách 1: trỏ vào từng box
let box1 = document.getElementsByClassName("box1")
let box2 = document.getElementsByClassName("box2")
let box3 = document.getElementsByClassName("box3")

// box1.style.backgroundColor = "blue"

// Cách 2: chỉ dùng "box" để màu nền của từng box
let box = document.getElementsByClassName("box")
// box[0].style.backgroundColor = "blue"
// box[1].style.backgroundColor = "blue"
// box[2].style.backgroundColor = "blue"

// console.log(box1)
// console.log(box2)
// console.log(box3)
// console.log(box);

// let smallBox = document.getElementsByClassName("small_box")
// smallBox[0].style.backgroundColor = "blue"
// smallBox[1].style.backgroundColor = "blue"
// smallBox[2].style.backgroundColor = "blue"
// smallBox[3].style.backgroundColor = "blue"
// smallBox[4].style.backgroundColor = "blue"


let bigBox = document.getElementsByClassName("box_container")
bigBox[0].style.borderRadius = "50%"

let numberBox = document.querySelectorAll(".box div")
// console.log(numberBox);

for (let i = 0; i < numberBox.length; i++) {
    // numberBox[i].innerText = i + 1;
    // numberBox[i].style.color = "white"
    numberBox[i].style.borderRadius = "50%"
}

let button = document.querySelector(".button")
button.addEventListener("click", function(){
    for (let i = 0; i < numberBox.length; i++) {
        numberBox[i].style.borderRadius = "0"
    }
    bigBox[0].style.borderRadius = "0"
})



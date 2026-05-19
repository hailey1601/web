let myButton = document.querySelector("#button")
// myButton.addEventListener(kiểu sự kiến muốn gán, function cần thực thi)

// Cách 1: 
// function printHello() {
//     console.log("Hello")
// }
// printHello()

// myButton.addEventListener("click", printHello);


// Cách 2: 
// myButton.addEventListener("click", function () {
//     console.log("Hello");
// });

let name = document.querySelector(".name")
myButton.addEventListener("click", function () {
        // name.innerText = "Nguyen Ha Anh"
        // name.style.color = "blue"
        name.style.display = "none"
});


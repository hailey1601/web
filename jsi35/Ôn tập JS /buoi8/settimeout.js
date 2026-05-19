// let h1 = document.getElementById("h1");
// setTimeout(function() {
//     h1.innerText = "Đây là data đang loading...";
// }, 3000);

// console.log(h1)
// setTimeout(chức năng, thời gian để thực hiện chức năng(đơn vị: milisecond))

// setInterval
// setInterval(function() {
//     console.log("Hello")
// }, 2000);

// let i = 1
// let timer 
// timer = setInterval(function() {
//     if ( i <= 5) {
//         console.log(i);
//         i++;
//     };
// }, 2000);

let start = document.getElementById("start");
let pause = document.getElementById("pause");
let resume = document.getElementById("resume");
let count = document.getElementById("count");

let counter = 0;
let interval;

pause.disabled = true;
resume.disabled = true;

start.addEventListener("click", function () {
    start.disabled = true; 
    interval = setInterval(function () {
        counter++; 
        count.innerText = counter; 
    }, 1000);
    pause.disabled = false; 
});

pause.addEventListener("click", function() {
    pause.disabled = true;
    clearInterval(interval);
    resume.disabled = false; 
});

resume.addEventListener("click", function() {
    pause.disabled = false; 
    interval = setInterval(function () {
        counter++; 
        count.innerText = counter; 
    }, 1000);
});
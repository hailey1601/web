let usernameRegister = document.getElementById("usernameRegister")
let passwordRegister = document.getElementById("passwordRegister")
let registerBtn = document.querySelector(".registerBtn")

// Lay phan listUser ra truoc
let listUserLocalStorage = JSON.parse(localStorage.getItem("listUser"))
// Neu chua co thi tao moi
if (listUserLocalStorage === null) {
    localStorage.setItem("listUser", JSON.stringify([]))
    window.location.reload();
}

console.log(listUserLocalStorage);

registerBtn.addEventListener("click", function() {
    console.log(usernameRegister);
    console.log(passwordRegister);

    // // Check tai khoan (cách 1)
    // let isDuplicate = false
    // for(let i = 0; i < listUserLocalStorage.length; i++) {
    //     isDuplicate = true; 
    // }

    // // Xu li logic 
    // if (isDuplicate === true) {
    //     alert("Tai khoan nay da ton tai, vui long tao tai khoan khac");
    // } else {
    //     listUserLocalStorage.push({
    //         username: usernameRegister.value,
    //         password: passwordRegister.value
    //     })

    //     // Luu lai mang vua update vao localStorage
    //     localStorage.setItem("listUser", JSON.stringify(listUserLocalStorage))

    //     alert("Tao tai khoan thanh cong!")
    // }

    // Cach 2
    if (checkExistedUser(listUserLocalStorage, usernameRegister.value) === true) {
        alert("Tai khoan nay da ton tai, vui long tao tai khoan khac");
    } else {
        listUserLocalStorage.push({
            username: usernameRegister.value,
            password: passwordRegister.value
        })

        // Luu mang vua update vao localStorage 
        localStorage.setItem("listUser", JSON.stringify(listUserLocalStorage));
        
        alert("Tao tai khoan thanh cong!")

        usernameRegister = ""; 
        passwordRegister = ""; 
    }
}); 

function checkExistedUser(arrayUserFromLocal, inputUserNameRegister) {
    for(let i = 0; i < listUserLocalStorage.length; i++){
        if(arrayUserFromLocal[i].username === inputUserNameRegister) {
            return true;
        }
    }

    return false; 
}
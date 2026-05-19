export const productInfo = (name, price) => {
  const formattedPrice = price.toLocaleString("vi-VN");
  return `Sản phẩm: ${name}, Giá: ${formattedPrice} VND.`;
};

export const greet = (name) => `Xin chào, ${name}!`;

export const sum = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

export const square = (n) => n * n;

export const isEven = (num) => {
  if (num % 2 == 0) {
    return true;
  } else {
    return false;
  }
};

export function firstElement(arr) {
  if (arr.length < 1) {
    return undefined;
  }
  return arr[0];
}

export const sum2 = (...numbers) => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};

export const printUser = (user) => {
    return `Name: ${user.name}, Age: ${user.age}`;
};

export const printName = (peopleArr) => {
  let results = "";
  for (let i = 0; i < peopleArr.length; i++) {
    results += peopleArr[i].name + ", ";
  }
  return results;

//   return peopleArr.map((person) => person.name).join(", ");
};

export const findMax = (...numbers) => {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

// BONUS-HOMEWORK
export const findMin = (...arrNum) => {
    let min = arrNum[0];
    for (let i = 1; i < arrNum.length; i++) {
        if (arrNum[i] < min) {
            min = arrNum[i];
        }
    }
    return min;
}

export const stringLength = (str) => {
  return str.length;
}

export const toUpperCase = (str) => {
  return str.toUpperCase();
}

export const isPrime = (num) => {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i == 0) {
      return false; 
    } 
  }

  return true;
};
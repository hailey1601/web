export const sumArray = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

export const countOccurrences = (arr, value) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      count++;
    }
  }
  return count;
};

export const removeDuplicates = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    // indexOf trả về -1 nghĩa là "tìm không thấy" (chưa có)
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

// export const removeDuplicates = (arr) => {
//     return arr.filter((item, index) => {
//         return arr.indexOf(item) === index;
//     })
// }

export const flattenArray = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      newArr.push(arr[i][j]);
    }
  }
  return newArr;
  // return arr.flat();
};

export const isSymmetric = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arr[arr.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

export const findSecondLargest = (arr) => {
  let max = -Infinity;
  let secondMax = -Infinity;

  for (let num of arr) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax && num < max) {
      secondMax = num;
    }
  }

  return secondMax;
};

export const sortProductsByPrice = (products) => {
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products.length - 1; j++) {
      if (products[j].price > products[j + 1].price) {
        let temp = products[j];
        products[j] = products[j + 1];
        products[j + 1] = temp;
      }
    }
  }
  return products;
};

export const findMostExpensiveProduct = (products) => {
  let maxPrice = products[0];

  for (let i = 1; i < products.length; i++) {
    if (products[i].price > maxPrice.price) {
      maxPrice = products[i];
    }
  }
  return maxPrice;
};

export const groupByType = (arr) => {
  let result = {};

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    let type = item.type;
    if (!result[type]) {
      result[type] = [];
    }
    result[type].push(item.name);
  }
  return result;
};

export const isSubset = (arr1, arr2) => {
  for (let i = 0; i < arr2.length; i++) {
    let currentValue = arr2[i];
    if (!arr1.includes(currentValue)) {
      return false;
    }
  }
  return true;
};

export const findMaxKey = (obj) => {
  const keys = Object.keys(obj);

  if (keys.length === 0) return null;

  let maxKey = keys[0];

  for (let i = 1; i < keys.length; i++) {
    let currentKey = keys[i];
    if (obj[currentKey] > obj[maxKey]) {
      maxKey = currentKey;
    }
  }

  return maxKey;
};

export const mergeObjectsSumValues = (obj1, obj2) => {
  let result = { ...obj1 };

  for (let key in obj2) {
    if (result[key] !== undefined) {
      result[key] += obj2[key];
    } else {
      result[key] = obj2[key];
    }
  }
  return result;
};

export const countElements = (arr) => {
  let count = {};

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];

    if (count[element]) {
      count[element]++;
    } else {
      count[element] = 1;
    }
  }
  return count;
};

export const cleanObject = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export const hasDuplicater = (arr) => {
  let seen = new Set();

  for (let i = 0; i < arr.length; i++) {
    let currentNum = arr[i];

    if (seen.has(currentNum)) {
      return true;
    }

    seen.add(currentNum);
  }
  return false;
};

export const sumByGroup = (arr, key) => {
  let result = {};

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]; 

    let groupName = item[key];

    let amount = item.price; 

    if (result[groupName]) {
        result[groupName] += amount; 
    } else {
        result[groupName] = amount; 
    }
  }
  return result; 
};


export const uniqueValues = (arr1, arr2) => {
    let result = [...arr1];

    for (let i = 0; i < arr2.length; i++) {
        let currentNum = arr2[i]; 
        if (!result.includes(currentNum)) {
            result.push(currentNum); 
        }
    }

    return result; 
}
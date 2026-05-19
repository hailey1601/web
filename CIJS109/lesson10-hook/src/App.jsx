// import React, { useRef, useState } from "react";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(0);
//   console.log("Count Ref Global:", countRef.current);
//   const incrementCount = () => {
//     setCount(count + 1);
//     countRef.current += 1;
//     console.log("Count:", count);
//     // để truy cập giá trị của ref, cần thông qua thuộc tính current
//     // do bản chất giá trị của ref là một object
//     console.log("Count Ref:", countRef.current);
//   };
//   const increRef = () => {
//     countRef.current += 1;
//     // để truy cập giá trị của ref, cần thông qua thuộc tính current
//     // do bản chất giá trị của ref là một object
//     console.log("Count Ref:", countRef.current);
//   };
//   return (
//     <div>
//       <p>Count: {count}</p>
//       <p>Count ref: {countRef.current}</p>
//       <button onClick={incrementCount}>Increment</button>
//       <button onClick={increRef}>Incre ref</button>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";

// // Component ListItem được ghi nhớ
// const ListItem = React.memo(({ item }) => {
//   console.log("Rendering item:", item.id);
//   return <li>{item.text}</li>;
// });

// const List = ({ items }) => {
//   return (
//     <ul>
//       {items.map((item) => (
//         <ListItem key={item.id} item={item} />
//       ))}
//     </ul>
//   );
// };

// const App = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: "Item 1" },
//     { id: 2, text: "Item 2" },
//     { id: 3, text: "Item 3" },
//   ]);

//   const updateItem = () => {
//     const newItems = [...items];
//     newItems[1] = {
//       text: "Updated text item 2",
//       ...newItems[1],
//     };
//     setItems(newItems);
//   };

//   return (
//     <div>
//       <List items={items} />
//       <button onClick={updateItem}>Update Item 2</button>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useMemo } from "react";

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [inputValue, setInputValue] = useState("");

//   const expensiveCalculation = (num) => {
//     console.log("Calculating...");
//     // Giả sử đây là một tính toán đắt đỏ
//     for (let i = 0; i < 1000000; i++) {
//       num += 1;
//     }
//     return num;
//   };

//   const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

//   return (
//     <div>
//       <h1>useMemo Example</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <p>Computed Value: {memoizedValue}</p>
//       <button onClick={() => setCount(count + 1)}>Increment Count</button>
//     </div>
//   );
// };

// export default App;

import { useState, useCallback, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  const fetchData = useCallback(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((resJson) => {
        setUser(resJson.results[0]);
      });
  }, []);
  
  // lúc này ta truyền deps là fetchData, khi component re-render, fetchData vẫn giữ tham thiếu cũ của nó, cho nên useEffect vẫn chỉ chạy 1 lần duy nhất sau khi render
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <button onClick={fetchData}>Refresh</button>
      {user ? (
        <div>
          <img src={user.picture.medium} alt="" />
          <p>
            {user.name.first} {user.name.last}
          </p>
        </div>
      ) : null}
    </div>
  );
}
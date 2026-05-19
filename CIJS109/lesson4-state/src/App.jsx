// function App() {
//   // let age = 10;

//   const [age, setAge] = useState(10);

//   const handleIncAge = () => {
//     // age++;
//     // console.log(age);
//     setAge(age + 1);
//   };

//   return (
//     <div className="app">
//       <h1>Hello mọi người!</h1>
//       <p>Mỗi năm tôi sẽ được tăng 1 tuổi</p>
//       <p>Hiện tại tôi: {age} tuổi!</p>
//       <button onClick={handleIncAge}>Tăng tuổi</button>
//     </div>
//   )
// }

// export default App;

// function App() {
//   const [isOn, setIsOn] = useState(false);

//   const toggleSwitch = () => {
//     setIsOn(!isOn);
//   };

//   return (
//     <div>
//       <div>
//         <span>Đèn:</span>
//         <div className="lightBulb"
//           style={{
//             backgroundColor: isOn ? 'yellow' : 'black'
//           }}></div>
//       </div>
//       <button onClick={toggleSwitch}>Chuyển trạng thái</button>
//     </div>
//   );
// }

// export default App;

import UserInfoForm from "./components/UserInfoForm";
import ShowUserInfo from "./components/ShowUserInfo";
import { useState } from "react";
import TodoPage from "./components/todoList/TodoPage";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>Exercise 1</h1>
      <UserInfoForm
        name={name}
        email={email}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
      />
      {isSubmitted && <ShowUserInfo name={name} email={email} />}

      <TodoPage />
    </div>
  );
};

export default App;

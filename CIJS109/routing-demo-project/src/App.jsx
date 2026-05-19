// import Profile from "./screens/Profile";
// import "./App.css";
// import LoginPage from "./screens/Login";
// import { Route, Routes } from "react-router";

// function App() {
//   return (
//     <div className="app w-screen min-h-screen bg-[#F0F4F5]">
//       <Routes>
//         <Route path="" element={<h1>Hello MindX</h1>} />
//         <Route path="/my-profile" element={<Profile />} />
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import Profile from "./screens/Profile";
import "./App.css";
import LoginPage from "./screens/Login";
import { Route, Routes, useNavigate } from "react-router";
import ListPost from "./components/Post";
import UserProfile from "./components/UserProfile";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("email")) {
      console.log("User is logged in");
      navigate("/my-profile");
    } else {
      console.log("User is not logged in");
      navigate("/login");
    }
  }, []);

  return (
    <div className="app w-screen min-h-screen bg-[#F0F4F5]">
      <Routes>
        <Route path="" element={<h1>Hello MindX</h1>} />
        <Route path="/my-profile" element={<Profile />}>
          {/* thuộc tính/prop index mang ý nghĩa nếu không có child url nào, thì element tại đây sẽ được mặc định hiển thị */}
          <Route index element={<ListPost />} />
          <Route path="my-posts" element={<ListPost />} />
          <Route path="information" element={<UserProfile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

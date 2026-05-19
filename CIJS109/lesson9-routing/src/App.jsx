import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile'; 
import Login from './pages/login/login.jsx';    

function App() {
  return (
    <div>
      <h1>My App</h1>
      
      <Routes>
        <Route path="/" element={<div>Trang chủ</div>} />
        
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './composents/ProtectedRoute'; 
import Logout from './composents/Logout';
import './styles/Register.css';
import './styles/PostList.css';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Invitation from './pages/Invitation';


const App = () => {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/invitation" element={<ProtectedRoute element={<Invitation />} />} />
            <Route path="/create-post" element={<ProtectedRoute element={<Post />} />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main> 
      </div>
    </Router>
  );
};

export default App;

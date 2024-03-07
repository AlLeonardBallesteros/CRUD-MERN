import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Task from './components/Task';
import Protectedroute from './components/Protectedroute';

function App() {
  // Checking if the user is logged in by retrieving a value from local storage
  const login = window.localStorage.getItem("isLoggedin");
  
  return (
    <div>
      <Routes>
        {/* Route for the main task page, protected by authentication */}
        <Route path="/" element={<Protectedroute><Task /></Protectedroute>} /> 
        
        {/* Route for the login page, redirecting to the main task page if already logged in if the user is not logged in redirects them at the current page*/}
        <Route path="login" element={login ? <Task/> : <Login />} />  
        
        {/* Route for the signup page, redirecting to the main task page if already logged in if the user is not logged in redirects them at the current page*/}
        <Route path="signup" element={login ? <Task/> : <Signup />} />
      </Routes>
    </div>
  );
}

export default App;

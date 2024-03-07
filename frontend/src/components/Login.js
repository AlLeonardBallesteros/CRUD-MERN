import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password
      });
      
      const { token } = response.data;
  
      localStorage.setItem('token', token); 
      localStorage.setItem('email', email); 
      window.localStorage.setItem("isLoggedin", true); 
      setIsLoading(false); 
      navigate('/');
      // if the user is succesfull logged in token and email are passed and setting isLoggedin true
    } catch (error) {
      setError('Login failed. Please try again.'); 
      setIsLoading(false); 
    }
  };
  

  return (
    <form className="login">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p>

    </form>
  );
};

export default Login;

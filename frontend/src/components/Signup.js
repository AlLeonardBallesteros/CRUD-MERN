import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/signup', { email, password });
      if (response.status === 200) {
        alert('Account successfully created');
        navigate('/login');
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Signup error:', error.response.data.error);
    }
  };
  
  return (
    <form className="signup">
      <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password must contain special character and number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </form>
  );
};

export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { Link } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      setMessage(response.data.message);
          alert('Logged in successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'login failed.');
    }
  };

  return (
    <div className='login'>
      <h2>login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          value={formData.email}
        /><br />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          value={formData.password}
        /><br />
        <Link to="/product"><button type="submit">login</button></Link>

        
      </form>
        <h3 className='loginh3'> You dont Have An Acoount ?
              <Link to="/register">  Login</Link>
            </h3>
    </div>
  );
};

export default Login;

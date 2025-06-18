import React, { useState , useNavigate } from 'react';
import axios from 'axios';
import './Signup.css'; 
import { use } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
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
      const response = await axios.post('http://localhost:3000/api/users/register', formData);
      setMessage(response.data.message);
       alert('Registerd successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className='register'>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          value={formData.name}
        /><br />
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
        <Link to="/product"><button type="submit">Register</button></Link>
      </form>
      <h3 className='loginh3'>Do You Have An Acoount 
        <Link to="/login">  Login</Link>
      </h3>
    </div>
  );
};

export default Register;

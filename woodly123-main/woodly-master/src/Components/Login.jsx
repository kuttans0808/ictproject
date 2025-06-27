import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/login', form);
      setMessage(res.data.message);

      // ✅ Navigate to /open if login is successful
      if (res.data.message === 'Login successful') {
        navigate('/open');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={form.email}
          onChange={handleChange}
        /><br /><br />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={form.password}
          onChange={handleChange}
        /><br /><br />

        <Button type="submit" variant="contained">Login</Button><br />
        <p style={{ color: 'green' }}>{message}</p>
      </form>
    </div>
  );
};

export default Login;

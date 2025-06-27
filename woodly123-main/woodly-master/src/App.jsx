import React from 'react';
import Nav from './Components/Nav';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Open from './Components/Open';

const App = () => {
  return (
    <div className="app-background">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='cart' element={<Cart />} />
         <Route path='open' element={<Open />} />
      </Routes>
    </div>
  );
};

export default App;

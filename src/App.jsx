import React, { useState } from 'react';
import Books from '../Components/Books';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import Registration from '../Components/Registration';
import Navbar from '../Components/Navbar';

function App() {
  return (
    <>
    <Navbar /> 
      <Routes>
      <Route path='/registration' element={<Registration />}/>
      <Route path='/' element={<Books />}/>
      
    </Routes>
    </>
  );
}
export default App
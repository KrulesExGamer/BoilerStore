import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recovery from './pages/Recovery';
import Asset from './pages/Asset';
import Cart from './pages/Cart';
import SearchQuery from './components/SearchQuery';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='asset' element={<Asset />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/recovery' element={<Recovery />}></Route>
        <Route path='/results' element={<SearchQuery />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Recovery from './components/Recovery';
import Asset from './pages/Asset';

const App = () => {
  let [SearchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='asset' element={<Asset />} />
        </Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/recovery' element={<Recovery />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

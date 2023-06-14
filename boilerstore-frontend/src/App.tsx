import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recovery from './pages/Recovery';
import AssetPage from './pages/AssetPage';
import Cart from './pages/Cart';
import Sold from './pages/Sold';
import SearchQuery from './components/SearchQuery';
import { STD_USER_STATE, UserContext } from './Context';


const App = () => {
  let [appUserState, setAppUserState] = useState(STD_USER_STATE);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        userState: appUserState,
        setUserState: setAppUserState,
      }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='asset' element={<AssetPage />} />
            <Route path='cart' element={<Cart />} />
            <Route path='sold' element={<Sold />} />
            <Route path='/results' element={<SearchQuery />}></Route>
          </Route>

          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/recovery' element={<Recovery />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;

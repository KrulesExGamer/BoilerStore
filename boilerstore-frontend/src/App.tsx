import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recovery from './pages/Recovery';
import Asset from './pages/Asset';
import Cart from './pages/Cart';
import SearchQuery from './components/SearchQuery';
import { UserAccount, UserState } from './utils/types';


const STD_USER_STATE: UserState = { isLoggedIn: false, };

export interface UserContextState {
  userState?: UserState,
  setUserState?: (userAccount: UserState) => void,
}

const STD_USER_CONTEXT_STATE: UserContextState = {};

export const UserContext = React.createContext(STD_USER_CONTEXT_STATE);
export const useUserState = () => useContext(UserContext);

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
            <Route path='asset' element={<Asset />} />
            <Route path='cart' element={<Cart />} />
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

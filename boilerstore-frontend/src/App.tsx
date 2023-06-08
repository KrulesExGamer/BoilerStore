import React, { useState } from 'react';
import './App.css';
import AppHeader from './shared/AppHeader'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';

const App = () => {
  let [SearchQuery, setSearchQuery] = useState('');

  // return (
  //   <div className='App'>
  //     <AppHeader searchQuerySetter={setSearchQuery} />
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

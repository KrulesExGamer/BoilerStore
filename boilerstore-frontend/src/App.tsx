import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;

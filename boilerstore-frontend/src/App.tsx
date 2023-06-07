import React, { useState } from 'react';
import './App.css';
import AppHeader from './shared/AppHeader'

const App = () => {
  let [SearchQuery, setSearchQuery] = useState('');

  return (
    <div className='App'>
      <AppHeader searchQuerySetter={setSearchQuery} />
    </div>
  );
};

export default App;

import React, { useState, useRef } from 'react';
import './Home.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EyeCatcher from '../shared/EyeCatcher';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryVariable = searchParams.get('search_query');
        setSearchQuery(null == queryVariable ? '' : queryVariable);
        console.log(queryVariable); // Output: the value of the 'variableName' query parameter
    }, [location]);

    return (
        <main className='Home'>
            <EyeCatcher />
            <p><br/>Hello, World! {searchQuery}</p>
        </main>
    );
};

export default Home;

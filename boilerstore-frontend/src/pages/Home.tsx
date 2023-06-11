import React, { useState, useRef } from 'react';
import './Home.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EyeCatcher from '../shared/EyeCatcher';

import Topics from '../shared/Topics';
import GameGenres from '../shared/GameGenres';
import AssetType from '../shared/AssetType';



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
            <div className='topicsPlusEyeCathcer'>
                <Topics />
                <EyeCatcher />
            </div>
            <GameGenres />
            <AssetType />
            {/* TODO: add section 'check this out!' */}
            {/* TODO: add section 'popular this week' */}
        </main>
    );
};

export default Home;

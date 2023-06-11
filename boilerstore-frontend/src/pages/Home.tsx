import React, { useState, useRef } from 'react';
import './Home.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EyeCatcher from '../shared/EyeCatcher';

import Topics from '../shared/Topics';
import GameGenres from '../shared/GameGenres';
import AssetType from '../shared/AssetType';
import AppSection from '../components/AppSection';
import { faGamepad, faImage } from '@fortawesome/free-solid-svg-icons';

import {GameGenresSection, AssetTypesSection, ForYouSection, PopularThisWeekSection} from '../shared/MainSections'


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
                <GameGenresSection />
                <AssetTypesSection />
                <ForYouSection />
                <PopularThisWeekSection />
            </div>
            
        </main>
    );
};

export default Home;

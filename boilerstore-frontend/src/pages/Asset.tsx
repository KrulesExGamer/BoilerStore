import React, { useState, useRef } from 'react';
import './Home.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EyeCatcher from '../shared/EyeCatcher';

import { GameGenresSection, AssetTypesSection, ForYouSection, PopularThisWeekSection } from '../shared/MainSections'
import Topics from '../shared/Topics';
import {Slide} from '../components/ItemWindow'

const AssetList = {
    'AmazingCar': {title: 'aaa', slides : []}
};

const FetchAsset = async (assetKey : string) => {
    return 
};


const Assets = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    return (
        <p>hello</p>
    );
};

export default Assets;

import React, { useState, useRef } from 'react';
import './Asset.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EyeCatcher from '../shared/EyeCatcher';

import { GameGenresSection, AssetTypesSection, ForYouSection, PopularThisWeekSection } from '../shared/MainSections'
import Topics from '../shared/Topics';
import { Slide } from '../components/ItemWindow'

interface AssetData {
    title: string, key: string, description: string, slides: Slide[]
}

const AssetList: { [key: string]: AssetData } = {
    'AmazingCar': { title: 'AmazingCar', key: 'AmazingCar', description: 'An amizing car!', slides: [] }
};

const FetchAsset = async (FetchQuery: string) => {
    const assetKey = FetchQuery.replace('/api/assets/', '');
    return JSON.stringify(AssetList[assetKey]);
};


const Assets = () => {
    const location = useLocation();
    const [assetData, setAssetData] = useState<AssetData | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const assetParam = searchParams.get('asset');

        if (assetParam) {
            FetchAsset(`/api/assets/${assetParam}`)
                .then(response => JSON.parse(response))
                .then(data => {
                    // Handle the fetched data
                    setAssetData(data);
                })
                .catch(error => {
                    // Handle any errors
                    console.error(error);
                });
        }
    }, [location]);

    return (
        <section className='Asset'>
            {null === assetData && (
                <h2>Loading</h2>
            )}

            {null !== assetData && (
                <h2>{assetData['title']}</h2>
            )}
        </section>
    );
};

export default Assets;

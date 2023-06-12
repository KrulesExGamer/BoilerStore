import React, { useState, useRef } from 'react';
import './Asset.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import EyeCatcher from '../shared/EyeCatcher';

import { GameGenresSection, AssetTypesSection, ForYouSection, PopularThisWeekSection } from '../shared/MainSections'
import Topics from '../shared/Topics';
import { Slide, WindowData } from '../components/ItemWindow'
import SectionSlider from '../components/SectionSlider';

import porsche from '../img/porsche.png';

import '../shared_styles/alignment.css';
import '../shared_styles/colors.css';


interface AssetData {
    status: string, title: string, key: string, description: string, images: string[]
}

const assetNotFound: AssetData = { status: '404', title: '', key: '', description: '', images : [] };

const AssetList: { [key: string]: AssetData } = {
    'AmazingCar': { status: '200', title: 'AmazingCar', key: 'AmazingCar', description: 'An amizing car! \n aaa', images: [porsche] }
};

const FetchAsset = async (FetchQuery: string) => {
    const assetKey = FetchQuery.replace('/api/assets/', '');
    return AssetList[assetKey] ? JSON.stringify(AssetList[assetKey]) : JSON.stringify(assetNotFound);
};

const FetchAssetImages = async (FetchQuery: string) => {
    const assetKey = FetchQuery.replace('/api/assets/', '');
    return AssetList[assetKey] ? AssetList[assetKey].images : [];
};


const Assets = () => {
    const [imgIndex, setImgIndex] = useState(0);
    const [assetKey, setAssetKey] = useState('');

    const location = useLocation();
    const [assetData, setAssetData] = useState<AssetData | null>(null);

    const searchParams = new URLSearchParams(location.search);


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const assetParam = searchParams.get('asset');
        const imgIndexParam = searchParams.get('img_index');

        const intIndex = parseInt(null === imgIndexParam ? '0' : imgIndexParam);

        setImgIndex(intIndex);
        setAssetKey(null === assetParam ? '' : assetParam);

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
            <div className='asset-main-container'>
                {null === assetData && (
                    <h2>Loading</h2>
                )}

                {assetKey && null !== assetData && '200' === assetData['status'] && (
                    <>
                        <h2 className='asset-title'>{assetData['title']}</h2>
                        <div className='asset-container'>
                        
                            <div className='main-banner conteiner-middle-center asset-field'>
                                <img className='item-middle-center' src={assetData.images[0]}/>
                            </div>
                            <div className='right-side'>
                                <div className='buttons-container'>
                                    <button className='add-to-cart'>
                                        <p>Add to cart</p>
                                    </button>
                                    <button className='buy-now'>
                                        <p>Add to cart</p>
                                    </button>
                                </div>
                                
                                <div className='description asset-field conteiner-middle-center'> 
                                    {assetData.description}
                                </div>
                            </div>
                            {/* TODO: ADD EXTRA IMAGES
                                <SectionSlider list={[]} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']} itemQuery={`/asset?asset=${assetKey}&img_index=${imgIndex}`} searchQuery={''} />
                            */}
                        </div>
                    </>
                )}

                {null !== assetData && '404' === assetData['status'] && (
                    <div className='not-found'>
                        <h2>Not Found</h2>
                        <p> Ops! The asset was not found :\ </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Assets;

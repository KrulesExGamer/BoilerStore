// DO NOT REVIEW
// IT IS A BACKUP IN CASE OF NEED


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
    status: string, price : number, discount : number, title: string, key: string, description: string, images: string[]
}

const assetNotFound: AssetData = { status: '404', price: 0, discount: 0, title: '', key: '', description: '', images : [] };

const AssetList: { [key: string]: AssetData } = {
    'AmazingCar': { status: '200', title: 'AmazingCar', price: 10, discount: 0, key: 'AmazingCar', description: 'An amizing car! \n aaa', images: [porsche] }
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
                                <div className='buttons-container conteiner-middle-center'>
                                    <button className='add-to-cart asset-field item-middle-center txt-center'>
                                        <div className='txt-center aaa'>Add to cart</div>
                                    </button>
                                    <div className='buttons-container-middiv item-middle-center'></div>
                                    <button className='buy-now asset-field item-middle-center txt-center'>
                                    <div className='txt-center aaa'>Buy now</div>
                                    </button>
                                </div>
                                
                                <div className='description asset-field conteiner-middle-center'> 
                                    {assetData.description}
                                </div>

                                <div className='description asset-field conteiner-middle-center'> 
                                    $ {assetData.price}
                                </div>
                                <button className='asset-field item-middle-center txt-center'>
                                    <div className='txt-center aaa'>Edit</div>
                                </button>

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

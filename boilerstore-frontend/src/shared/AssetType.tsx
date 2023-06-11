import React, { useState } from 'react';
import './AssetType.css'
import SectionSlider, { Slide, WindowData as GameGenre } from '../components/SectionSlider';
import SearchBar from '../components/SearchBar';
import { faCartShopping, faCubes, faMusic, faImage, faPersonRunning, faCode, faEllipsis, } from '@fortawesome/free-solid-svg-icons';

import bulletHell from '../img/bullet_hell.jpeg';
import bulletHellGif from '../img/enterTheGungeon.gif';
import fps from '../img/fps.jpeg';
import zeldaLike from '../img/zelda_like.png';
import IconButton from '../components/IconButton';
import { Link } from 'react-router-dom';


let AssetTypes: GameGenre[] = [
    {
        title: 'Firts Person Shoter',
        description: 'A fi',
        icon: undefined,
        key: 'fps',
        slides: [
            { staticImage: fps, dynamicImage: undefined, description: 'A porsche.', darkImage: false, },
        ],
    },
    {
        title: 'Bullet Hell',
        description: 'A fi',
        icon: undefined,
        key: 'bullet-hell',
        slides: [
            { staticImage: bulletHell, dynamicImage: bulletHellGif, description: 'A porsche.', darkImage: true, },
        ],
    },
    {
        title: 'Zelda Likeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        description: 'A fi',
        icon: undefined,
        key: 'zelda-like',
        slides: [
            { staticImage: zeldaLike, dynamicImage: undefined, description: 'A porsche.', darkImage: false, },
        ],
    },
];

const AssetType = () => {


    return (
        <section className='AssetType' >
            <p>	(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ </p>
            <h2> Search by asset type </h2>
            <div className='searchbar-div'>
                <SearchBar color='#731DE0' />
            </div>

            <div className='container'><SectionSlider list={AssetTypes} colors={['#7F4F8F', '#731DE0']} itemQuery={''} searchQuery={''} /></div>
            <div className='more-parent'>
                <div className='more'>
                    <Link to='/show?what=asset-types'>
                        <IconButton label='More asset types..' />
                    </Link>
                </div>
            </div>

        </section>
    );
};


export default AssetType;
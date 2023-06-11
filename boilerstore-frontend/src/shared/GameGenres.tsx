import React, { useState } from 'react';
import './GameGenres.css'
import SectionSlider, {Slide, WindowData as GameGenre} from '../components/SectionSlider';
import SearchBar from '../components/SearchBar';
import { faCartShopping, faCubes, faMusic, faImage, faPersonRunning, faCode, faEllipsis, } from '@fortawesome/free-solid-svg-icons';

import bulletHell from '../img/bullet_hell.jpeg';
import bulletHellGif from '../img/enterTheGungeon.gif';
import fps from '../img/fps.jpeg';
import zeldaLike from '../img/zelda_like.png';


let gameGenres: GameGenre[] = [
    { 
        title: 'Firts Person Shoter', 
        description: 'A fi', 
        icon: undefined,
        key: 'fps',
        slides: [
            {staticImage: fps, dynamicImage: undefined, description: 'A porsche.', darkImage: false, },
        ] ,
    },
    { 
        title: 'Bullet Hell', 
        description: 'A fi', 
        icon: undefined,
        key: 'bullet-hell',
        slides: [
            {staticImage: bulletHell, dynamicImage: bulletHellGif, description: 'A porsche.', darkImage: true, },
        ] ,
    },
    { 
        title: 'Zelda Likeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        description: 'A fi', 
        icon: undefined,
        key: 'zelda-like',
        slides: [
            {staticImage: zeldaLike, dynamicImage: undefined, description: 'A porsche.', darkImage: false, },
        ] ,
    },
];

const GameGenres = () => {
    

    return (
        <section className='GameGenres' >
            <p>	( ´◔ ω◔`) ノシ </p>
            <h2> What kind of game you wanna make? </h2>
            <div className='searchbar-div'>
                <SearchBar color='#d63737' />
            </div>

            <div className='container'><SectionSlider list={gameGenres} colors={['#c22', '#b11']} searchQuery={''} itemQuery={''} /></div>

        </section>
    );
};


export default GameGenres;
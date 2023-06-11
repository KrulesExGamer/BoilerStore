import React, { useState } from 'react';
import './GameGenres.css'
import SectionSlider from './SectionSlider';
import SearchBar from '../components/SearchBar';


type slide = { staticImage: string, dynamicImage: string, description: string };
type GameGenresType = { tytle: string, description: string, slides: slide[] };

let gameGenres: GameGenresType[] = [

];

const GameGenres = () => {
    let [searchQuery, setSearchQuery] = useState('');

    return (
        <section className='GameGenres' >
            <div>
                <h2> What kind of game you wanna make? </h2>
                <div className='searchbar-div'>
                    <SearchBar searchQuerySetter={setSearchQuery} />
                </div>

                <div className='container'><SectionSlider color1='#c51c62' color2='#d63737' /></div>

            </div>
        </section>
    );
};


export default GameGenres;
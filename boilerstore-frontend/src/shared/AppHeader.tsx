import React, { useState, useEffect } from 'react';
import './AppHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './boilerstore_logo.svg';
import SearchBar, { SearchProps } from './../components/SearchBar'
import IconButton from '../components/IconButton';


const SEARCHBAR_MIN_WIDTH = 1152;

const AppHeader = ({ searchQuerySetter }: SearchProps) => {
    let [breakSearchBar, setBreakSearchBar] = useState(false);

    useEffect(() => {
        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            //setBreakSearchBar(SEARCHBAR_MIN_WIDTH < window.innerWidth);
            if (SEARCHBAR_MIN_WIDTH < window.innerWidth && breakSearchBar) setBreakSearchBar(false);
            else if (SEARCHBAR_MIN_WIDTH >= window.innerWidth && !breakSearchBar) setBreakSearchBar(true);
        }

        window.addEventListener('resize', handleResize)
    })

    if (SEARCHBAR_MIN_WIDTH < window.innerWidth && breakSearchBar) setBreakSearchBar(false);
    else if (SEARCHBAR_MIN_WIDTH >= window.innerWidth && !breakSearchBar) setBreakSearchBar(true);

    return (
        <header className='AppHeader'>

            <nav className='header-navbar'>
                <div className='navbar-left'>
                    <img className='boilerstore-logo' alt='BoilerStore Logo' src={logo} />
                    <h1 className='boilerstore-main-title'>BoilerStore</h1>
                </div>
                <div className='navbar-center'>
                    <div className='logo-container'>
                        {!breakSearchBar && (<SearchBar searchQuerySetter={searchQuerySetter} />)}
                    </div>
                </div>
                <div className='navbar-right'>
                    <IconButton icon={faUser} label='Sign In' />
                    <IconButton icon={faCartShopping} label='Your Cart' />
                    <IconButton icon={faBarsStaggered} label='More' />
                </div>
            </nav>

            {breakSearchBar && (
                <div className='searchbar-on-newline'> <SearchBar searchQuerySetter={searchQuerySetter} /> </div>
            )}

        </header>
    );
};


export default AppHeader;

import React, { useState, useEffect } from 'react';
import './AppHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './../img/boilerstore_logo.svg';
import SearchBar from './../components/SearchBar'
import IconButton from '../components/IconButton';
import {useWindowResize} from '../utils/windowSize'


const SEARCHBAR_MIN_WIDTH = 1152;



const AppHeader = () => {
    const {width} = useWindowResize();
    const breakSearchBar = SEARCHBAR_MIN_WIDTH > width;

    return (
        <header className='AppHeader'>

            <nav className='header-navbar'>
                <div className='navbar-left'>
                    <img className='boilerstore-logo' alt='BoilerStore Logo' src={logo} />
                    <h1 className='boilerstore-main-title'>BoilerStore</h1>
                </div>
                <div className='navbar-center'>
                    <div className='logo-container'>
                        {!breakSearchBar && (<SearchBar />)}
                    </div>
                </div>
                <div className='navbar-right'>
                    <IconButton icon={faUser} label='Sign In' />
                    <IconButton icon={faCartShopping} label='Your Cart' />
                    <IconButton icon={faBarsStaggered} label='More' />
                </div>
            </nav>

            {breakSearchBar && (
                <div className='searchbar-on-newline'> <SearchBar /> </div>
            )}

        </header>
    );
};


export default AppHeader;

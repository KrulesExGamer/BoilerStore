import React from 'react';
import './AppHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBarsStaggered, faUser} from '@fortawesome/free-solid-svg-icons';
import logo from './boilerstore_logo.svg';
import SearchBar, {SearchProps} from './../components/SearchBar'


const AppHeader = ({searchQuerySetter} : SearchProps) => {
    return (
        <header className='AppHeader'>
            <nav className='header-navbar'>
                <div className='left-links'>
                    <img className='boilerstore-logo' alt='BoilerStore Logo' src={logo} />
                    <h1>BoilerStore</h1>
                </div>
                <div className='center-logo'>
                    <div className='logo-container'>
                        <SearchBar searchQuerySetter={searchQuerySetter} />
                    </div>
                </div>
                <div className='right-links'>
                    <a href='#'><FontAwesomeIcon icon={faUser} /><h4>Sign In</h4></a>
                    <a href='#'><FontAwesomeIcon icon={faCartShopping} /><h4>Your Cart</h4></a>
                    <a href='#'><FontAwesomeIcon icon={faBarsStaggered} /><h4>More</h4></a>
                </div>
            </nav>
        </header>
    );
};


export default AppHeader;

import React from 'react';
import './AppHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './boilerstore_logo.svg';

const AppHeader = () => {
    return (
        <header className='AppHeader'>
            <nav className='header-navbar'>
                <div className="left-links">
                    <a href="#"><FontAwesomeIcon icon={faCartShopping} /></a>
                </div>
                <div className="center-logo">
                    <div className="logo-container">
                        <img className="boilerstore-logo" alt="BoilerStore Logo" src={logo} />
                        <h1>BoilerStore</h1>
                    </div>
                </div>
                <div className="right-links">
                    <a href="#"><FontAwesomeIcon icon={faBarsStaggered} /></a>
                    <a href="#"><FontAwesomeIcon icon={faUser} /></a>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;

import React, { useState, useRef } from 'react';
import './Cart.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "../img/zelda-like.png";
import "../img/bullet-hell.jpeg" ;

import GameList from '../components/CartList';
import gamesList from '../gamesForCart/tempGameList';
import TotalPrice from '../components/TotalPrice';

const Cart = () => {
    return (
        <div className='cart'>
            <GameList games={gamesList}/>
            <TotalPrice games={gamesList}/>
        </div>
    );
}

export default Cart;
import React, { useState, useRef } from 'react';
import './Cart.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "../img/zelda_like.png";
import "../img/bullet_hell.jpeg" ;

import GameList from '../components/CartList';
import gamesList from '../gamesForCart/tempGameList';

const Cart = () => {
    return (
        <GameList games={gamesList}/>
    );
}

export default Cart;
import React, { useState, useRef } from 'react';
import './Cart.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "../img/zelda_like.png";
import "../img/bullet_hell.jpeg" ;

import AssetList from '../components/CartList';
import assetsList from '../assetsForCart/tempAssetList';
import TotalPrice from '../components/TotalPrice';

const Cart = () => {
    return (
        <div className='cart'>
            <AssetList assets={assetsList}/>
            <TotalPrice assets={assetsList}/>
        </div>
    );
}

export default Cart;
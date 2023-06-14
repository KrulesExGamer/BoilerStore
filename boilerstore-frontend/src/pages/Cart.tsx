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
    const [cartList,removeFromCartList] = useState(assetsList);
    return (
        <div className='cart'>
            <AssetList assets={cartList} cart={removeFromCartList}/>
            <TotalPrice assets={cartList}/>
        </div>
    );
}

export default Cart;
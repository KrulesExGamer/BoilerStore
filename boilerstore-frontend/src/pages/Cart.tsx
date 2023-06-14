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
    const len = assetsList.length;
    const [cartList,removeFromCartList] = useState(assetsList); //  useState for remove

    if(0 < cartList.length){
        return (
            <div className='cart'>
                <AssetList assets={cartList} cart={removeFromCartList}/>
                <TotalPrice assets={cartList}/>
            </div>
        );
    }
    return (<div className='empty'>
                <p className='empty_text'>Carrinho Vazio</p>
        </div>);
}

export default Cart;
import React, { useState } from 'react';
import CartAsset from './CartAsset';
// import './CartList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import t_asset from "../assetsForCart/t_asset";


const AssetList = (props:{
        assets: t_asset[],
        cart: (cartList:t_asset[]) => void,
    }) => {
    const assets = props.assets;
    const cart = props.cart;

    const listAssets = assets.map((asset) =>
    <CartAsset asset={asset} assets={assets} cart={cart} />);

    return (
        <ul className='cart_ul'>{listAssets.map((asset) =>
            <li>{asset}</li>
            )}
        </ul>
    );
}

export default AssetList;


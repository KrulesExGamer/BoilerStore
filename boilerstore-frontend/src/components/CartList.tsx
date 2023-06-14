import React, { useState } from 'react';
import CartAsset from './CartAsset';
// import './CartList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import t_asset from "../assetsForCart/t_asset";

const AssetList = (props:{
        assets: t_asset[],
    }) => {
    const assets = props.assets;
    const listAssets = assets.map((asset) =>
    <CartAsset {...asset}/>);

    return (
        <ul className='cart_ul'>{listAssets.map((asset) =>
            <li>{asset}</li>
            )}
        </ul>
    );
}

export default AssetList;


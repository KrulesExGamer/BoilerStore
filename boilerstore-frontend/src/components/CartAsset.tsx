import React, { ReactNodeArray, useState } from 'react';
import './CartAsset.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import t_asset from "../assetsForCart/t_asset";
import { faAppleAlt, faBrain, faPersonThroughWindow, faQuestion, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const CartAsset = (props:{
        asset:t_asset,
        assets: t_asset[],
        cart: (cartList:t_asset[]) => void,
    }) => {
    
    const asset = props.asset;
    const assets = props.assets;
    const cart = props.cart;

    const [mouseOver, setMouseOver] = useState(false); // initiate it at false
    const [boxShadow, setBoxShadow] = useState(`2px 2px 4px ${asset.colors[0]}`);


    const price = (null === asset.price || undefined === asset.price) ? 0 : asset.price;
    const discount = (0 === price || null === asset.discount || undefined === asset.discount) ? 0 : asset.discount;
    const discounted = (0 === discount) ? -1 : (100-discount)*price/100;
/*
    const index = () => {
        const len = assets.length;

        for(let i=1; ){
            .
        }
    };
//*/    
    const removedList:t_asset[] = assets.filter((r_asset)=>{
        return r_asset.key != asset.key;
    });
    

    const systems = (sysList:string[]) => {
        return <span>{sysList.map((sys:string) => {
            if("windows" === sys){
                return <span><FontAwesomeIcon icon={faWindowClose}/> </span>;
            } else if("linux" === sys){
                return <span><FontAwesomeIcon icon={faPersonThroughWindow}/> </span>;
            } else if("apple" === sys){
                return <span><FontAwesomeIcon icon={faAppleAlt}/> </span>;
            } else{
                return <span><FontAwesomeIcon icon={faQuestion}/> </span>;
            }
        })}</span>
    };

    return (
        <article className='cartAsset' style={{
        }} onMouseEnter={(event) => {
                setMouseOver(true);
                setBoxShadow(`4px 4px 8px ${asset.colors[1]}`);
            }}
            onMouseLeave={() => {
                setMouseOver(false);
                setBoxShadow(`2px 2px 4px ${asset.colors[0]}`);
            }}
        >
           <div className="left_elements">
                <img className="asset_img" src=
                    {asset.img }
                    />

                <p className="asset_name">
                    {asset.name}
                </p>
            </div>

            <div className="right_elements">
                <p className="asset_systems">
                    {systems(asset.systems)}
                </p>

                {(discounted < 0) ? (
                    <div className="asset_pricing">
                        <p className="asset_price"> $
                            {price.toFixed(2)}
                        </p>
                        <p className="remove_from_cart" onClick={()=> cart(removedList)}>
                            Remover
                        </p>
                    </div>
                ) :
                    (
                    <div className="asset_pricing">
                        <p className="asset_non_discounted"> $
                            {price.toFixed(2)}
                        </p>
                        <p className="asset_discounted"> $
                            {discounted.toFixed(2)}
                        </p>
                        <p className="remove_from_cart" onClick={()=> cart(removedList)}>
                            Remover
                        </p>
                    </div>)
                }
            </div>
            
        </article>
    );
};

export default CartAsset;
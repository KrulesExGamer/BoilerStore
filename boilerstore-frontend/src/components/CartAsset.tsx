import React, { ReactNodeArray, useState } from 'react';
import './CartAsset.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import t_asset from "../assetsForCart/t_asset";
import { faAppleAlt, faBrain, faPersonThroughWindow, faQuestion, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const CartAsset = (props:t_asset) => {

    const [mouseOver, setMouseOver] = useState(false); // initiate it at false
    const [boxShadow, setBoxShadow] = useState(`2px 2px 4px ${props.colors[0]}`);


    const price = (null === props.price || undefined === props.price) ? 0 : props.price;
    const discount = (0 === price || null === props.discount || undefined === props.discount) ? 0 : props.discount;
    const discounted = (0 === discount) ? -1 : (100-discount)*price/100;

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
                setBoxShadow(`4px 4px 8px ${props.colors[1]}`);
            }}
            onMouseLeave={() => {
                setMouseOver(false);
                setBoxShadow(`2px 2px 4px ${props.colors[0]}`);
            }}
        >
           <div className="left_elements">
                <img className="asset_img" src=
                    {props.img }
                    />

                <p className="asset_name">
                    {props.name}
                </p>
            </div>

            <div className="right_elements">
                <p className="asset_systems">
                    {systems(props.systems)}
                </p>

                {(discounted < 0) ? (
                    <div className="asset_pricing">
                        <p className="asset_price"> $
                            {price.toFixed(2)}
                        </p>
                        <p className="remove_from_cart" >
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
                        <p className="remove_from_cart">
                            Remover
                        </p>
                    </div>)
                }
            </div>
            
        </article>
    );
};

export default CartAsset;
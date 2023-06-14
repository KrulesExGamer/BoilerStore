import React, { useState, useRef } from 'react';
import './TotalPrice.css'
import t_asset from "../assetsForCart/t_asset";

const TotalPrice = (props:{
    assets: t_asset[],
}) => {
    const assets = props.assets;
    const len = assets.length;
    let total_non_discounted = 0;
    let total_discounted = 0;
    let p = 0;
    for(let i=0; i<len; i++){
        if(null != assets[i].price){
            p = assets[i].price ?? 0;
            total_non_discounted += p;

            if(null != assets[i].discount){
                const discounting:number = assets[i].discount ?? 0 ;
                const pricing:number = assets[i].price ?? 0;
                p = (0 >= discounting) ? 0 : discounting;
                p = (100-p)*(pricing)/100;
                total_discounted += p;
            }
        }
    }

    return (
        <div className='buyBox'>
            <div className="upper_buyBox">
                <div className="ubB_text">
                    <p> Preço Total</p>
                </div>
                {(total_non_discounted != total_discounted) ?
                    (<div className="pricing">
                        <p className="total_non_discounted"> $ {total_non_discounted.toFixed(2)}</p>
                        <p className="total_discounted"> $ {total_discounted.toFixed(2)}</p>
                    </div>) :
                    (<div className="pricing">
                        <p className="total_discounted"> $ {total_non_discounted.toFixed(2)}</p>
                    </div>)
                }
            </div>
            <div className="lower_buyBox">
                <button className="back">Voltar a comprar</button>
                <button className="buy">Comprar</button>
            </div>
        </div>);
};

export default TotalPrice;
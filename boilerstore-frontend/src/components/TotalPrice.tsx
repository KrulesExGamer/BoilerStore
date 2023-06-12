import React, { useState, useRef } from 'react';
import './TotalPrice.css'
import t_game from "../gamesForCart/t_game";

const TotalPrice = (props:{
    games: t_game[],
}) => {
    const games = props.games;
    const len = games.length;
    let total_non_discounted = 0;
    let total_discounted = 0;
    let p = 0;
    for(let i=0; i<len; i++){
        if(null != games[i].price){
            p = games[i].price ?? 0;
            total_non_discounted += p;

            if(null != games[i].discount){
                const discounting:number = games[i].discount ?? 0 ;
                const pricing:number = games[i].price ?? 0;
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
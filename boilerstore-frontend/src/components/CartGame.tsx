import React, { useState } from 'react';
import './CartGame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import t_game from "../gamesForCart/t_game";

const CartGame = (props:t_game) => {
    const [mouseOver, setMouseOver] = useState(false); // initiate it at false
    const [boxShadow, setBoxShadow] = useState(`2px 2px 4px ${props.colors[0]}`);


    const price = (null === props.price || undefined === props.price) ? 0 : props.price;
    const discount = (0 === price || null === props.discount || undefined === props.discount) ? 0 : props.discount;
    const discounted = (0 === discount) ? -1 : (100-discount)*price/100;

    return (
        <article className='cartGame' style={{
            width: null === props.width ? ';' : props.width, 
            height: null === props.height ? ';' : props.height,
            padding: null === props.padding ? ';' : props.padding,
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
                <img className="game_img" src=
                    {props.img }
                    />

                <p className="game_name">
                    {props.name}
                </p>
            </div>

            <div className="right_elements">
                <p className="game_systems">
                    {props.systems}
                </p>

                {(discounted < 0) ? (
                    <div className="game_pricing">
                        <p className="game_price"> $
                            {price.toFixed(2)}
                        </p>
                        <p className="remove_from_cart">
                            Remover
                        </p>
                    </div>
                ) :
                    (
                    <div className="game_pricing">
                        <p className="game_non_discounted"> $
                            {price.toFixed(2)}
                        </p>
                        <p className="game_discounted"> $
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

export default CartGame;
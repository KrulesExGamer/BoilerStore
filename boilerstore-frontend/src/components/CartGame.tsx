import React, { useState } from 'react';
import './CartGame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartGame = (props: {
    colors: [string, string],
    width : string | null,
    height : string | null,
    padding : string | null,
    price : number | null,
    discount : number | null,
    name : string | null,
    img: string | null,
    systems: string | null,
    
    displayType : boolean | null,
    displayPrice : boolean | null,

    removeFromCart : () => any | null,
}) => {
    const [mouseOver, setMouseOver] = useState(false); // initiate it at false
    const [boxShadow, setBoxShadow] = useState(`2px 2px 4px ${props.colors[0]}`);


    const price = (null === props.price || undefined === props.price) ? 0 : props.price;
    const discount = (0 === price || null === props.discount || undefined === props.discount) ? 0 : props.discount;
    const discounted = (0 === discount) ? -1 : (100-discount)*price/100;

    return (
        <article className='CartGame' style={{
            width: null === props.width ? ';' : props.width, 
            height: null === props.height ? ';' : props.height,
            padding: null === props.padding ? ';' : props.padding, 
        }}>

            <div
                className='CartGame-container'
                onMouseEnter={(event) => {
                    setMouseOver(true);
                    setBoxShadow(`4px 4px 8px ${props.colors[1]}`);
                }}
                onMouseLeave={() => {
                    setMouseOver(false);
                    setBoxShadow(`2px 2px 4px ${props.colors[0]}`);
                }}
                style={{
                    boxShadow: boxShadow,
                }}
            >
                <div className="cart_game">
                    <img className="game_img" src="
                        {props.img}
                        "/>

                    <p className="game_name">
                        {props.name}
                    </p>

                    <p className="game_systems">
                        {props.systems}
                    </p>

                    {(discounted < 0) ? (
                        <div className="game_price">
                            <p className="price">
                                {price}
                            </p>
                            <p className="remove_from_cart">
                                Remover
                            </p>
                        </div>
                    ) :
                        (
                        <div className="game_price">
                            <p className="price">
                                {price}
                            </p>
                            <p className="discount_price">
                                {discounted}
                            </p>
                            <p className="remove_from_cart">
                                Remover
                            </p>
                        </div>)
                    }
                    
                </div>

            </div>
        </article>
    );
};
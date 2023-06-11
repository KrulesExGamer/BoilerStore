import React, { useState } from 'react';
import './CartGame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartGame = (props: { 
    cartGame: CartGame, 
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
            height: null === props.padding ? ';' : props.padding, 
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
                <div class="cart_game">
                    <img src="
                        {props.cartGame.img}
                        ">

                    <p class="game_name">
                        {props.cartGame.name}
                    </p>

                    <p class="game_systems">
                        {props.cartGame.systems}
                    </p>

                    <div>
                        {(discounted < 0) ? (
                            <p class="price">
                                {prop.price}
                            </p>
                        ) :
                            (<p class="price">
                                {price}
                            </p>
                            <p class="discount_price">
                                {discounted}
                            </p>
                        }
                        <p class="remove_from_cart" onClick{console.log("remove")}>
                            Remover
                        </p>
                    </div>
                </div>

            </div>
        </article>
    );
};
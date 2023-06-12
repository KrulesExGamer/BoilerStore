import React, { useState } from 'react';
import CartGame from './CartGame';
// import './CartList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type t_game = {
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
};

const GameList = (props:{
        games: t_game[],
    }) => {
    const games = props.games;
    const listGames = games.map((game) =>
    <CartGame {...game}/>);

    return (
        <ul>{listGames.map((game) =>
            <li>{game}</li>
            )}
        </ul>
    );
}




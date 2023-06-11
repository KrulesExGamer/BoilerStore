import React, { useState } from 'react';
import './CartGame';
// import './CartList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameList(props) => {
    const games = props.games;
    const listGames = games.map((game) =>
    <CartGame games={game}/>);

    return (
        <ul>{listGames.map((game) =>
            <li>{game}</li>
            );}
        </ul>
    );
}




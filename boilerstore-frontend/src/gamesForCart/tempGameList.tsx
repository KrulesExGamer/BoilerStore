import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import zelda from "../img/zelda-like.png";
import hell from "../img/bullet-hell.jpeg" ;
import t_game from "../gamesForCart/t_game";

const game1:t_game = {
    colors: ["#f00", "#0f0"],
    width : "600px",
    height : "100px",
    padding : "10px",
    price : 60,
    discount : 10,
    name : "Power",
    img: zelda,
    systems: "A",

    displayType : true,
    displayPrice : true,

    removeFromCart : () => {},
};

const game2:t_game = {
    colors: ["#f00" , "#00f"],
    width : "600px",
    height : "100px",
    padding : "10px",
    price : 50,
    discount : 0,
    name : "Tower",
    img: hell,
    systems: "A, B",

    displayType : true,
    displayPrice : true,

    removeFromCart : () => {},
};

const gamesList = [game1, game2]

export default gamesList;
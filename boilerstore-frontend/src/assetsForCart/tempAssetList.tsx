import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import zelda from "../img/zelda_like.png";
import hell from "../img/bullet_hell.jpeg" ;
import t_asset from "./t_asset";

const asset1:t_asset = {
    key: "txzelda",

    colors: ["#f00", "#0f0"],
    price : 60,
    discount : 10,
    name : "Power",
    img: zelda,
    systems: ["linux"],

    removeFromCart : () => {},
};

const asset2:t_asset = {
    key: "b_hell",

    colors: ["#f00" , "#00f"],
    price : 50,
    discount : 0,
    name : "Power Tower Throwser",
    img: hell,
    systems: ["linux", "windows"],

    removeFromCart : () => {},
};


const assetsList = [asset1, asset2];

export default assetsList;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type t_game = {
    colors: [string, string],
    width : string | null,
    height : string | null,
    padding : string | null,
    price : number | null,
    discount : number | null,
    name : string | null,
    img: any,
    systems: string | null,
    
    displayType : boolean | null,
    displayPrice : boolean | null,

    removeFromCart : () => any | null,
};

export default t_game;
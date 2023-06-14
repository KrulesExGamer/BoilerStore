import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type t_asset = {
    key: string,
    
    colors: [string, string],
    price : number | null,
    discount : number | null,
    name : string | null,
    img: any,
    systems: string[],

    removeFromCart : () => any | null,
};

export default t_asset;
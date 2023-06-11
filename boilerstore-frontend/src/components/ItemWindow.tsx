import React, { useState } from 'react';
import './ItemWindow.css'
import porsche from '../img/porsche.png';
import bottle from '../img/bottle.png';

const images = [
    { static: porsche, dynamic: bottle, description: 'A porsche.' },
];

const ItemWindow = () => {
    const [mouseOver, setMouseOver] = useState(false); // initiate it at false
    let imgIndex = 0;
    const pickImg = (i: number) => mouseOver ? (images[i].dynamic ? images[i].dynamic : images[i].static) : images[i].static;

    return (
        <article className='ItemWindow'>

            <div
                className='ItemWindow-container'
                onMouseEnter={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
            >
                <div className='ItemWindow-subcontainer' >
                    <h3>Top Deal</h3>
                    <img className='ItemWindow-img ItemWindow-stackItem' src={pickImg(imgIndex)} alt={images[imgIndex].description} />
                    <div className='ItemWindow-type ItemWindow-stackItem'>ttt</div>
                </div>
            </div>
        </article>
    );
};

export default ItemWindow;

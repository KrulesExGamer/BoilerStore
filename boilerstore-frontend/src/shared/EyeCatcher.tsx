import React from 'react';
import './EyeCatcher.css';
import bottle from './../img/bottle-removebg-preview.png';

const images = [
    {image: bottle, description: 'Aaaa'},
];

const EyeCatcher = () => {
    return (
        <section className='EyeCatcher' >
            <div><img src={images[0].image} alt={images[0].description} /></div>
        </section>
    );
};


export default EyeCatcher;
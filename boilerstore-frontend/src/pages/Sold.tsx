import React, { useState, useRef } from 'react';
import './Sold.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Sold = () => {
    return (
        <div className='sold'>
            <p className='sold_text'>Parabéns por sua compra.</p>
        </div>
    );
}

export default Sold;
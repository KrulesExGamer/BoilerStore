import React from 'react';
import './SectionSlider.css'
import ItemWindow from '../components/ItemWindow';
import { Circle } from '@react-three/drei';
import CircleIcon from '../components/CircleIcon';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';


const images = [
    { image: 'a', description: 'Aaaa' },
];

const SectionSlider = (props : {color1 : string, color2 : string}) => {
    return (
        <div className='SectionSlider' >
            <div className='arrow-left'><IconButton icon={faArrowCircleLeft} size='4x' /></div>
            <ul>
                <li><ItemWindow /></li>
                <li><ItemWindow /></li>
            </ul>
            <div className='arrow-right'><IconButton icon={faArrowCircleRight} size='4x' /></div>
        </div>
    );
};


export default SectionSlider;
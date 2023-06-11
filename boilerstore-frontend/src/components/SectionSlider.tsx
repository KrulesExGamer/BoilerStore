import React from 'react';
import './SectionSlider.css'
import ItemWindow, {Slide, WindowData} from '../components/ItemWindow';
import { Circle } from '@react-three/drei';
import CircleIcon from '../components/CircleIcon';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';


const images = [
    { image: 'a', description: 'Aaaa' },
];

const SectionSlider = (props : {list : WindowData[], color1 : string, color2 : string}) => {
    return (
        <div className='SectionSlider' >
            <div className='arrow-left'><IconButton icon={faArrowCircleLeft} size='4x' /></div>
            <ul>
                {
                    props.list.map(
                        (genre) => {return (<li><ItemWindow windowData={genre} /></li>);}
                    )
                }
            </ul>
            <div className='arrow-right'><IconButton icon={faArrowCircleRight} size='4x' /></div>
        </div>
    );
};

export type {Slide, WindowData};
export default SectionSlider;
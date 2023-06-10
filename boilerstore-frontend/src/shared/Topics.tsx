import React from 'react';
import './Topics.css';

import { faCartShopping, faCubes, faMusic, faImage, faPersonRunning, faCode, faEllipsis, } from '@fortawesome/free-solid-svg-icons';
import CircleIcon from '../components/CircleIcon';
import { Circle } from '@react-three/drei';
import { useWindowResize } from '../utils/windowSize';

// const topicList = [
//     { icon: faCubes, color1: '#2D92CB', color2: '#2A9AD9',},
//     { icon: faMusic, color1: '#3D4EE9', color2: '#707DF3',},
//     { icon: faImage, color1: '#B958DC', color2: '#D469FA',},
//     { icon: faPersonRunning, color1: '#CB2D2D', color2: '#D92A2A',},
//     { icon: faCode, color1: '#CBBB2D', color2: '#D9C72A',},
//     { icon: faEllipsis, color1: '#43CB2D', color2: '#4DD92A',},
// ];

const ellipsis = { icon: faEllipsis, color1: '#338C26', color2: '#3DA624' };

const topicList = [
    { icon: faCubes, color1: '#1D6491', color2: '#1B71A9' },
    { icon: faMusic, color1: '#2E39B7', color2: '#5E6CCE' },
    { icon: faImage, color1: '#8F42B8', color2: '#A75DD0' },
    { icon: faPersonRunning, color1: '#A62626', color2: '#A82424' },
    { icon: faCode, color1: '#A69726', color2: '#C7B123' },
];

const WIDTH_TO_RESIZE = 900;

const Topics = () => {
    const {width} = useWindowResize();

    const iconSize = WIDTH_TO_RESIZE >= width ? (90) : (160);
    const maxIcons = Math.floor(width / iconSize);
    let topics = 
        (1 < maxIcons) 
        ? topicList.slice(0, maxIcons - 2).concat([ellipsis])
        : [ellipsis];

    return (
        <section className='QuickSearchTopics' >
            <ul>
                {
                    topics.map((props) => {
                        return (
                            <li><CircleIcon {...props} /></li>
                        );
                    })}
            </ul>
        </section>
    );
};


export default Topics;
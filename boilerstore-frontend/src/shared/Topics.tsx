import React from 'react';
import './Topics.css';

import { faCartShopping, faCubes, faMusic, faImage, faPersonRunning, faCode, faEllipsis, } from '@fortawesome/free-solid-svg-icons';
import CircleIcon from '../components/CircleIcon';
import { Circle } from '@react-three/drei';
import { useWindowResize } from '../utils/customHooks';
import { Link } from 'react-router-dom';

const ellipsis = { icon: faEllipsis, color1: '#338C26', color2: '#3DA624', assetType: 'more'};

const assetTypeList = [
    { icon: faCubes, color1: '#1D6491', color2: '#1B71A9', assetType: '3d-model' },
    { icon: faMusic, color1: '#2E39B7', color2: '#5E6CCE', assetType: 'music' },
    { icon: faImage, color1: '#8F42B8', color2: '#A75DD0', assetType: 'image' },
    { icon: faPersonRunning, color1: '#A62626', color2: '#A82424', assetType: 'animation' },
    { icon: faCode, color1: '#A69726', color2: '#C7B123', assetType: 'code' },
];

const WIDTH_TO_RESIZE = 900;

const Topics = () => {
    const {width} = useWindowResize();

    // Resizes according to the screen resolution
    const iconSize = WIDTH_TO_RESIZE >= width ? (90) : (160);
    const maxIcons = Math.floor(width / iconSize);
    let topics = 
        (1 < maxIcons) 
        ? assetTypeList.slice(0, maxIcons - 2).concat([ellipsis])
        : [ellipsis];

    return (
        <section className='QuickSearchTopics' >
            <ul>
                {
                    topics.map((assetType) => {
                        return (
                            <li><Link to={`/asset-type?asset_type=${assetType.assetType}`}><CircleIcon {...assetType} /></Link></li>
                        );
                    })}
            </ul>
        </section>
    );
};


export default Topics;
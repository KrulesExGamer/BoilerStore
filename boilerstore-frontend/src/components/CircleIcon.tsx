import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CircleIcon.css';
import {findMiddleColor} from '../utils/colorUtils'

/**
 * CircleIcon Component
 * Renders an icon inside a circle with customizable icon color and border color.
 *
 * @component
 * @example
 * // Usage example
 * <CircleIcon icon={faHeart} color="red" borderColor="black" />
 *
 * @param {object} props - The component props.
 * @param {any} props.icon - The FontAwesome icon. (Obs: i found no better type for this param).
 * @param {string} props.color - The color of the icon.
 * @param {string} props.borderColor - The color of the circle's border.
 * @returns {JSX.Element} - The rendered CircleIcon component.
 */
const CircleIcon = (props: { icon: any, color1: string, color2: string }): JSX.Element => {
    const middleColor = findMiddleColor(props.color1, props.color2);
    const lighterColor = findMiddleColor(`#${middleColor}`, '#');

    return (
        <div className="circle-icon">
            <div 
                className="outter-circle" 
                style={{ 
                    background: `linear-gradient(45deg, ${props.color1}, ${props.color2})`, 
                    color: `#${middleColor}`, 
                    boxShadow: `2px 2px 5px #${middleColor}`,
                    textShadow: `2px 2px 5px #${middleColor}`,
                }}
            >
                <div className="inner-circle">
                    <FontAwesomeIcon icon={props.icon} size="2x"/>
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    );
};

export default CircleIcon;

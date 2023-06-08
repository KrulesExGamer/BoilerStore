import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CircleIcon.css'; // Import the CSS file for styling the component

const CircleIcon = (props: { icon: any, color : string}) => {
    return (
        <div className="circle-icon">
            <div className="circle" style={{color: props.color}} >
                <FontAwesomeIcon icon={props.icon} size='2x'/>
            </div>
        </div>
    );
};

export default CircleIcon;

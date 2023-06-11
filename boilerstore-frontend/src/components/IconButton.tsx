import React from 'react';
import './IconButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';


const IconButton = (props : {
    icon : any, 
    label : string, 
    size : SizeProp | undefined,
    hideTextOnSmallScreen : boolean,
}) => {
    return (
        <div className='IconButton'>
            <FontAwesomeIcon icon={props.icon} size={props.size} />
            <h4 className={props.hideTextOnSmallScreen ? 'hidable' : ''}>{props.label}</h4>
        </div>
    );
};


IconButton.defaultProps = {
    icon: faBug,
    label: '',
    size: 'lg',
    hideTextOnSmallScreen: true,
};

export default IconButton;

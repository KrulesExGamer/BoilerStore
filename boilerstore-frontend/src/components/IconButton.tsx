import React from 'react';
import './IconButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

export interface  IconButtonProps {
    icon : any,
    label : string,
}

const IconButton = ({icon, label} : IconButtonProps) => {
    return (
        <div className='IconButton'>
            <FontAwesomeIcon icon={icon} size='lg' />
            <h4>{label}</h4>
        </div>
    );
};

IconButton.defaultProps = {
    icon: faBug,
    label: '',
};

export default IconButton;

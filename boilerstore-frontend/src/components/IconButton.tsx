import React from 'react';
import './IconButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

export interface  IconButtonProps {
    onClick : Function,
    icon : any,
    label : string,
    href : string,
}

const IconButton = ({onClick, icon, label, href} : IconButtonProps) => {
    return (
        <a href={href} >
            <div className='IconButton'>
                <FontAwesomeIcon icon={icon} size='lg' />
                <h4>{label}</h4>
            </div>
        </a>
    );
};

IconButton.defaultProps = {
    onClick: () => {},
    icon: faBug,
    label: '',
    href: '#',
};

export default IconButton;

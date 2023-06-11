import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';


const SearchBar = (props : {onSubmit : () => void, color : string}) => {
    return (
        <form 
            className='SearchBar' 
            onSubmit={ (event) => {event.preventDefault(); props.onSubmit();} }
        >
            <input
                type="text"
                placeholder="Search..."
                style={{color: props.color}}
            />
            <div className='magnifyingGlass'> <IconButton icon={faMagnifyingGlass} /> </div>
        </form>
    );
};

SearchBar.defaultProps = {
    onSubmit: () => {},
    color: '#2077a8',
};

export default SearchBar;

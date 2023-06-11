import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';


const SearchBar = (props : {SearchProps : string, color : string}) => {
    return (
        <form className='SearchBar' onSubmit={(event) => {event.preventDefault();}}>
            <input
                type="text"
                placeholder="Search..."
                style={{color: props.color}}
                onChange={(event) => {console.log(event.target.value); props.searchQuerySetter(event.target.value);}}
            />
            <div className='magnifyingGlass'> <IconButton icon={faMagnifyingGlass} /> </div>
        </form>
    );
};

export default SearchBar;

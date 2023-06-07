import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export interface SearchProps {
    searchQuerySetter : (s : string) => void
}

const AppHeader = ({searchQuerySetter} : SearchProps) => {
    return (
        <form className='SearchBar' onSubmit={(event) => {event.preventDefault();}}>
            <input
                type="text"
                placeholder="Search..."
                onChange={(event) => {console.log(event.target.value); searchQuerySetter(event.target.value);}}
            />
            <div className='magnifyingGlass'><FontAwesomeIcon icon={faMagnifyingGlass} size='lg' /></div>
        </form>
    );
};

export default AppHeader;

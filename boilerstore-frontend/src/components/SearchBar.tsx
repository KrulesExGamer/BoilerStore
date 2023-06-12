import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Console } from 'console';


const SearchBar = (props: {
    onSubmit: ((query: string) => any) | null,
    color: string,
    queryFormat: string,
    placeholderText: string,
}) => {
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    // If no onSubmit function is provided, we use the queryFormat
    const queryOnSubmit = (query: string) => navigate(props.queryFormat.replace(/__PLACEHOLDER__/, query));

    // Wrapper to ensure props.onSubmit is not null (yes, it is needed, just some typescript oddity)
    const givenOnSubmit = null == props.onSubmit ? () => { } : props.onSubmit;

    // Deciding which onSubmit function will be used
    const onSubmit = (null == props.onSubmit) ? (() => { queryOnSubmit(query); }) : (() => { givenOnSubmit(query); });

    return (
        <form
            className='SearchBar'
            onSubmit={(event) => { event.preventDefault(); onSubmit(); console.log('submited')}}
        >
            <input
                type="text"
                placeholder={props.placeholderText}
                style={{ color: props.color }}
                onChange={(event) => {setQuery(event.target.value);}}
            />
            <button className='magnifyingGlass'> <IconButton icon={faMagnifyingGlass} /> </button>
        </form>
    );
};

SearchBar.defaultProps = {
    onSubmit: null,
    color: '#2077a8',
    queryFormat: 'results?search_query=__PLACEHOLDER__',
    placeholderText: 'Search...',
};

export default SearchBar;

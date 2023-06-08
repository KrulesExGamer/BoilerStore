import React from 'react';
import './Topics.css';

import { faCartShopping, faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons';
import CircleIcon from '../components/CircleIcon';

const topicList = [
    {icon: faCartShopping}
];

const Topics = () => {
    return (
        <section className='QuickSearchTopics' >
            <ul>
                <li><CircleIcon icon={topicList[0].icon} color='black' /></li>
                <li><CircleIcon icon={topicList[0].icon} color='black' /></li>
                <li><CircleIcon icon={topicList[0].icon} color='black' /></li>
            </ul>
        </section>
    );
};


export default Topics;
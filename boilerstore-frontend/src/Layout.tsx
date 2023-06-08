import { Outlet, Link } from "react-router-dom";
import AppHeader from "./shared/AppHeader";
import { useState } from "react";

import './reset.css';
import './index.css';
import './Layout.css';


const Layout = () => {
    let [searchQuery, setSearchQuery] = useState('');

    return (
        <div className='Layout'>
            <AppHeader searchQuerySetter={setSearchQuery} />

            <Outlet />
        </div>
    )
};


export default Layout;
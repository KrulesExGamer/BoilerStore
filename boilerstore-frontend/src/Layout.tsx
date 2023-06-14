import { Outlet, Link } from "react-router-dom";
import AppHeader from "./shared/AppHeader";
import { useState } from "react";

import './reset.css';
import './index.css';
import './Layout.css';
import AppFooter from "./shared/AppFooter";


const Layout = () => {
    return (
        <div className='Layout'>
            <AppHeader />

            <Outlet />

            <AppFooter />
        </div>
    )
};


export default Layout;
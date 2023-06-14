import { Outlet } from "react-router-dom";
import AppHeader from "./shared/AppHeader";

import './reset.css';
import './index.css';
import './Layout.css';
import AppFooter from "./shared/AppFooter";

// Homepage's Layout
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
import { useContext } from 'react';
import './AppHeader.css';
import {
	faCartShopping,
	faBarsStaggered,
	faUser,
	faSignOutAlt,
	faAdd,
} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../Context';
import { useWindowResize } from '../utils/customHooks';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import IconButton from '../components/IconButton';
import logo from '../img/boilerstore-logo.svg';
import './AppHeader.css';


const SEARCHBAR_MIN_WIDTH = 1152;

const AppHeader = () => {
	const { width } = useWindowResize();
	const breakSearchBar = SEARCHBAR_MIN_WIDTH > width;

	const { userState, setUserState } = useContext(UserContext);
	const style = userState?.isAdmin
		? { background: 'linear-gradient(45deg, #86122f, #b63b66)' }
		: {};

	return (
		<header className="AppHeader" style={style}>
			<nav className="header-navbar">
				<div className="navbar-left">
					<Link to="/">
						<img
							className="boilerstore-logo"
							alt="BoilerStore Logo"
							src={logo}
						/>
					</Link>
					<Link to="/">
						<h1 className="boilerstore-main-title">BoilerStore</h1>
					</Link>
				</div>
				<div className="navbar-center">
					<div className="logo-container">
						{!breakSearchBar && <SearchBar />}
					</div>
				</div>
				<div className="navbar-right">
					{!userState?.isLoggedIn && (
						<Link to="/login">
							<IconButton icon={faUser} label="Sign In" />
						</Link>
					)}
					{userState?.isLoggedIn && (
						<Link to="/logoff">
							<IconButton icon={faSignOutAlt} label="Sign Out" />
						</Link>
					)}

					<Link to="/cart">
						<IconButton icon={faCartShopping} label="Your Cart" />
					</Link>
					{userState?.isAdmin && (
						<Link to="/add">
							<IconButton icon={faAdd} label="Add" />
						</Link>
					)}
				</div>
			</nav>

			{breakSearchBar && (
				<div className="searchbar-on-newline">
					{' '}
					<SearchBar />{' '}
				</div>
			)}
		</header>
	);
};

export default AppHeader;

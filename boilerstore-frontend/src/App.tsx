import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logoff from './pages/Logoff';
import Recovery from './pages/Recovery';
import AssetPage from './pages/AssetPage';
import Cart from './pages/Cart';
import SearchQuery from './components/SearchQuery';
import { STD_USER_STATE, UserContext } from './Context';
import TestPage from './pages/TestPage';
import NotFound from './pages/NotFound';

const App = () => {
	let [appUserState, setAppUserState] = useState(STD_USER_STATE);

	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{
					// Provides user context to all components
					userState: appUserState,
					setUserState: setAppUserState,
				}}
			>
				<Routes>
					{' '}
					{/* Subpages */}
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="asset" element={<AssetPage />} />
						<Route path="cart" element={<Cart />} />
						<Route
							path="/results"
							element={<SearchQuery />}
						></Route>
						<Route path="/not-found" element={<NotFound />}></Route>
						<Route path="/test" element={<TestPage />}></Route>
					</Route>
					<Route path="/signup" element={<Signup />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/logoff" element={<Logoff />}></Route>
					<Route path="/recovery" element={<Recovery />}></Route>
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
};

export default App;

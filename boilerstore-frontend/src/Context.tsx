import React, { useContext } from 'react';
import { UserState } from './utils/types';

// User context configuration
const DEBUG_IS_ADMIN = true; // set to true to easily test adim functions.
export const STD_USER_STATE: UserState = DEBUG_IS_ADMIN
	? { isLoggedIn: true, isAdmin: true }
	: { isLoggedIn: false };

export interface UserContextState {
	userState?: UserState;
	setUserState?: (userAccount: UserState) => void;
}

export const STD_USER_CONTEXT_STATE: UserContextState = {};

export const UserContext = React.createContext(STD_USER_CONTEXT_STATE);
export const useUserState = () => useContext(UserContext);

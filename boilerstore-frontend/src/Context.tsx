import React, { useContext } from "react";
import { UserState } from "./utils/types";

// Configuração do contexto de usuário
export const STD_USER_STATE: UserState = { isLoggedIn: false, };

export interface UserContextState {
  userState?: UserState,
  setUserState?: (userAccount: UserState) => void,
}

export const STD_USER_CONTEXT_STATE: UserContextState = {};

export const UserContext = React.createContext(STD_USER_CONTEXT_STATE);
export const useUserState = () => useContext(UserContext);
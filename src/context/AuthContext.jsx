import {onAuthStateChanged} from "firebase/auth";
import { useEffect, useState} from "react";
import {auth} from "../firbase";

import React from "react";

export const AuthContextProvider = React.createContext();

const AuthContext = ({children}) => {
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return () =>{
			unSub();
		}
	}, []);
	return (
		<AuthContextProvider.Provider value={{currentUser}}>{children}</AuthContextProvider.Provider>
	);
};

export default AuthContext;

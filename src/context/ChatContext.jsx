import React from "react";
import {useContext} from "react";
import {useReducer} from "react";
import { AuthContextProvider } from "./AuthContext";

export const ChatContextProvider = React.createContext();

const ChatContext = ({children}) => {
	const {currentUser} = useContext(AuthContextProvider);
	const InitalState = {
		chatId: "null",
		user: {},
	};

	const chatReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_USER":
				return {
					user: action.payload,
					chatId:
						currentUser.uid > action.payload.uid
							? currentUser.uid + action.payload.uid
							: action.payload.uid + currentUser.uid,
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(chatReducer, InitalState);
	return (
		<ChatContextProvider.Provider value={{data: state, dispatch}}>
			{children}
		</ChatContextProvider.Provider>
	);
};

export default ChatContext;

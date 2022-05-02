import React, { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
	uid: '',
	activeChat: null, // uid of user that will recieve my messages
	users: [], // all users
	messages: [], //selected chat
};

export const ChatProvider = ({ children }) => {
	const [chatState, dispatch] = useReducer(chatReducer, initialState);

	return (
		<ChatContext.Provider value={{ chatState, dispatch }}>
			{children}
		</ChatContext.Provider>
	);
};

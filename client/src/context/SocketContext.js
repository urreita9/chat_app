import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { useSocket } from '../hooks/useSocket';
import { GET_USERS, SET_MESSAGE } from '../types/types';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online, connectSocket, disconnectSocket } = useSocket(
		'http://localhost:8080'
	);

	const { auth } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		if (auth.logged) {
			connectSocket();
		}
	}, [auth, connectSocket]);

	useEffect(() => {
		if (!auth.logged) {
			disconnectSocket();
		}
	}, [auth, disconnectSocket]);

	useEffect(() => {
		socket?.on('users-list', (users) => {
			dispatch({
				type: GET_USERS,
				payload: users,
			});
		});
	}, [socket, dispatch]);

	useEffect(() => {
		socket?.on('personal-message', (message) => {
			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});
		});
	}, [socket, dispatch]);

	return (
		<SocketContext.Provider value={{ socket, online }}>
			{children}
		</SocketContext.Provider>
	);
};

import React, { createContext, useCallback, useState } from 'react';
import { fetchNoToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
	uid: null,
	checking: true,
	logged: false,
	name: null,
	email: null,
};

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(initialState);

	const login = async (email, password) => {
		const res = await fetchNoToken('login', { email, password }, 'POST');
		console.log(res);
	};
	const register = (email, password) => {};
	const verifyToken = useCallback(() => {}, []);
	const logout = () => {};

	return (
		<AuthContext.Provider value={{ login, register, logout, verifyToken }}>
			{children}
		</AuthContext.Provider>
	);
};

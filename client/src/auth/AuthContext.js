import React, { createContext, useCallback, useState } from 'react';
import { fetchNoToken, fetchWithToken } from '../helpers/fetch';

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

		if (res.ok) {
			localStorage.setItem('token', res.token);
			setAuth({
				uid: res.user.uid,
				checking: false,
				logged: true,
				name: res.user.name,
				email: res.user.email,
			});
			console.log('authenticated');
		}

		return res.ok;
	};
	const register = async (email, password, name) => {
		const res = await fetchNoToken(
			'login/new',
			{ email, password, name },
			'POST'
		);
		console.log('RES REGISTER', res);
		if (res.ok) {
			localStorage.setItem('token', res.token);
			setAuth({
				uid: res.user.uid,
				checking: false,
				logged: true,
				name: res.user.name,
				email: res.user.email,
			});
			return true;
		}
		return res.msg;
	};
	const verifyToken = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			setAuth({
				uid: null,
				checking: false,
				logged: false,
				name: null,
				email: null,
			});
			return false;
		}
		const res = await fetchWithToken('login/renew');

		if (res.ok) {
			localStorage.setItem('token', res.token);
			setAuth({
				uid: res.user.uid,
				checking: false,
				logged: true,
				name: res.user.name,
				email: res.user.email,
			});
			return true;
		} else {
			setAuth({
				uid: null,
				checking: false,
				logged: false,
				name: null,
				email: null,
			});
			return false;
		}
	}, []);
	const logout = () => {};

	return (
		<AuthContext.Provider
			value={{ auth, login, register, logout, verifyToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

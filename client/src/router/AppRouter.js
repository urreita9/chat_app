import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/' element={<ChatPage />} />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</BrowserRouter>
	);
};

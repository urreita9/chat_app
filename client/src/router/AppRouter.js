import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';

import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
	const { auth, verifyToken } = useContext(AuthContext);

	useEffect(() => {
		verifyToken();
	}, [verifyToken]);

	if (auth.checking) {
		return <h1>Please wait</h1>;
	}

	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path='/auth' component={AuthRouter} />
					<Route exact path='/' component={ChatPage} />
					<Redirect to='/' />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

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
					<PublicRoute
						isAuthenticated={auth.logged}
						path='/auth'
						component={AuthRouter}
					/>

					<PrivateRoute
						isAuthenticated={auth.logged}
						path='/'
						component={ChatPage}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

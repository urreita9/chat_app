import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';

import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
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

import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import Loader from './components/loader/loader.component';
const Home = lazy(() => import('./pages/home/home.component'));
const Report = lazy(() => import('./pages/report/report.components')) ;

function App(): JSX.Element {
	return (
		<div>
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<Route path={'/'} exact component={Home}  />
						<Route path={'/report/:id'} component={Report}  />
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
}

export default App;

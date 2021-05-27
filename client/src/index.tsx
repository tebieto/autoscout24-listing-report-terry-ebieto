import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const link = createHttpLink({
	uri: '/graphql',
	credentials: 'same-origin'
});
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);

import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './header.styles';

const Header = ():JSX.Element => (
	<HeaderContainer>
		<NavLink to="/">
			<h1>Coding Challenge - AutoScout24 Listing Report</h1>
		</NavLink>
	</HeaderContainer>
);

export default Header;

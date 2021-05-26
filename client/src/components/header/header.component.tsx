import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './header.styles';
import logo from '../../assets/report.svg';

const Header = ():JSX.Element => (
	<HeaderContainer>
		<NavLink to="/">
			<img src={logo} alt="" />
		</NavLink>
		<h2>Listings Report</h2>
	</HeaderContainer>
);

export default Header;

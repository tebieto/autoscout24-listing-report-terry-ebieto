import React from 'react';
import { LoaderContainer } from './loader.styles';
import LoaderImage from '../../assets/loader.svg';

const Loader = ():JSX.Element => (
	<LoaderContainer>
		<img src={LoaderImage} alt=""/>
	</LoaderContainer>
);

export default Loader;
import React from 'react';
import Reports from '../../components/reports/reports.component';
import { Upload } from '../../components/upload/upload.component';
import { HomeStylesContainer } from './home.styles';

const Home = (): JSX.Element => {
	return (
		<HomeStylesContainer>
			<Upload />
			<Reports />
		</HomeStylesContainer>
	);
    
}; 
export default Home;
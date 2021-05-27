import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { PageNotFound, ReportStylesContainer } from './report.styles';
import { ReportAttributes } from '../../interfaces/report';
import { REPORT } from '../../graphql/report.queries';
import Header from '../../components/header/header.component';
import Loader from '../../components/loader/loader.component';

const Report = ():JSX.Element => {
	const params: { uuid: string } = useParams();
	const { data, loading } = useQuery(REPORT, { variables: { uuid: params.uuid } });
	const report: ReportAttributes = data && data.report;
	console.log(report);
	return (
		report ?
			<ReportStylesContainer>
				<h2>Average Listing Selling Price Per Seller Type</h2>
				<table>
					<thead>
						<th>Seller Type</th>
						<th>Average Price</th>
					</thead>
					<tbody>
						{
							report.avgListingSellingPricePerSellerType?.map((average, key) => (
								<tr key={key}>
									<td>{average.seller_type}</td>
									<td>{average.avg_price}</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<h2>Percentage Distribution of Available Cars By Make</h2>
				<table>
					
				</table>
			</ReportStylesContainer> : loading ? <Loader /> : <PageNotFound>
				<Header />
				<h3>404 Page not foud</h3>
			</PageNotFound>
	);
}; 

export default Report;
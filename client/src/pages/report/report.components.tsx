import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { PageNotFound, ReportStylesContainer } from './report.styles';
import { ListingAttributes, ReportAttributes } from '../../interfaces/report';
import { REPORT } from '../../graphql/report.queries';
import Header from '../../components/header/header.component';
import Loader from '../../components/loader/loader.component';

interface TopFiveMostcontactedListingsByMonth {
	[fieldname: string]: ListingAttributes[]
}
const Report = ():JSX.Element => {
	const params: { uuid: string } = useParams();
	const { data, loading } = useQuery(REPORT, { variables: { uuid: params.uuid } });
	const report: ReportAttributes = data && data.report;
	const topFiveMostcontactedListingsByMonth: TopFiveMostcontactedListingsByMonth = report ? JSON.parse(report.topFiveMostcontactedListingsByMonth) : null;
	return (
		report ?
			<ReportStylesContainer>
				<h2>Average Listing Selling Price Per Seller Type</h2>
				<table>
					<thead>
						<tr>
							<th>Seller Type</th>
							<th>Average Price</th>
						</tr>
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
					<thead>
						<tr>
							<th>Make</th>
							<th>Distribution</th>
						</tr>
					</thead>
					<tbody>
						{
							report.percentageDistributionByMake?.map((distribution, key)=> (
								<tr key={key}>
									<td>{distribution.make}</td>
									<td>{distribution.percentage}</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<h2>Average Price of the 30% Most Contacted List</h2>
				<table>
					<thead>
						<tr>
							<th>Average Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{
									report.avgPriceOfTopThirtyMostContactedListings
								}
							</td>
						</tr>
					</tbody>
				</table>
				<h2>Top 5 Most Contacted Listings Per Month</h2>
				{Object.keys(topFiveMostcontactedListingsByMonth)
					.sort((firsIndex, nextIndex) => parseFloat(firsIndex) > parseFloat(nextIndex) ? 1 : -1)
					.map((month, key) => {
						const monthlyListings = topFiveMostcontactedListingsByMonth[month];
						console.log({ monthlyListings });
						return <div key={key}>
							<div >Month: {month}</div>
							{
								monthlyListings ?
									<table>
										<thead>
											<tr>
												<th>Ranking</th>
												<th>Listing Id</th>
												<th>Make</th>
												<th>Selling Price</th>
												<th>Mileage</th>
												<th>Total Amount of Contacts</th>
											</tr>
										</thead>
										<tbody>
											{
												monthlyListings.map((listings, key) => (
													<tr key={key}>
														<td>{key+1}</td>
														<td>{listings.id}</td>
														<td>{listings.make}</td>
														<td>{listings.formatted_price}</td>
														<td>{listings.formatted_mileage}</td>
														<td>{listings.occurence}</td>
													</tr>
												))
											}
										</tbody>
									</table>: <h5>Loading...</h5>
							}
						</div>;
					})}
			</ReportStylesContainer> : loading ? <Loader /> : <PageNotFound>
				<Header />
				<h3>404 Page not foud</h3>
			</PageNotFound>
	);
}; 

export default Report;
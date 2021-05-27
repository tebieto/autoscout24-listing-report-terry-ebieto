import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { PageNotFound, ReportStylesContainer } from './report.styles';
import { ReportAttributes, TopFiveMostcontactedListingsByMonth } from '../../interfaces/report';
import { REPORT } from '../../graphql/report.queries';
import Header from '../../components/header/header.component';
import Loader from '../../components/loader/loader.component';
import MostContacted from '../../components/most-contacted/most-contacted.component';
import AverageListing from '../../components/average-listing/average-listing.component';
import PercentageDistribution from '../../components/percentage-distribution/percentage-distribution.components';

const Report = ():JSX.Element => {
	const params: { uuid: string } = useParams();
	const { data, loading } = useQuery(REPORT, { variables: { uuid: params.uuid } });
	const report: ReportAttributes = data && data.report;
	const topFiveMostcontactedListingsByMonth: TopFiveMostcontactedListingsByMonth = report ? JSON.parse(report.topFiveMostcontactedListingsByMonth) : null;
	return (
		report ?
			<ReportStylesContainer>
				<div className="align-left">
					<AverageListing report={report} />
					<PercentageDistribution report={report} />
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
				</div>
				<MostContacted topFiveMostcontactedListingsByMonth={topFiveMostcontactedListingsByMonth}  />
			</ReportStylesContainer> : loading ? <Loader /> : <PageNotFound>
				<Header />
				<h3>404 Page not foud</h3>
			</PageNotFound>
	);
}; 

export default Report;
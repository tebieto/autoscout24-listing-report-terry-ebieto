import React from 'react';
import { useQuery } from '@apollo/client';
import { REPORTS } from '../../graphql/report.queries';
import { ReportAttributes } from '../../interfaces/report';
import { ReportsStylesContainer } from './reports.styles';
import { useHistory } from 'react-router';
import Loader from '../loader/loader.component';

const Reports = (): JSX.Element => {
	const { data, loading } = useQuery(REPORTS);

	const reports: ReportAttributes[] = data && data.reports;
	const history = useHistory();

	return(
		<ReportsStylesContainer>
			<h2>Uploaded Reports</h2>
			{
				reports && reports.length ?
					<table cellSpacing="10px">
						<thead>
							<tr>
								<th>No.</th>
								<th>Listings(CSV)</th>
								<th>Contacts(CSV)</th>
								<th>Date Created</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								reports.map((report, key)=> (
									<tr key={key}>
										<td>{key+1}</td>
										<td>{report.listings_csv_name}</td>
										<td>{report.contacts_csv_name}</td>
										<td>{new Date(parseInt(report.createdAt)).toDateString()}</td>
										<td><button onClick={() => history.push(`/report/${report.uuid}`)}>View Report</button></td>
									</tr>
								))
							}
						</tbody>
					</table>: loading ? <Loader /> : <h5 style={{ color: 'red' }}>Upload Listings and Contacts CSV files to to generate a report</h5>
			}
		</ReportsStylesContainer>
	);
}; 
export default Reports;
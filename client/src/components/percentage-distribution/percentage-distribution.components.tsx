import React from 'react';
import { ReportAttributes } from '../../interfaces/report';
import { PercentageDistributionStylesContainer } from './percentage-distribution.styles';

interface PercentageDistributionProps {
    report: ReportAttributes
}

const PercentageDistribution = (props: PercentageDistributionProps): JSX.Element => {
	const { report } = props;
	return (
		<PercentageDistributionStylesContainer>
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
		</PercentageDistributionStylesContainer>
	);
};

export default PercentageDistribution;
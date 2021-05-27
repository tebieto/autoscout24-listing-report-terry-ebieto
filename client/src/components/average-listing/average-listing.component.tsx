import React from 'react';
import { ReportAttributes } from '../../interfaces/report';
import { AverageListingContainer } from './average-listing.styles';

interface AverageListingProps {
    report: ReportAttributes
}
const AverageListing = (props: AverageListingProps): JSX.Element => {
	const { report } = props;
	return (
		<AverageListingContainer>
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
		</AverageListingContainer>
	);
};
export default AverageListing;
import React from 'react';
import { TopFiveMostcontactedListingsByMonth } from '../../interfaces/report';
import { MostContactedContainer } from './most-contacted.styles';

interface MostContactedProps {
    topFiveMostcontactedListingsByMonth: TopFiveMostcontactedListingsByMonth
}
const MostContacted = (props: MostContactedProps): JSX.Element => {
	const { topFiveMostcontactedListingsByMonth } = props;
	return (
		<MostContactedContainer>
            
			<h2>Top 5 Most Contacted Listings Per Month</h2>
			{Object.keys(topFiveMostcontactedListingsByMonth)
				.sort((firsIndex, nextIndex) => parseFloat(firsIndex) > parseFloat(nextIndex) ? 1 : -1)
				.map((month, key) => {
					const monthlyListings = topFiveMostcontactedListingsByMonth[month];
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
		</MostContactedContainer>
	);
};

export default MostContacted;
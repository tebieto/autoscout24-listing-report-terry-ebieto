import { ContactModel } from '../db/models/contact';
import { ListingModel } from '../db/models/listing';
import { ContactedListingsWithCount, ContactedListingsCountObect } from '../interfaces/report';


interface ListingsByMonth {
	[fieldname: string]: ListingModel[]
}

export const getAvgListings = (listings: ListingModel[]): void => {
	console.log([{ listings }]);
};

export const getMostcontactedListingsByMonth = (contacts: ContactModel[], listings: ListingModel[]): ListingsByMonth => {
	// mostContactedListingsByMonth is month:listings[] key:value pair
	const mostcontactedListingsByMonth: ListingsByMonth = {};

	/**
	 * contactedListingsByMonth is month:listings[] key:value pair
	 */
	const contactedListingsByMonth: ListingsByMonth = {};

	contacts.forEach(contact=> {
		/**
		 * Convert contact_date to int
		 * Getting the month listing was contacted
		 */
		const date = new Date(parseInt(contact.contact_date));
		const month = `${date.getMonth()}.${date.getFullYear()}`;
		const listing = listings.find(listing => listing.id === contact.listing_id);
		if(listing) {
			if(contactedListingsByMonth[month]) {
				contactedListingsByMonth[month].push(listing);
			} else {
				contactedListingsByMonth[month] = [listing];
			}
		}
	});
	
	Object.keys(contactedListingsByMonth).forEach(month => {
		const listings = contactedListingsByMonth[month];

		/**
		 * Get number of occurence of listings in a month 
		 * Sort by number of occurence
		 */
		const listingsIdOccurenceCount: {[fieldname: number]: number} = {};
		listings.forEach(listing => {
			if(listingsIdOccurenceCount[listing.id]) {
				listingsIdOccurenceCount[listing.id] += 1;
			} else {
				listingsIdOccurenceCount[listing.id] = 1;
			}
		});

		const result: ListingModel[] = [];
		
		Object.keys(listingsIdOccurenceCount)
			.sort((firstId, nextId) => {
				return listingsIdOccurenceCount[parseInt(firstId)] > listingsIdOccurenceCount[parseInt(nextId)] ? -1 : 1;
			}).slice(0, 5)
			.forEach(listingId => {
				const listing = listings.find(listing => listing.id === parseInt(listingId));
				if(listing) {
					listing['occurence'] = listingsIdOccurenceCount[listing.id];
					listing.formatted_price= `€ ${listing.price.toFixed(3)},-`;
					listing.formatted_mileage = `${listing.mileage.toFixed(3)} KM`;
					console.log(listing);
					result.push(listing);
				}
			});

		mostcontactedListingsByMonth[month] = result;
	});

	return mostcontactedListingsByMonth;
};

export const getAvgPriceOfMostContactedListings = (listings: ListingModel[], contactedListingsCount:  ContactedListingsCountObect | ContactedListingsWithCount[]): string => {
	const contacted = contactedListingsCount as ContactedListingsWithCount[];

	const contactedListings: ContactedListingsWithCount[] = [];
	
	contacted.forEach(({ listing_id, count }) => {
		const listing = listings.find(listing => listing.id === listing_id);
		if(listing) {
			contactedListings.push({ listing_id, listing, count });
		}
	});

	contactedListings.sort((firstListing, nextListing) => {
		if(firstListing && nextListing ) {
			return parseInt(firstListing.count) > parseInt(nextListing.count) ? -1 : 1;
		}
		return 0;
	});

	const topThirtyPercentLength = Math.floor((30 * contactedListings.length) / 100);
	const topThirthyPercentContactedListings =  contactedListings.slice(0, topThirtyPercentLength);
	const avgPriceOfMostContactedListings = (topThirthyPercentContactedListings.reduce((a, b) => a + (b.listing.price), 0)/topThirtyPercentLength).toFixed(3);
	const formated = `€ ${avgPriceOfMostContactedListings},-`;
	return  formated;
};
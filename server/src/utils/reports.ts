import { ContactModel } from '../db/models/contact';
import { ListingModel } from '../db/models/listing';
import { AverageListingSellingPricePerSellerType, ContactedListingsWithCount, ListingSellerType, ModelCountType, PercentageDistributionByMake } from '../interfaces/report';


interface ListingsByMonth {
	[fieldname: string]: ListingModel[]
}

const formatPrice = (price: number ): string => {
	return `€ ${price.toFixed(3)},-`;
};

export const getAvgListingSellingPricePerSellerType = (listings: ListingModel[], sellerTypes: ModelCountType | ListingSellerType[]): AverageListingSellingPricePerSellerType[] => {
	const sellerTypesCopy = sellerTypes as ListingSellerType[];

	const avgListingSellingPricePerSellerType: AverageListingSellingPricePerSellerType[] = [];
	
	sellerTypesCopy.forEach(({ seller_type, count }) => {
		const listingsBySellerType = listings.filter((listing) => listing.seller_type === seller_type);
		const avg_price = (listingsBySellerType.reduce((accumulatedPrice, nextListing) => accumulatedPrice + nextListing.price, 0))/listingsBySellerType.length;
		const formated_avg_price = formatPrice(avg_price);
		if(listingsBySellerType.length) {
			avgListingSellingPricePerSellerType.push({ seller_type, count, avg_price: formated_avg_price });
		}
	});

	return avgListingSellingPricePerSellerType;
};

export const getTopFiveMostcontactedListingsByMonth = (contacts: ContactModel[], listings: ListingModel[]): string => {
	// mostContactedListingsByMonth is month:listings[] key:value pair
	const topFiveMostcontactedListingsByMonth: ListingsByMonth = {};

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

		const maximumReturnLength = 5;
		
		Object.keys(listingsIdOccurenceCount)
			.sort((firstId, nextId) => {
				return listingsIdOccurenceCount[parseInt(firstId)] > listingsIdOccurenceCount[parseInt(nextId)] ? -1 : 1;
			}).slice(0, maximumReturnLength)
			.forEach(listingId => {
				const listing = listings.find(listing => listing.id === parseInt(listingId));
				if(listing) {
					listing['occurence'] = listingsIdOccurenceCount[listing.id];
					listing.formatted_price= formatPrice(listing.price);
					listing.formatted_mileage = `${listing.mileage.toFixed(3)} KM`;
					result.push(listing);
				}
			});

		topFiveMostcontactedListingsByMonth[month] = result;
	});
	return JSON.stringify(topFiveMostcontactedListingsByMonth);
};

export const getAvgPriceOfMostContactedListings = (listings: ListingModel[], contactedListingsCount:  ModelCountType | ContactedListingsWithCount[]): string => {
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
	const avgPriceOfMostContactedListings = (topThirthyPercentContactedListings.reduce((contactedListingPriceSum, nextContactedListing) => contactedListingPriceSum + (nextContactedListing.listing.price), 0)/topThirtyPercentLength);
	return  formatPrice(avgPriceOfMostContactedListings);
};

export const getPercentageDistributionOfListingsByCarMake = (listingDistributionByCarMake: ModelCountType | PercentageDistributionByMake[]): PercentageDistributionByMake[] => {
	const distributions = listingDistributionByCarMake as PercentageDistributionByMake[];
	const totalListingDistribution = distributions.reduce((distributionCountSum, nextDistribution) => distributionCountSum + parseInt(nextDistribution.count), 0);
	const percentageDistributionByMake = distributions.map(distribution => {
		const percentage = (parseInt(distribution.count)* 100)/totalListingDistribution;
		distribution.percentage = `${percentage}%`;
		return distribution;
	}).sort((firstIndex, nextIndex) => {
		return parseInt(firstIndex.count) > parseInt(nextIndex.count) ? -1 : 1;
	});
	return percentageDistributionByMake;
};
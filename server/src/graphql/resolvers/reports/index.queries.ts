import Contact from '../../../db/models/contact';
import Listing from '../../../db/models/listing';
import Report from '../../../db/models/report';
import { ContactedListingsWithCount, ModelCountType, ReportAttributes, ListingSellerType, PercentageDistributionByMake } from '../../../interfaces/report';
import { getAvgListingSellingPricePerSellerType, getAvgPriceOfMostContactedListings, getPercentageDistributionOfListingsByCarMake, getTopFiveMostcontactedListingsByMonth } from '../../../utils/reports';

export const reportsQueries = {
	async reports(): Promise<ReportAttributes[]> {
		return await Report.findAll({
			order: [['createdAt', 'DESC']],
		});
	},
	async report(_: void, { uuid }: { uuid: string }): Promise<ReportAttributes | null> {
		const report =  await Report.findOne({
			where:{ uuid }
		});
		if(report) {
			const listings = await Listing.findAll({
				where: { report_uuid: report.uuid },
				order: [['createdAt', 'DESC']],
			});
			const contacts = await Contact.findAll({
				where: { report_uuid: report.uuid },
				order: [['createdAt', 'DESC']],
			});

			const sellerTypes : ModelCountType | ListingSellerType[] = await Listing.count({
				attributes: ['seller_type'],
				group: ['seller_type']
			});

			const listingDistributionByCarMake: ModelCountType | PercentageDistributionByMake[]  = await Listing.count({
				attributes: ['make'],
				group: ['make']
			});

			const contactedListingCount: ModelCountType| ContactedListingsWithCount[]  = await Contact.count({
				attributes: ['listing_id'],
				group: ['listing_id'],
			});

			report.contacts = contacts,
			report.listings = listings;
			report.avgListingSellingPricePerSellerType = getAvgListingSellingPricePerSellerType(listings, sellerTypes);
			report.percentageDistributionByMake = getPercentageDistributionOfListingsByCarMake(listingDistributionByCarMake);
			report.topFiveMostcontactedListingsByMonth = getTopFiveMostcontactedListingsByMonth(contacts, listings);
			report.avgPriceOfMostContactedListings = getAvgPriceOfMostContactedListings(listings, contactedListingCount);
			return report;
		}

		throw new Error(`Could not find report with uuid: ${uuid}`);
	},
};
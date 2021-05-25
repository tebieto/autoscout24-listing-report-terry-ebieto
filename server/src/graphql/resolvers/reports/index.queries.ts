import Contact from '../../../db/models/contact';
import Listing from '../../../db/models/listing';
import Report from '../../../db/models/report';
import { ContactedListingsCountObect, ContactedListingsWithCount, ReportAttributes } from '../../../interfaces/report';
import { getAvgListings, getAvgPriceOfMostContactedListings, getMostcontactedListingsByMonth } from '../../../utils/reports';

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

			const sellerTypeCount  = await Listing.count({
				attributes: ['seller_type'],
				group: ['seller_type']
			});

			const makeCount  = await Listing.count({
				attributes: ['make'],
				group: ['make']
			});

			const contactedListingCount: ContactedListingsCountObect | ContactedListingsWithCount[]  = await Contact.count({
				attributes: ['listing_id'],
				group: ['listing_id'],
			});

			report.contacts = contacts,
			report.listings = listings;
			console.log(sellerTypeCount);
			console.log(makeCount);
			getAvgListings(listings);
			getMostcontactedListingsByMonth(contacts, listings);
			getAvgPriceOfMostContactedListings(listings, contactedListingCount);
			return report;
		}

		throw new Error(`Could not find report with uuid: ${uuid}`);
	},
};

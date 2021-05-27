import { sequelize } from '../../../db/models';
import Contact from '../../../db/models/contact';
import Listing from '../../../db/models/listing';
import Report, { ReportModel } from '../../../db/models/report';
import { ContactAttributes } from '../../../interfaces/contact';
import { ListingAttributes } from '../../../interfaces/listing';
import { ContactedListingsWithCount, ListingSellerType, ModelCountType, PercentageDistributionByMake } from '../../../interfaces/report';
import { fakeReport } from '../../../utils/fake';
import { getAvgListingSellingPricePerSellerType, getAvgPriceOfMostContactedListings, getPercentageDistributionOfListingsByCarMake, getTopFiveMostcontactedListingsByMonth } from '../../../utils/reports';
import {  v4 as uuid } from 'uuid';
import { report } from 'process';

describe('test graphql resolver report(uuid)', () => {
	// Before any tests run, clear the DB and run migrations with Sequelize sync()
	beforeAll(async () => {
		await sequelize.sync();
	});

	const getBulk = async (): Promise<{ bulkListing: ListingAttributes[],  bulkContact:ContactAttributes[], report_uuid: string | undefined } >=> {
		const report: ReportModel = await Report.create(fakeReport);
		const bulkListing = [
			{ 'id':1035,'make':'Mercedes-Benz','price':21943,'mileage':8500,'seller_type':'private', report_uuid: report.uuid, uuid: await uuid()  },
			{ 'id':1036,'make':'Renault','price':44138,'mileage':9000,'seller_type':'dealer', report_uuid: report.uuid, uuid: await uuid()  },
			{ 'id':1037,'make':'Fiat','price':14940,'mileage':7000,'seller_type':'other', report_uuid: report.uuid, uuid: await uuid()  }
		];
		const bulkContact = [
			{ 'listing_id': 1035, contact_date: '1592498493000', report_uuid: report.uuid, uuid: await uuid() },
			{ 'listing_id': 1036, contact_date: '1579365755000', report_uuid: report.uuid, uuid: await uuid() },
			{ 'listing_id': 1037, contact_date: '1579365755000', report_uuid: report.uuid, uuid: await uuid()  },
			{ 'listing_id': 1036, contact_date: '1592498493000', report_uuid: report.uuid , uuid: await uuid() },
			{ 'listing_id': 1035, contact_date: '1592498493000', report_uuid: report.uuid , uuid: await uuid() }
		];
		return  { bulkContact, bulkListing, report_uuid: report.uuid };
	};
    
	it('should getAvgListingSellingPricePerSellerType', async () => {
		const { bulkListing, bulkContact , report_uuid } = await getBulk();
		await Listing.bulkCreate(bulkListing);
		await Contact.bulkCreate(bulkContact);

		const listings = await Listing.findAll({
			where: { report_uuid },
			order: [['createdAt', 'DESC']],
		});
    
		const sellerTypes : ModelCountType | ListingSellerType[] = await Listing.count({
			attributes: ['seller_type'],
			group: ['seller_type']
		});

		const avg = getAvgListingSellingPricePerSellerType(listings, sellerTypes);
		console.log(avg);
		expect(avg).toBeTruthy();
	});

	it('should getPercentageDistributionOfListingsByCarMake', async () => {
		const { bulkListing, bulkContact , report_uuid } = await getBulk();
		await Listing.bulkCreate(bulkListing);
		await Contact.bulkCreate(bulkContact);
		const listingDistributionByCarMake: ModelCountType | PercentageDistributionByMake[]  = await Listing.count({
			attributes: ['make'],
			group: ['make'],
			where: { report_uuid: report_uuid }
		});

		const percentageDistribution = getPercentageDistributionOfListingsByCarMake(listingDistributionByCarMake);
		expect(percentageDistribution).toBeTruthy();
	});

	it('should getTopFiveMostcontactedListingsByMonth', async () => {
		const { bulkListing, bulkContact , report_uuid } = await getBulk();
		await Listing.bulkCreate(bulkListing);
		await Contact.bulkCreate(bulkContact);
		
		const listings = await Listing.findAll({
			where: { report_uuid },
			order: [['createdAt', 'DESC']],
		});
		const contacts = await Contact.findAll({
			where: { report_uuid },
			order: [['createdAt', 'DESC']],
		});	

		const TopFive = getTopFiveMostcontactedListingsByMonth(contacts, listings);
		expect(TopFive).toBeTruthy();
	});

	it('should getAvgPriceOfMostContactedListings', async () => {
		const { bulkListing, bulkContact , report_uuid } = await getBulk();
		await Listing.bulkCreate(bulkListing);
		await Contact.bulkCreate(bulkContact);
		
		const listings = await Listing.findAll({
			where: { report_uuid },
			order: [['createdAt', 'DESC']],
		});

		const contactedListingCount: ModelCountType| ContactedListingsWithCount[]  = await Contact.count({
			attributes: ['listing_id'],
			group: ['listing_id'],
			where: { report_uuid }
		});

		const averagePrice = getAvgPriceOfMostContactedListings(listings, contactedListingCount);
		expect(averagePrice).toBeTruthy();
	});


	afterAll(function () {
		sequelize.close();
	});
});
import { sequelize } from '../../db/models';
import {  v4 as uuid } from 'uuid';
import Report, { ReportModel } from '../../db/models/report';
import { fakeListing, fakeReport } from '../../utils/fake';
import Listing, { ListingModel } from '../../db/models/listing';
import { syncModels } from '../../utils/model';

describe('test the Listings model', () => {
	// Before any tests run, clear the DB and run migrations with Sequelize sync()
	beforeAll(async () => {
		await syncModels();
	});

	it('should succeed when bulk creating listings', async () => {
		const report: ReportModel = await Report.create({ ...fakeReport, uuid: await uuid() });
		const testUUID = await uuid();
		const testListing = { ...fakeListing, uuid: testUUID, report_uuid: report.uuid };
		await Listing.bulkCreate([testListing]);
		const listing: ListingModel | null = await Listing.findOne({
			where: { uuid: testUUID, report_uuid: report.uuid }
		});
		expect(listing?.make).toEqual(testListing.make);
	});

	afterAll(function () {
		sequelize.close();
	});
});
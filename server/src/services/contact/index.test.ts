import { sequelize } from '../../db/models';
import Report, { ReportModel } from '../../db/models/report';
import {  v4 as uuid } from 'uuid';
import { fakeContacts,fakeReport } from '../../utils/fake';
import Contact, { ContactModel } from '../../db/models/contact';
import { syncModels } from '../../utils/model';

describe('test the Contacts model', () => {
	// Before any tests run, clear the DB and run migrations with Sequelize sync()
	beforeAll(async () => {
		await syncModels();
	});

	it('should succeed when bulk creating contacts', async () => {
		const report: ReportModel = await Report.create({ ...fakeReport, uuid: await uuid() });
		const testUUID = await uuid();
		expect(report.uuid).toBeTruthy();
		const testContact = { ...fakeContacts, uuid: testUUID, report_uuid: report.uuid };
		await Contact.bulkCreate([testContact]);
		const contact: ContactModel | null = await Contact.findOne({
			where: { uuid: testUUID, report_uuid: report.uuid }
		});
		expect(contact?.listing_id).toEqual(testContact.listing_id);
	});

	afterAll(function () {
		sequelize.close();
	});
});
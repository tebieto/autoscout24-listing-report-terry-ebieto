import { sequelize } from '../../db/models';
import Report, { ReportModel } from '../../db/models/report';
import { fakeReport } from '../../utils/fake';
import {  v4 as uuid } from 'uuid';
import { syncModels } from '../../utils/model';

describe('test the Report model', () => {
	// Before any tests run, clear the DB and run migrations with Sequelize sync()
	beforeAll(async () => {
		await syncModels();
	});

	it('should succeed when creating a report', async () => {
		const report: ReportModel = await Report.create({ ...fakeReport, uuid: await uuid() });
		expect(report.listings_csv_link).toBe(fakeReport.listings_csv_link);
	});

	afterAll(function () {
		sequelize.close();
	});
});
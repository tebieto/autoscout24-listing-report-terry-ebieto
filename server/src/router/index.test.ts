import supertest from 'supertest';
import app from '../app';
import { sequelize } from '../db/models';
import path from 'path';
import { syncModels } from '../utils/model';

describe('POST api/upload/csv', () => {
	// Before any tests run, clear the DB and run migrations with Sequelize sync()
	beforeAll(async () => {
		await syncModels();
	});

	it('should upload contacts and listings csv files', async () => {
		const listingsCsv = path.join(__dirname, '../../', 'listings.csv');
		const contactsCsv = path.join(__dirname, '../../', 'contacts.csv');
		const response = await supertest(app)
			.post('/api/upload/csv')
			.attach('contacts', contactsCsv)
			.attach('listings', listingsCsv)
			.expect(200);
		expect(response.text).toBe('Successfully persisted report, contacts and listings');
	});

	it('should Error when Lisitings CSV is missing', async () => {
		const listingsCsv = path.join(__dirname, '../../', 'listings.csv');
		const response = await supertest(app)
			.post('/api/upload/csv')
			.attach('contacts', listingsCsv)
			.expect(401);
		expect(response.status).toBe(401);
	});

	it('should Error when Contacts CSV is missing', async () => {
		const contactsCsv = path.join(__dirname, '../../', 'contacts.csv');
		const response = await supertest(app)
			.post('/api/upload/csv')
			.attach('contacts', contactsCsv)
			.expect(401);
		expect(response.status).toBe(401);
	});

	it('should Error when Wrong CSV format is uploaded ', async () => {
		const buffer = Buffer.from('some data');
		const response = await supertest(app)
			.post('/api/upload/csv')
			.attach('contacts', buffer, 'custom_file_name.csv')
			.attach('listings', buffer, 'custom_file_name.csv')
			.expect(401);
		expect(response.status).toBe(401);
	});
	afterAll(function () {
		sequelize.close();
	});
});
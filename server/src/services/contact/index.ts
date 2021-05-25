import * as fs from 'fs';
import * as csv from 'fast-csv';
import { ContactAttributes } from '../../interfaces/contact';
import Contact from '../../db/models/contact';
import {  v4 as uuid } from 'uuid';
import { Stream } from 'stream';
import { Response } from 'express';
import { ReportModel } from '../../db/models/report';

export const persistContactsToDatabase = async (report: ReportModel, contactCSVPath: string, res: Response): Promise<Stream> => {
	const contacts: ContactAttributes[] = [];
	return await fs.createReadStream(contactCSVPath)
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => {
			throw error.message;
		})
		.on('data', async(row: ContactAttributes) => {
			if(row && row.listing_id && row.contact_date) {
				contacts.push({ ...row, report_uuid: report.uuid, uuid: await uuid() });
			} else {
				throw new Error('Invalid Contacts format in CSV');
			}
		})
		.on('end', async () => {
			try {
				await Contact.bulkCreate(contacts);
				res.status(200).send('Successfully persisted report, contacts and listings');
			} catch(error) {
				throw new Error(error);
			}
		});	
};
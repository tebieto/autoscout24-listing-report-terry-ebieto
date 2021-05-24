import * as fs from 'fs';
import * as csv from 'fast-csv';
import { ContactAttributes } from '../../interfaces/contact';
import Contact from '../../db/models/contact';
import {  v4 as uuid } from 'uuid';
export const persistContactsToDatabase = (report_uuid: string | undefined, contactCSVPath: string):void => {
	console.log({ report_uuid, contactCSVPath });
	const contacts: ContactAttributes[] = [];
	fs.createReadStream(contactCSVPath)
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => {
			throw error.message;
		})
		.on('data', async(row: ContactAttributes) => {
			if(row && row.listing_id && row.contact_date) {
				contacts.push({ ...row, report_uuid, uuid: await uuid() });
			}
		})
		.on('end', () => {
			Contact.bulkCreate(contacts);
		});	
};
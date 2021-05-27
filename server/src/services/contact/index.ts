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
			//store row in an array only after passing the checks
			if(row && row.listing_id && row.contact_date) {
				contacts.push({ ...row, report_uuid: report.uuid, uuid: await uuid() });
			} 
		})
		.on('end', async () => {
			try {
				if(contacts.length) {
					//everything is fine, save listings to database with sequelize bulkCreate method
					Contact.bulkCreate(contacts);
					res.status(200).send('Successfully persisted report, contacts and listings');
				} else {
					/**
					 * empty contacts means error in the file formate
					 * destroy the report and send error message
					 */
					report.destroy();
					res.status(401).send('Invalid Contacts CSV format found');
				}
			} catch(error) {
				console.log(error);
			}
		});	
};
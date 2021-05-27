import { Request, Response } from 'express';
import Report, { ReportModel } from '../../db/models/report';
import { csvUploadPath } from '../../utils';
import { persistContactsToDatabase } from '../contact';
import { persistListingsToDatabase } from '../listing';

export const persistReport = async (req: Request, res: Response): Promise<void> => {
	try {
		const origin = req.headers.origin;
		const files = req.files as { [fieldname: string]: Express.Multer.File[] };
		const contactsCsv = files['contacts'][0];
		const listingsCsv = files['listings'][0];
		if(contactsCsv && listingsCsv) {
			const listings_csv_name = listingsCsv.filename;
			const contacts_csv_name = contactsCsv.filename;
			const listings_csv_link = `${origin}/${csvUploadPath}/${listingsCsv.filename}`;
			const contacts_csv_link = `${origin}/${csvUploadPath}/${listingsCsv.filename}`;
			/** 
			 * we want to create a report with these information, for record and tracking purpose
			 * contacts and listings posted at the same time are tracked with report uuid
			 * this allows us to upload multiple contacts.csv and listings.csv pair and generate detailed reports
			 * accordingly while keeping an upload history
			 * */ 
			const report: ReportModel = await Report.create({ listings_csv_link, contacts_csv_link, listings_csv_name, contacts_csv_name  });
			
			const nextAction = () => {
				// Will be fired when persisListingsToDatabase is completed successfully with no errors
				// This will persist ContactsCSV data To Database
				if(report) {
					persistContactsToDatabase(report, contactsCsv.path, res);
				}
			};
			if(report) {
				persistListingsToDatabase(report, listingsCsv.path, res, nextAction);
			} else {
				res.status(401).send('Error creating report');
			}
		}else if(!contactsCsv) {
			res.status(401).send('Contacts CSV(contacts.csv) is required');
		} else if(!listingsCsv) {
			res.status(401).send('Listings CSV(listings.csv) is required');
		}
	} catch(error) {
		console.log(error);
		res.status(401).send(error);
	}
};
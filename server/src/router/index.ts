/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import multer from 'multer';
import { uploadCSV } from '../middleware/upload';
import { persistReport } from '../services/report';
/**
 * Router Definition
 */

export const route = express.Router();

/**
 * Controller Definitions
 */

 
/**
 * Get report by report uuid
 * I made an assumption that it is good to keep an history of generated reports
 * Therefore I keep a record of every pair of listings.cv and contacts.cv uploaded
 * By storing them in a seperate table and then adding 
 * the report_id as a foreign key for each recored stored during the data extraction from csv
 */

route.get('/report/:uuid', async (req: Request, res: Response) => {
	const uuid: number = parseInt(req.params.uuid, 10);
  
	try {
		// const item: Item = await ItemService.find(id);
  
		// if (item) {
		// 	return res.status(200).send(item);
		// }

		if(uuid) {
			return res.status(200).send(`${uuid}`);
		}
  
		res.status(404).send('item not found');
	} catch (e) {
		res.status(500).send(e.message);
	}
});

// upload CSV files - POST METHOD
const csvFilesField: multer.Field[] = [{ name: 'contacts', maxCount: 1 }, { name: 'listings', maxCount: 1 }];
route.post('/upload/csv', uploadCSV.fields(csvFilesField), persistReport);
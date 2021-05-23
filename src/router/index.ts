/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import { uploadCSV } from '../middleware/upload';
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

// Extract data from CSV endpoint - POST METHOD
route.post('/extract/data/csv', uploadCSV);
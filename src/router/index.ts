/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';

/**
 * Router Definition
 */

export const routes = express.Router();

/**
 * Controller Definitions
 */

 
/**
 * Get report by report id
 * I made an assumption that it is good to keep an history of generated reports
 * Therefore I keep a record of every pair of listings.cv and contacts.cv uploaded
 * By storing them in a seperate table and then adding 
 * the report_id as a foreign key for each recored stored during the data extraction from csv
 */

routes.get('/report/:id', async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id, 10);
  
	try {
		// const item: Item = await ItemService.find(id);
  
		// if (item) {
		// 	return res.status(200).send(item);
		// }

		if(id) {
			return res.status(200).send(`${id}`);
		}
  
		res.status(404).send('item not found');
	} catch (e) {
		res.status(500).send(e.message);
	}
});

// Extract data from CSV endpoint - POST METHOD
routes.post('/extract/data/csv', async (req: Request, res: Response) => {
	try {
		// const item: BaseItem = req.body;
  
		// const newItem = await ItemService.create(item);
  
		// res.status(201).json(newItem);
	} catch (e) {
		res.status(500).send(e.message);
	}
});
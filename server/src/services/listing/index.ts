import * as fs from 'fs';
import * as csv from 'fast-csv';
import { ListingAttributes } from '../../interfaces/listing';
import Listing from '../../db/models/listing';
import {  v4 as uuid } from 'uuid';
import { NextFunction, Response } from 'express';
import { ReportModel } from '../../db/models/report';

export const persistListingsToDatabase = (report: ReportModel, listingsCSVPath: string, nextAction: NextFunction, res: Response): void => {
	const listings: ListingAttributes[] = [];
	fs.createReadStream(listingsCSVPath)
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => {
			throw error.message;
		})
		.on('data', async(row: ListingAttributes) => {
			if(row && row.price && row.seller_type && row.mileage && row.id && row.make) {
				listings.push({ ...row, report_uuid: report.uuid, uuid: await uuid() });
			}
		})
		.on('end', async () => {
			try {
				if(listings.length) {
					await Listing.bulkCreate(listings);
					nextAction();
				} else {
					report.destroy();
					res.status(401).send('Invalid listings format');
				}
			} catch(error) {
				console.log(error);
			}
		});	
};
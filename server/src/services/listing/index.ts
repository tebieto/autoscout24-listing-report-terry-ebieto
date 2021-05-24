import * as fs from 'fs';
import * as csv from 'fast-csv';
import { ListingAttributes } from '../../interfaces/listing';
import Listing from '../../db/models/listing';
import {  v4 as uuid } from 'uuid';
export const persistListingsToDatabase = (report_uuid: string | undefined, listingsCSVPath: string): void => {
	const listings: ListingAttributes[] = [];
	fs.createReadStream(listingsCSVPath)
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => {
			throw error.message;
		})
		.on('data', async(row: ListingAttributes) => {
			if(row && row.price && row.seller_type && row.mileage && row.id && row.make) {
				listings.push({ ...row, report_uuid, uuid: await uuid() });
			}
		})
		.on('end', () => {
			Listing.bulkCreate(listings);
		});	
};
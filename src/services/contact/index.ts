import { Request, Response } from 'express';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { ContactAttributes } from '../../interfaces/contact';
import { csvUploadPath, getAbsolutePath } from '../../utils';

export const uploadContactList = (req: Request, res: Response):void => {
	try {
		if (req.file == undefined) {
			res.status(400).send('Please upload a CSV file!');
		}
		const path = getAbsolutePath(csvUploadPath);

		const contactList: ContactAttributes[] = [];

		fs.createReadStream(path)
			.pipe(csv.parse({ headers: true }))
			.on('error', (error) => {
				throw error.message;
			})
			.on('data', (row) => {
				contactList.push(row);
			})
			.on('end', () => {
				console.log({ contactList });
			});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Could not upload the file: ' + req.file.originalname,
		});
	}
};
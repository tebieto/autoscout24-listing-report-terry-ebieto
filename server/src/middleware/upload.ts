import { Request } from 'express';
import  multer from 'multer';
import { csvUploadPath, getAbsolutePath } from '../utils';

const csvFilter = (req: Request, file:Express.Multer.File, cb: multer.FileFilterCallback) => {
	if (file.mimetype.includes('csv')) {
		cb(null, true);
	} else {
		cb(new Error('Only CSV files allowed'));
	}
};

const storage =  (filePath: string): multer.StorageEngine => multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, getAbsolutePath(filePath));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

export const uploadCSVWithMulter = multer({ storage: storage(csvUploadPath), fileFilter: csvFilter });
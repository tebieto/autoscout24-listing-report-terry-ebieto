import { Response, Request } from 'express';
import multer from 'multer';
import { csvUploadPath, getAbsolutePath } from '../utils'; 

const isCSV = (file: Express.Multer.File): boolean => {
	return file.mimetype.includes('csv') ? true : false;
};

const getFileName = (file: Express.Multer.File, timestamp: number): string => {
	return `${timestamp}-${file.originalname}`;
};

export const uploadFile = (req: Request, res: Response, filePath: string): void => {
	try {
		const timestamp = Date.now();
		const absolutePath = getAbsolutePath(filePath);
		const storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, absolutePath);
			},
			filename: function (req, file,  cb) {
				cb(null, getFileName(file, timestamp));
			}
		});
		
		const upload = multer({ storage: storage }).single('file');
	
		upload(req, res, function (err: multer.MulterError | string) {
			if (err instanceof multer.MulterError) { 
				return res.status(500).json(err);
			} else if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).send(`${filePath}/${getFileName(req.file, timestamp)}`);
		});
	} catch(error) {
		console.log(error);
	}
};

export const uploadCSV = (req: Request, res: Response): void => {
	console.log({ req, res });
	if(req.file && isCSV(req.file)) {
		uploadFile(req, res, csvUploadPath);
	} else  {
		const message = !req.file ? 'File not uploaded' : 'Only  CSV files allowed';
		res.status(400).send(message);
	}
};
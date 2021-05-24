export const csvUploadPath = '/uploads/csv';
import path from 'path';

export const getAbsolutePath = (filePath: string):string => {
	return path.join(__dirname, '../', filePath);
};
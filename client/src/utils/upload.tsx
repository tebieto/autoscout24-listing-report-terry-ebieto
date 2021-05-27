import { PostResponseProps, uploadCSVsProps } from '../interfaces';
import { postRequestAxios } from '../services';

export const uploadCSVs = async (files: uploadCSVsProps): Promise<PostResponseProps> => {
	const contactsCSV = files.contactsCSV as File;
	const listingsCSV = files.listingsCSV as File;
	const allowedType = 'text/csv';
	if(contactsCSV && contactsCSV.type === allowedType && listingsCSV && listingsCSV.type === allowedType) {
		const data = new FormData(); 
		data.append('contacts', contactsCSV);
		data.append('listings', listingsCSV);
		const path = 'api/upload/csv';
		return await postRequestAxios({ data, path });
	}
	throw new Error('Invalid File format discovered');
};
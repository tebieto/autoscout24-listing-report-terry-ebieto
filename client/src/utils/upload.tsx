import { PostResponseProps, uploadCSVsProps } from '../interfaces';
import { postRequestAxios } from '../services';

export const uploadCSVs = async (files: uploadCSVsProps): Promise<PostResponseProps> => {
	const { contactsCSV, listingsCSV } = files;
	const data = new FormData(); 
	data.append('contacts', contactsCSV);
	data.append('listings', listingsCSV);
	const path = 'api/upload/csv';
	return await postRequestAxios({ data, path });
};
import { PostResponseProps, uploadCSVsProps } from '../interfaces';
import { postRequestAxios } from '../services';

export const uploadCSVs = async (files: uploadCSVsProps): Promise<PostResponseProps> => {
	const { contactsCSV, listingsCSV } = files;
	const data = new FormData(); 
	data.append('file1', contactsCSV);
	data.append('file2', listingsCSV);
	const path = 'upload/image';
	return await postRequestAxios({ data, path });
};
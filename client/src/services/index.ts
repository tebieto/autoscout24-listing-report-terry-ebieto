import axios from 'axios';
import { PostRequestAxiosProps, PostResponseProps } from '../interfaces';
import { api } from '../utils';

export const postRequestAxios = async (props: PostRequestAxiosProps): Promise<PostResponseProps> => {
	const { data, path } = props;
	return axios.post(`${api}/${path}`, data, {})
		.then(res => res.data);
};
import { ChangeEvent } from 'react';

export interface uploadCSVsProps {
    contactsCSV: Blob | string, 
    listingsCSV: Blob | string
}

export interface PostRequestAxiosProps {
	data: FormData,
	path: string
}

export interface PostResponseData {
    id?: string
}

export interface PostResponseProps {
	data: PostResponseData
}

export interface HTMLInputEvent extends ChangeEvent {
    target: HTMLInputElement & EventTarget;
}
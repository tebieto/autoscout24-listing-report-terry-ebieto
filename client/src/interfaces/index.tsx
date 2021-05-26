import { ChangeEvent } from 'react';

export interface uploadCSVsProps {
    contactsCSV: File | null, 
    listingsCSV: File | null,
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
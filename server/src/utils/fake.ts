import { ContactAttributes } from '../interfaces/contact';
import { ListingAttributes } from '../interfaces/listing';
import { ReportAttributes } from '../interfaces/report';
export const fakeReport: ReportAttributes = {
	listings_csv_name: 'listings.csv',
	contacts_csv_name: 'contacts.csv',
	listings_csv_link: '/listings.csv',
	contacts_csv_link: '/contacts.csv'
};
export const fakeListing: ListingAttributes = {
	id: 1000,
	price: 49717,
	mileage: 6500,
	seller_type: 'private',
	make: 'Audi'
};

export const fakeContacts: ContactAttributes = {
	listing_id: 1215,
	contact_date: '1583574198000',
};
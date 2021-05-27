import Contact from '../db/models/contact';
import Listing from '../db/models/listing';
import Report from '../db/models/report';

export const syncModels = async (): Promise<void> => {
	await Report.sync();
	await Contact.sync();
	await Listing.sync();
};
/**
 * With this interface I'll create the report table to
 * generate report for every list.csv and contact.csv pair
 */

import { ListingModel } from '../../db/models/listing';
import { ContactAttributes } from '../contact';
import { ListingAttributes } from '../listing';

export interface ReportAttributes {
    uuid?: string;
    listings_csv_link: string;
    listings_csv_name: string;
    contacts_csv_link: string;
    contacts_csv_name: string;
    listings?: ListingAttributes[];
    contacts?: ContactAttributes[];
    avgListings?: ListingAttributes[]
}

export interface ContactedListingsCountObect {
    [fieldname: string]:number
}

export interface ContactedListingsWithCount {
    listing_id: number,
    count: string,
    listing: ListingModel,
}
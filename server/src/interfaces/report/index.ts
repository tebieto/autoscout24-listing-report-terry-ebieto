/**
 * With this interface I'll create the report table to
 * generate report for every list.csv and contact.csv pair
 */

import { ListingModel } from '../../db/models/listing';
import { ContactAttributes } from '../contact';
import { ListingAttributes } from '../listing';

export interface AverageListingSellingPricePerSellerType {
    seller_type: string;
    count: string | undefined; 
    avg_price: string;
}
export interface PercentageDistributionByMake{
    make: string;
    count: string;
    percentage: string;
}

export interface ReportAttributes {
    uuid?: string;
    listings_csv_link: string;
    listings_csv_name: string;
    contacts_csv_link: string;
    contacts_csv_name: string;
    listings?: ListingAttributes[];
    contacts?: ContactAttributes[];
    avgListings?: ListingAttributes[];
    avgListingSellingPricePerSellerType?: AverageListingSellingPricePerSellerType[];
    percentageDistributionByMake?: PercentageDistributionByMake[];
    topFiveMostcontactedListingsByMonth?: string;
    avgPriceOfTopThirtyMostContactedListings?: string;
}

export interface ModelCountType {
    [fieldname: string]:number;
}

export interface ContactedListingsWithCount {
    listing_id: number;
    count: string;
    listing: ListingModel;
}

export interface ListingSellerType {
    count?: string;
    seller_type: string;
    avg_price: string
}
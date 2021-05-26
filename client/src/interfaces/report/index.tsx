

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
    topFiveMostcontactedListingsByMonth: string;
    avgPriceOfTopThirtyMostContactedListings?: string;
    createdAt: string;
}

export interface ContactAttributes {
    uuid?: string;
    listing_id: number;
    contact_date: string;
    report_uuid?: string
}
export interface ListingAttributes {
    uuid?: string;
    id: number;
    make: string;
    price: number;
    formatted_price?: string;
    formatted_mileage?: string
    mileage: number;
    seller_type: string;
    report_uuid?: string;
    occurence?: number
}


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
/**
 * With the addition of report_id field, 
 * I can find all listings belonging to a report
 */

export interface ListingAttributes {
    uuid: string;
    id: number;
    make: string;
    price: number;
    mileage: number;
    seller_type: string;
    report_uuid: string
}
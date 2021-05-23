/**
 * With the addition of report_id field, 
 * I can find all listings belonging to a report
 */

export interface ContactAttributes {
    uuid?: string;
    listing_id: number;
    contact_date: Date;
    report_uuid?: string
}
/**
 * With this interface I'll create the report table to
 * generate report for every list.csv and contact.csv pair
 */

export interface ReportAttributes {
    uuid?: string;
    listings_csv_link: string;
    listings_csv_name: string;
    contacts_csv_link: string;
    contacts_csv_name: string;
}
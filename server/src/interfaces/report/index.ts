/**
 * With this interface I'll create the report table to
 * generate report for every list.csv and contact.csv pair
 */

export interface ReportAttributes {
    uuid: string;
    list_csv_link: string;
    list_csv_name: string;
    contact_csv_link: string;
    contact_csv_name: string;
}
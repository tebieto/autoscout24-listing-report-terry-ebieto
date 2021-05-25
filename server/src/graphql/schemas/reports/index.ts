import { gql } from 'apollo-server-express';

export const reportTypeDefs = gql`

    type Contact {
        uuid: String,
        listing_id: Int,
        contact_date: String,
        report_uuid: String,
        createdAt: String!,
        updatedAt: String!
    }
    type Listing {
        uuid: String,
        id: Int,
        make: String,
        price: Int,
        mileage: Int,
        seller_type: String,
        report_uuid: String,
        createdAt: String!,
        updatedAt: String!
    }
    type Report {
        uuid: String,
        listings_csv_link: String,
        listings_csv_name: String,
        contacts_csv_link: String,
        contacts_csv_name: String,
        listings: [Listing],
        avgListings:[Listing]
        contacts: [Contact],
        createdAt: String!,
        updatedAt: String!
    }
    
    type Query {
        reports: [Report],
        report(uuid: String): Report
    }
`;
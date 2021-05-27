import { gql } from 'apollo-server-express';

export const reportTypeDefs = gql`
    type AverageListingSellingPricePerSellerType {
        seller_type: String,
        count: String, 
        avg_price: String
    }
    type PercentageDistributionByMake{
        make: String,
        count: String,
        percentage: String
    }
    type Listing {
        id: Int,
        make: String,
        price: Int,
        formatted_price: String,
        formatted_mileage: String
        mileage: Int,
        seller_type: String,
        report_uuid: String,
        occurence: Int
    }
    type Report {
        uuid: String,
        listings_csv_link: String,
        listings_csv_name: String,
        contacts_csv_link: String,
        contacts_csv_name: String,
        avgListingSellingPricePerSellerType: [AverageListingSellingPricePerSellerType],
        percentageDistributionByMake: [PercentageDistributionByMake],
        topFiveMostcontactedListingsByMonth: String,
        avgPriceOfTopThirtyMostContactedListings: String
        createdAt: String!,
        updatedAt: String!
    }
    
    type Query {
        reports: [Report],
        report(uuid: String!): Report
    }
`;
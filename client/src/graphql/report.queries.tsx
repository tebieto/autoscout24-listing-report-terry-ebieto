import { gql } from '@apollo/client';

export const REPORTS = gql`
    query Reports {
        reports {
            uuid,
            listings_csv_link,
            listings_csv_name,
            contacts_csv_link,
            contacts_csv_name,
            createdAt
        }
    }
`;

export const REPORT = gql`
    query Report($uuid: String!) {
        report(uuid: $uuid) {
            uuid,
            percentageDistributionByMake {
                make, count, percentage
            },
            topFiveMostcontactedListingsByMonth,
            avgPriceOfMostContactedListings,
            avgListingSellingPricePerSellerType{
                seller_type,
                count,
                avg_price
            },
            createdAt
        }
    }
`;
import styled from 'styled-components';

export const ReportsStylesContainer = styled.div`
    margin: 50px 0;
    table {
        width: 100%;
        th, td {
            text-align: left;
        }
        th:last-child, td:last-child {
            text-align: center;
        }
    }
    @media screen and (max-width: 800px) {
     margin: 50px 20px;
     max-width: 100%;
     overflow: auto;
     button {
         font-size: 10px;
     }
    }
`;
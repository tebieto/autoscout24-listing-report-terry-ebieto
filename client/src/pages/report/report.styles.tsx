import styled from 'styled-components';

export const ReportStylesContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 50px 0;

    @media screen and (max-width: 800px) {
       display: block;
    }
    
    table {
        width: 100%;
        th, td {
            text-align: left;
        }
        font-size: 20px;
        margin: 30px;
        @media screen and (max-width: 800px) {
           margin: 30px 0;
        }
    }

    @media screen and (max-width: 800px) {
        max-width: 100vh;
        overflow: auto;
        margin: 20px;
    }
    
`;

export const PageNotFound = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
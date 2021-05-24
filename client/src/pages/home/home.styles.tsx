import styled from 'styled-components';

export const HomeContainer = styled.div`
    table {
        width: 100%;
        th, td {
            text-align: left;
        }
        th:last-child, td:last-child {
            text-align: center;
        }
    }
    button {
        background-color: yellow;
        font-size: 20px;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        box-shadow: 1px 1px 2px 1px #ddd;
        border-radius: 10px;
        cursor: pointer;
    }
`;
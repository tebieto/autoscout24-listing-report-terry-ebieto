import styled from 'styled-components';

export const UploadStylesContainer = styled.div`
    margin: 50px 0;
    fieldset {
        margin: 20px 0;
        font-size: 18px;
        font-weight: bold;

        input {
            font-size: 15px;
        }
    }
    @media screen and (max-width: 800px) {
        margin: 50px 20px;
    }
`;
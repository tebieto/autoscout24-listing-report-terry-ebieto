import styled from 'styled-components';

export const HeaderContainer = styled.div`
    background-color: white;
    position: relative;
    top: 0;
    left: 0;
    padding: 10px  30px;
    display: flex;
    align-items: center;
    a:link, a:visited {
        text-decoration: none;
        color: inherit;
    }
    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        margin-right: 10px;
    }
`;

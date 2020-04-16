import styled from "styled-components";

const SearchPaginationContainer = styled.div`
    margin-bottom: 32px;

    button {
        height: 46px;
        width: 100%;
        padding: 10px;
        margin-top: 12px;
        background: #ffffff;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        font-weight: bold;
        color: #547862;
        cursor: pointer;

        .anticon-spin {
            fill: #547862;
        }
    }

    @media (min-width: 1120px) {
        button {
            margin-bottom: 64px;
        }
    }
`;

export default SearchPaginationContainer;
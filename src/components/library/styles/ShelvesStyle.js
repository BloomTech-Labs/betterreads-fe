import styled from "styled-components";

const ShelvesContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 64px;

    .shelves {
        h1 {
            width: 90%;
            margin: 0 auto;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 2rem;
            font-weight: bold;
            color: #3b403d;
        }
    }

    @media(min-width: 1120px) {
        width: 1120px;
        display: flex;
        justify-content: space-between;

        .shelves {
            width: 687px;
            margin: 0;

            h1 {
                width: 687px;
            }
        }
    }
`;

export default ShelvesContainer;
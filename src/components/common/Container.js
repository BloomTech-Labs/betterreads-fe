import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media(min-width: 1120px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export default Container;
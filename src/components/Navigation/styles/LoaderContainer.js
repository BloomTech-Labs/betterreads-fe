import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 25vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin-top: 16px;
    font-size: 1rem;
    font-family: 'Open Sans', sans-serif;
    color: #4e4c4a;
  }

  @media (min-width: 1120px) {
    width: 687px;
    margin: 0;
  }
`;

export default LoaderContainer;

import styled from "styled-components";

const ResultCount = styled.div`
  background-color: rgba(217, 217, 217, 0.5);
  .openSans {
    font-family: 'Open Sans', sans-serif;
  }
  .fs-16 {
    font-size: 16px;
  }
  .lh-40 {
    line-height: 40px;
  }

  .fw-bold {
    font-weight: bold;
  }
  .innerWrapper {
    width: 90%;
    margin: 0 auto;
  }
  @media (min-width: 1120px) {
    .innerWrapper {
      width: 1120px;
    }
  }
`;

export default ResultCount;
import styled from 'styled-components';

const Wrapper = styled.div`
  .fs-16 {
    font-size: 16px;
  }

  .openSans {
    font-family: 'Open Sans', sans-serif;
  }

  .lh-40 {
    line-height: 40px;
  }

  .ant-breadcrumb {
    width: 90%;
    margin: 0 auto;

    .ant-breadcrumb-link {
      cursor: pointer;
    }
  }

  @media (min-width: 1120px) {
    .ant-breadcrumb {
      width: 1120px;
    }
  }
`;

export default Wrapper;

import styled from 'styled-components';

const HeaderContainer = styled.div`
  .header {
    max-width: 1120px;
    height: 72px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin-bottom: 0;
      font-family: 'Open Sans', sans-serif;
      font-size: 1.375rem;
      font-weight: bold;
      color: #5c7c69;
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        margin-right: 8px;
      }
    }

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      cursor: pointer;
    }

    .default-profile-icon {
      height: 40px;
      width: 40px;
      background-color: #7e8d88;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      i {
        font-size: 1.25rem;
        color: white;
      }
    }
  }
`;

export default HeaderContainer
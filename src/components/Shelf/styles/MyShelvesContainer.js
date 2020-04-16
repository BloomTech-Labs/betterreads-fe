import styled from 'styled-components';

const MyShelvesContainer = styled.div`
  max-width: 1120px;
  width: 90%;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 32px;
  display: ${(props) => (props.source === 'library' ? '' : 'none')};

  h2 {
    margin-bottom: 0;
    font-family: 'Frank Ruhl Libre', sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    color: #547862;
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      margin-left: 8px;
      font-size: 1rem;
      transition: 0.25s;
    }

    :hover {
      i {
        margin-left: 16px;
      }
    }
  }

  .create-shelves {
    margin-bottom: 16px;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    color: #5c5a57;
  }

  .create-new-shelf-button {
    width: 100%;
    margin-bottom: 16px;
    padding: 10px 0;
    background-color: #ffffff;
    border: 1px solid #d24719;
    border-radius: 4px;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #d24719;
    cursor: pointer;
    transition: 0.25s;

    :hover {
      background-color: #d24719;
      color: #ffffff;
    }
  }

  .shelves-container {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .shelf {
      height: 42.75vw;
      width: 47.5%;
      margin-bottom: 4.5vw;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;

      .shelf-name {
        margin-bottom: 0;
        padding: 10px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #4e4c4a;
      }

      .thumbnails {
        margin: 0 auto;
        display: flex;

        img {
          height: 64px;
          width: 44px;
          margin-right: 8px;
          border-radius: 2px;
        }

        img:last-child {
          margin-right: 0;
        }
      }

      svg {
        margin: 0 auto;
      }

      .shelf-quantity {
        margin-bottom: 0;
        padding: 10px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #4e4c4a;
      }
    }

    .view-all-my-shelves {
      margin-bottom: 0;
      font-family: 'Open Sans', sans-serif;
      color: #5c5a57;
      cursor: pointer;
      transition: 0.25s;

      :hover {
        opacity: 0.5;
      }
    }
  }

  @media (min-width: 1120px) {
    width: 216px;
    margin: 0;
    padding-top: ${(props) => (props.source === 'shelf' ? '0' : '16px')};
    display: block;

    .shelves-container {
      margin-bottom: 0;
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: nowrap;

      .shelf {
        height: 162px;
        width: 162px;
        margin-bottom: 16px;
      }
    }
  }
`;

export default MyShelvesContainer;
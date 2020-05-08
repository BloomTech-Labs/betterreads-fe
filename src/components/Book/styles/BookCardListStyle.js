import styled from 'styled-components';

const BookCardListContainer = styled.div`
  width: 90%;
  margin: 0 auto;

  .shelf-name {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin-bottom: 0;
      font-family: 'Frank Ruhl Libre', sans-serif;
      font-size: 2rem;
      font-weight: bold;
      color: #3b403d;
      display: flex;
      align-items: center;
      cursor: pointer;

      i {
        margin-left: 8px;
      }
    }

    i {
      font-size: 1rem;
      color: #3b403d;
      cursor: pointer;
    }

    form {
      input {
        width: 687px;
        font-family: 'Frank Ruhl Libre', sans-serif;
        font-size: 2rem;
        font-weight: bold;
        color: #3b403d;
        border: none;
        outline: none;
      }
    }
  }

  @media (min-width: 1120px) {
    width: 687px;
    margin: 0;

    .book-card-list {
      display: flex;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
    }
  }
`;

export default BookCardListContainer;

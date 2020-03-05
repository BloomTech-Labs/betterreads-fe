import React from 'react';
import BookIcon from './BookIcon';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 140px;
    width: 47.5%;
    margin-bottom: 4.5vw;

    border: 1px solid #d9d9d9;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    font-family: 'Open Sans', sans-serif;
    
    .shelf-name {
        margin-bottom: 0;
        padding: 9px;
        border-bottom: 1px solid #d9d9d9;    
        font-size: .9rem;
        font-weight: 600;
        color: #4e4c4a;
        line-height: 18px;
    }

    svg {
        margin: 0 auto;
    }

    .shelf-quantity {
        margin-bottom: 0;
        padding: 8px;
        font-size: 1.125rem;
        font-weight: bold;
        color: #4e4c4a;
        line-height: 22px;
    }

    @media (min-width: 1120px) {
        margin-bottom: 1rem;
        width: 162px;
    }
    
`;

const Shelf = (props) => {
    return (
        <Wrapper onClick={() => props.history.push(props.link)}>
                <p className="shelf-name">{props.name}</p>
                <BookIcon height="40px" width="40px" fill="#D9D9D9" />
                {
                    props.count < 0 ? (
                        <p className="shelf-quantity">1 book</p>
                    ) : (
                        <p className="shelf-quantity">
                            {props.count} books
                        </p>
                    )
                }
        </Wrapper>
    )
}

export default Shelf;
import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoaderContainer = styled.div`
    width: 90%;
    margin: auto;
    height: 25vh;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    & > div {
        font-size: 1.5rem;
        font-family: 'Frank Ruhl Libre', sans-serif;
    }

    @media(min-width: 1120px) {
        width: 687px;
        margin: 0;
    }
`;


const Loader = (props) => {
    const antIcon = <LoadingOutlined style={{ fontSize: props.size || '24px', color: props.color || '#547862' }} spin />;

    return (
        <LoaderContainer size={props.size}>
            <Spin indicator={antIcon} />
            <div>{props.message || 'Loading, please wait.'}</div>
        </LoaderContainer>
    )
}

export default Loader;
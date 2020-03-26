import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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

    @media(min-width: 1120px) {
        width: 687px;
        margin: 0;
    }
`;


const Loader = (props) => {
    const antIcon = <LoadingOutlined style={{ fontSize: props.size || '32px', color: props.color || '#547862' }} spin />;

    return (
        <LoaderContainer size={props.size}>
            <Spin indicator={antIcon} />
            <div>{props.message || 'Loading, please wait.'}</div>
        </LoaderContainer>
    )
}

export default Loader;

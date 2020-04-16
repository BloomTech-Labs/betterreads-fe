import React from 'react';
// Ant Design
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// Components
import LoaderContainer from './styles/LoaderContainer';

const Loader = (props) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: props.size || '32px',
        color: props.color || '#547862',
      }}
      spin
    />
  );

  return (
    <LoaderContainer size={props.size}>
      <Spin indicator={antIcon} />
      <div>{props.message || 'Loading, please wait.'}</div>
    </LoaderContainer>
  );
};

export default Loader;

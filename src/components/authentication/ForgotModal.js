import React from 'react';
import { Modal, Button } from 'antd';

const ForgotModal = (props) => {
  return (
    <Modal
      title={'Enter your email address'}
      visible={props.visible}
      onOk={console.log('OK')}
      onCancel={console.log('Cancel')}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ForgotModal;

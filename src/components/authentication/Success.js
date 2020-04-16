import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { successRedirect } from '../../store/actions/authenticationActions';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PageView, Event } from '../../utils/tracking';

import SuccessContainer from './styles/SuccessStyle';

const Success = (props) => {
  useEffect(() => {
    props.successRedirect(props.history);
    Event('SIGN IN', 'Successful sign in', 'SIGN_IN');
    PageView();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <SuccessContainer>
      <Spin indicator={antIcon} />
    </SuccessContainer>
  );
};

export default connect(null, { successRedirect })(Success);

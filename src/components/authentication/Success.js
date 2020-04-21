//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import { successRedirect } from '../../store/actions/authenticationActions';
//Ant Design
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// Utils
import history from '../../utils/history';
import { PageView, Event } from '../../utils/tracking';
// Styled Components
import SuccessContainer from './styles/SuccessStyle';

const Success = (props) => {
  useEffect(() => {
    props.successRedirect(history);
    Event('SIGN IN', 'Successful sign in', 'SIGN_IN');
    PageView();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <SuccessContainer data-testid='success-container'>
      <Spin indicator={antIcon} data-testid='success-spinner'/>
    </SuccessContainer>
  );
};

export default connect(null, { successRedirect })(Success);

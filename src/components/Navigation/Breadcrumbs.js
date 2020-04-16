import React from 'react';
// Styled Components
import Wrapper from './styles/Wrapper';
// Ant Design
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
// Utils
import { Event } from '../../utils/tracking';
import history from '../../utils/history';
// React Router
import { withRouter } from 'react-router-dom';

const Breadcrumbs = (props) => {
  return (
    <Wrapper>
      <Breadcrumb className='fs-16 openSans lh-40'>
        <Breadcrumb.Item onClick={() => history.push('/')}>
          <HomeOutlined /> Library
        </Breadcrumb.Item>
        {props.crumbs &&
          props.crumbs.map((crumb, index) => (
            <Breadcrumb.Item
              key={index}
              onClick={() =>
                crumb.path
                  ? (history.push(`${crumb.path}`),
                    Event(
                      'BREADCRUMBS',
                      'User clicked on the breadcrumb link',
                      'BREADCRUMBS'
                    ))
                  : null
              }
            >
              {crumb.label}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </Wrapper>
  );
};

export default withRouter(Breadcrumbs);

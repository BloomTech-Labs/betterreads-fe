import React from 'react';
// Redux Imports
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authenticationActions';
// Router
// import { withRouter } from 'react-router-dom';
// Ant Design
import { Menu, Dropdown } from 'antd';
// Utils Import
import { Event } from '../../utils/tracking';
import history from '../../utils/history';
import { user } from '../../utils/helpers';
// Styled Components
import HeaderContainer from './styles/HeaderContainer';
import BookIcon from '../Book/BookIcon';

const Header = (props) => {
  const dropdown = (
    <Menu data-testid='drop-menu'>
      <Menu.Item>
        <a
          href='https://github.com/Lambda-School-Labs/betterreads-fe/issues'
          target='_blank'
          rel='noopener noreferrer'
          data-testid='github-opt'
          onClick={Event(
            'REPORT_A_BUG',
            'User went to git hub to report a Bug',
            'HEADER'
          )}
        >
          Report a bug
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href='/signin'
          data-testid='signout-opt'
          onClick={() => {
            props.signOut(history);
            Event('SIGN_OUT', 'User signed out', 'HEADER');
          }}
        >
          Sign out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer>
      <div className='header'>
        <h1 onClick={() => history.push('/home')} data-testid='h1-route'>
          <BookIcon height='24px' width='24px' fill='#547862' />
          Readrr
        </h1>

        {(!localStorage.getItem('image') ||
          localStorage.getItem('image') === 'null' ||
          localStorage.getItem('image') === 'undefined') && (
          <Dropdown overlay={dropdown} trigger={['click']}>
            <div
              className='default-profile-icon ant-dropdown-link'
              data-testid='drop-down-toggle'
            >
              <i className='fas fa-user'></i>
            </div>
          </Dropdown>
        )}
        {localStorage.getItem('image') &&
          localStorage.getItem('image') !== 'null' &&
          localStorage.getItem('image') !== 'undefined' && (
            <Dropdown overlay={dropdown} trigger={['click']}>
              <img
                className='ant-dropdown-link'
                src={localStorage.getItem('image')}
                alt='profile icon'
                data-testid='drop-down-toggle'
              />
            </Dropdown>
          )}
      </div>
    </HeaderContainer>
  );
};

export default connect(null, { signOut })(Header);

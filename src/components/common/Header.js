import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authenticationActions';
import styled from 'styled-components';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const HeaderContainer = styled.div`
	.header {
		max-width: 1120px;
		height: 72px;
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1 {
			margin-bottom: 0;
			font-family: 'Open Sans', sans-serif;
			font-size: 1.375rem;
			font-weight: bold;
			color: #5c7c69;
			cursor: pointer;
		}

		img {
			height: 40px;
			width: 40px;
			border-radius: 50%;
			cursor: pointer;
		}

		.default-profile-icon {
			height: 40px;
			width: 40px;
			background-color: #7e8d88;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			i {
				font-size: 1.25rem;
				color: white;
			}
		}
	}
`;

const Header = props => {
	const dropdown = (
		<Menu>
			<Menu.Item>
				<a onClick={() => props.signOut(props.history)}>Sign out</a>
			</Menu.Item>
		</Menu>
	);

	return (
		<HeaderContainer>
			<div className='header'>
				<h1 onClick={() => props.history.push('/')}>Readrr</h1>

				{(!localStorage.getItem('image') || localStorage.getItem('image') === 'null') && (
					<Dropdown overlay={dropdown} trigger={['click']} >
						<div className='default-profile-icon ant-dropdown-link'>
							<i className='fas fa-user'></i>
						</div>
					</Dropdown>
				)}

				{localStorage.getItem('image') && localStorage.getItem('image') !== 'null' && (
					<Dropdown overlay={dropdown} trigger={['click']} >
						<img className='ant-dropdown-link' src={localStorage.getItem('image')} alt="profile icon" />
					</Dropdown>
				)}
			</div>
		</HeaderContainer>
	);
};

export default connect(null, { signOut })(Header);

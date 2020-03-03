import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions';
import styled from 'styled-components';

const HeaderContainer = styled.div`
	.header {
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
			line-height: 34px;
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
	return (
		<HeaderContainer>
			<div className="header">
				<h1 onClick={() => props.history.push('/')}>BetterReads</h1>

				{(!localStorage.getItem('image') ||
					localStorage.getItem('image') === 'null') && (
					<div
						className="default-profile-icon"
						onClick={() => props.signOut(props.history)}
					>
						<i className="fas fa-user"></i>
					</div>
				)}

				{localStorage.getItem('image') &&
					localStorage.getItem('image') !== 'null' && (
						<img
							src={localStorage.getItem('image')}
							alt="profile icon"
							onClick={() => props.signOut(props.history)}
						/>
					)}
			</div>
		</HeaderContainer>
	);
};

export default connect(null, { signOut })(Header);

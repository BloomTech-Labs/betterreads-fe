import React from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Event } from '../../utils/tracking';

const Wrapper = styled.div`
	.fs-16 {
		font-size: 16px;
	}

	.openSans {
		font-family: 'Open Sans', sans-serif;
	}

	.lh-40 {
		line-height: 40px;
	}

	.ant-breadcrumb {
		width: 90%;
		margin: 0 auto;

		.ant-breadcrumb-link {
			cursor: pointer;
		}
	}

	@media (min-width: 1120px) {
		.ant-breadcrumb {
			width: 1120px;
		}
	}
`;

const Breadcrumbs = props => {
	return (
		<Wrapper>
			<Breadcrumb className="fs-16 openSans lh-40">
				<Breadcrumb.Item onClick={() => props.history.push('/')} >
					<HomeOutlined /> Library
				</Breadcrumb.Item>
				{props.crumbs && props.crumbs.map((crumb, index) => (
					<Breadcrumb.Item key={index} onClick={() => (crumb.path ? (props.history.push(`${crumb.path}`), Event('BREADCRUMBS', 'User clicked on the breadcrumb link', 'BREADCRUMBS')) : null)}>
						{crumb.label}
					</Breadcrumb.Item>
				))}
			</Breadcrumb>
		</Wrapper>
	);
};

export default Breadcrumbs;

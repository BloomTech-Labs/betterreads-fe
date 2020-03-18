import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { successRedirect } from '../../actions/authenticationActions';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SuccessContainer = styled.div`
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.anticon-spin {
		fill: #547862;
	}
`;

const Success = props => {
	useEffect(() => {
		props.successRedirect(props.history);
	}, []);

	const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

	return (
		<SuccessContainer>
			<Spin indicator={antIcon} />
		</SuccessContainer>
	);
};

export default connect(null, { successRedirect })(Success);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { successRedirect } from '../../actions/index';
import styled from 'styled-components';

const SuccessContainer = styled.div`
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Success = props => {
	useEffect(() => {
		props.successRedirect(props.history);
	}, []);

	return (
		<SuccessContainer>
			{/* loading wheel icon should go here */}
			<p>Loading...</p>
		</SuccessContainer>
	);
};

export default connect(null, { successRedirect })(Success);

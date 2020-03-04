import React from 'react';
import styled from 'styled-components';

const ResultCount = styled.div`
	background-color: rgba(217, 217, 217, 0.5);

	.openSans {
		font-family: 'Open Sans', sans-serif;
	}
	.fs-16 {
		font-size: 16px;
	}
	.lh-40 {
		line-height: 40px;
	}
	.fw-bold {
		font-weight: bold;
	}

	.innerWrapper {
		width: 90%;
		margin: 0 auto;
	}
`;

const ShelfNote = props => {
	return (
		<>
			{props.type === 'search' && props.query.length && (
				<ResultCount>
					<div className="innerWrapper fs-16 lh-40 openSans">
						{props.count} results for "{props.query}"
					</div>
				</ResultCount>
			)}
			{props.type === 'allbooks' && props.count && (
				<ResultCount>
					{props.count === 1 ? (
						<div className="innerWrapper fs-16 fw-bold lh-40 openSans">
							You have 1 book
						</div>
					) : (
						<div className="innerWrapper fs-16 fw-bold lh-40 openSans">
							You have {props.count} books
						</div>
					)}
				</ResultCount>
			)}
		</>
	);
};

export default ShelfNote;

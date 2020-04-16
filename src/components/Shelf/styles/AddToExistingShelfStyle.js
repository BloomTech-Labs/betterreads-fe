import styled from "styled-components";

const ShelfContainer = styled.div`
	.ant-collapse {
		background-color: transparent;

		.ant-collapse-item{border-bottom: none;}
		.ant-collapse-header {
			font-size: 1rem;
			font-family: 'Frank Ruhl Libre', sans-serif;
			font-weight: 700;
			padding: 12px 0 !important;
			color: #4E4C4A;
		}

		.ant-collapse-content-box {
			padding: 0;

			.ant-checkbox-wrapper{
				display: block;
				margin: 8px 0 !important;
			}
		}
	}
`;

export default ShelfContainer;
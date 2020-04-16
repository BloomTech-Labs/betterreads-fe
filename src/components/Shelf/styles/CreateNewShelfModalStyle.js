import styled from "styled-components";

const CreateNewShelfModalContainer = styled.div`
	button {
        width: 100%;
        margin-bottom: 16px;
        padding: 8px 0;
        background-color: #ffffff;
        border: 1px solid #d24719;
        border-radius: 4px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        color: #d24719;
        cursor: pointer;
        transition: 0.25s;

        :hover {
            background-color: #d24719;
            color: #ffffff;
        }
	}

	.link {
		padding-left: 4px;
		margin-bottom: 16px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        color: #d24719;
        cursor: pointer;
        transition: 0.25s;
	}
	
	@media(min-width: 1120px) {
		button {
            width: 162px;
        }
	}
`;

export default CreateNewShelfModalContainer;
import styled from "styled-components";

const Wrapper = styled.div`
    background-color: #f3f6f5;
    padding: 16px 0;
    
    .innerWrapper {
        width: 90%;
        margin: auto;

        .ant-btn-primary {
            background-color: #d24719;
            border-color: #d24719;
        }    
    }

    @media (min-width: 1120px) {
        .innerWrapper {
            width: 1120px;
        }
        .innerWrapper .ant-input-search{
            width: 400px;
        }
    }
`;

export default Wrapper;

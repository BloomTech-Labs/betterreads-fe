import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUserShelf } from '../../actions/libraryActions';
import styled from 'styled-components';
import { Modal, Input, Checkbox } from 'antd';

const CreateNewShelfContainer = styled.div`
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
	
	@media(min-width: 1120px) {
		button {
            width: 162px;
        }
	}
`;

const CreateNewShelf = props => {
    const [modal, setModal] = useState({
        visible: false,
        confirmLoading: false,
        name: '',
        isPrivate: false
    });

	const showModal = () => {
		setModal({
			...modal,
			visible: true
		});
	};

	const handleChange = event => {
		setModal({
			...modal,
			name: event.target.value
		});
	};

	const handleCheck = event => {
		setModal({
			...modal,
			isPrivate: event.target.checked
		});
	};

	const handleOk = () => {
		console.log(modal);
		setModal({
			...modal,
			confirmLoading: true
		});
		props.createUserShelf(modal.name, modal.isPrivate)
			.then(response => {
				setModal({
					visible: false,
					confirmLoading: false,
					name: '',
					isPrivate: false
				});
				props.history.push('/shelves');
				console.log(response);
			})
			.catch(error => console.log(error));
	};

	const handleCancel = () => {
		setModal({
			visible: false,
			confirmLoading: false,
			name: '',
			isPrivate: false
		});
	};
  
    return (
        <CreateNewShelfContainer>
			<button onClick={showModal}>Create new shelf</button>

			<Modal title='Create new shelf' visible={modal.visible} onOk={handleOk} onCancel={handleCancel}>
				<Input size='large' placeholder='Enter shelf name' value={modal.name} onChange={handleChange} />
				<Checkbox checked={modal.isPrivate} onChange={handleCheck}>Private</Checkbox>
			</Modal>
		</CreateNewShelfContainer>
	);
};

export default connect(null, { createUserShelf })(CreateNewShelf);
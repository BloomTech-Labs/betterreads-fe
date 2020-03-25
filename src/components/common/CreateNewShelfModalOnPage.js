import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUserShelf } from '../../actions/libraryActions';
import styled from 'styled-components';
import { Modal, Input, Checkbox } from 'antd';

const CreateNewShelfModalContainer = styled.div`
	p {
        width: 100%;
        margin-bottom: 16px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        color: #d24719;
        cursor: pointer;
        transition: 0.25s;

	}
	
	@media(min-width: 1120px) {
		p {
            width: 162px;
        }
	}
`;

const CreateNewShelfModal = props => {
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
				props.history.push('/myshelves');
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
        <CreateNewShelfModalContainer>
			<p onClick={showModal}> + Create new shelf</p>

			<Modal title='Create new shelf' visible={modal.visible} onOk={handleOk} onCancel={handleCancel}>
				<Input size='large' placeholder='Enter shelf name' value={modal.name} onChange={handleChange} />
				<Checkbox checked={modal.isPrivate} onChange={handleCheck}>Private</Checkbox>
			</Modal>
		</CreateNewShelfModalContainer>
	);
};

export default connect(null, { createUserShelf })(CreateNewShelfModal);
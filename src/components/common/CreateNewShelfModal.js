import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUserShelf, fetchUsersShelves, getBooksOnShelves } from '../../actions';
import styled from 'styled-components';
import { Modal, Input } from 'antd';
import { Event } from '../../utils/tracking';

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

const CreateNewShelfModal = props => {
    const [modal, setModal] = useState({
        visible: false,
        confirmLoading: false,
        name: '',
        isPrivate: null
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

	// const handleCheck = event => {
	// 	setModal({
	// 		...modal,
	// 		isPrivate: event.target.checked
	// 	});
	// };

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
					isPrivate: null
				});
				Event('CUSTOM_SHELF', 'A custom shelf was created', 'CREATE_NEW_SHELF_MODAL');
				props.fetchUsersShelves();
				props.getBooksOnShelves();
				props.history.push('/myshelves');
			})
			.catch(error => console.log(error));
	};

	const handleCancel = () => {
		setModal({
			visible: false,
			confirmLoading: false,
			name: '',
			isPrivate: null
		});
	};
  
    return (
        <CreateNewShelfModalContainer>
			{props.button ? <button onClick={showModal}>Create new shelf</button> : <p className='link' onClick={showModal}>+ Create new shelf</p>}

			<Modal title='Create new shelf' visible={modal.visible} onOk={handleOk} onCancel={handleCancel}>
				<Input size='large' placeholder='Enter shelf name' value={modal.name} onChange={handleChange} onPressEnter={handleOk}/>
				{/* <Checkbox checked={modal.isPrivate} onChange={handleCheck}>Private</Checkbox> */}
			</Modal>
		</CreateNewShelfModalContainer>
	);
};

export default connect(null, { createUserShelf, fetchUsersShelves, getBooksOnShelves })(CreateNewShelfModal);
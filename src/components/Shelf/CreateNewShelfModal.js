//Import React
import React, { useState } from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  createUserShelf,
  fetchUsersShelves,
  getBooksOnShelves,
} from '../../store/actions';
//Styling
import { Modal, Input } from 'antd';
import CreateNewShelfModalContainer from './styles/CreateNewShelfModalStyle';
//Utils
import { Event } from '../../utils/tracking';
import history from '../../utils/history';

const CreateNewShelfModal = (props) => {
  const [modal, setModal] = useState({
    visible: false,
    confirmLoading: false,
    name: '',
    isPrivate: null,
  });

  const showModal = () => {
    setModal({
      ...modal,
      visible: true,
    });
  };

  const handleChange = (event) => {
    setModal({
      ...modal,
      name: event.target.value,
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
      confirmLoading: true,
    });
    props
      .createUserShelf(modal.name, modal.isPrivate)
      .then((response) => {
        console.log(response);
        setModal({
          visible: false,
          confirmLoading: false,
          name: '',
          isPrivate: null,
        });
        Event(
          'CUSTOM_SHELF',
          'A custom shelf was created',
          'CREATE_NEW_SHELF_MODAL'
        );
        props.fetchUsersShelves();
        props.getBooksOnShelves();
        history.push('/myshelves');
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setModal({
      visible: false,
      confirmLoading: false,
      name: '',
      isPrivate: null,
    });
  };

  return (
    <CreateNewShelfModalContainer>
      {props.button ? (
        <button onClick={showModal}>Create new shelf</button>
      ) : (
        <p className='link' onClick={showModal}>
          + Create new shelf
        </p>
      )}

      <Modal
        title='Create new shelf'
        visible={modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          size='large'
          placeholder='Enter shelf name'
          value={modal.name}
          onChange={handleChange}
          onPressEnter={handleOk}
        />
        {/* <Checkbox checked={modal.isPrivate} onChange={handleCheck}>Private</Checkbox> */}
      </Modal>
    </CreateNewShelfModalContainer>
  );
};

export default connect(null, {
  createUserShelf,
  fetchUsersShelves,
  getBooksOnShelves,
})(CreateNewShelfModal);

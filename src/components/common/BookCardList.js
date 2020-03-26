import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editShelfName, deleteShelf } from '../../actions';
import BookCard from './BookCard';
import SearchPagination from '../search/SearchPagination';
import styled from 'styled-components';
import { Menu, Dropdown, Popconfirm, message } from 'antd';

const BookCardListContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    .shelf-name {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            margin-bottom: 0;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 2rem;
            font-weight: bold;
            color: #3b403d;
            display: flex;
            align-items: center;
            cursor: pointer;
    
            i {
                margin-left: 8px;
            }
        }

        i {
            font-size: 1rem;
            color: #3b403d;
            // color: #d9d9d9;
            cursor: pointer;
        }
    
        form {
            input {
                width: 687px;
                font-family: 'Frank Ruhl Libre', sans-serif;
                font-size: 2rem;
                font-weight: bold;
                color: #3b403d;
                border: none;
                outline: none;
            }
        }
    }

    @media(min-width: 1120px) {
        width: 687px;
        margin: 0;

        .book-card-list {
            display: flex;
            justify-content: space-between;
            align-content: flex-start;
            flex-wrap: wrap;
        }
    }
`;

const BookCardList = props => {
    const [shelfName, setShelfName] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => setShelfName(props.label), [props.label]);

    const onChange = event => {
        setShelfName(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        props.editShelfName(props.currentShelf.id, shelfName);
        setEditing(false);
    };

    const confirm = event => {
        props.deleteShelf(props.currentShelf.id, props.history)
        message.success('Successfully deleted shelf');
    };

    const cancel = event => {
        message.error('Cancelled');
    };

    const dropdown = (
        <Menu>
            <Menu.Item>
                <Popconfirm title='Are you sure you want to delete this shelf?' onConfirm={confirm} onCancel={cancel} okText='Yes' cancelText='No'>
                    <a href='#'><i className='fas fa-trash' style={{ marginRight: '4px', color: '#3b403d' }}></i>Delete</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <BookCardListContainer>
                {props.label && props.label !== 'My books' && props.label !== 'Favorites' && props.label !== 'To be read' && props.label !== 'In progress' && props.label !== 'Finished' &&
                    <div className='shelf-name'>
                        {editing ? (
                            <form onSubmit={onSubmit} onBlur={onSubmit} autoComplete='off' spellCheck='false'>
                                <input type='text' value={shelfName} onChange={onChange} autoFocus/>
                            </form>
                        ) : (
                            <>
                                <h2 onClick={() => setEditing(true)} title='Edit'>{shelfName}<i className='fas fa-pen' onClick={() => setEditing(true)}></i></h2>
                                <Dropdown overlay={dropdown} trigger={['click']}>
                                    <i className='fas fa-ellipsis-h' title='Options'></i>
                                </Dropdown>
                            </>
                        )}
                    </div>
                }
                {props.label && props.label === 'My books' || props.label === 'Favorites' || props.label === 'To be read' || props.label === 'In progress' || props.label === 'Finished' && (
                    <div className='shelf-name'>
                        <h2>{shelfName}</h2>
                    </div>
                )}

                <div className='book-card-list'>
                    {props.books && props.books.map((item, index) => <BookCard key={index} history={props.history} book={item} source={props.source} />)}
                </div>

                {props.source === 'search' && <SearchPagination />}
            </BookCardListContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        currentShelf: state.library.currentShelf
    };
};

export default connect(mapStateToProps, { editShelfName, deleteShelf })(BookCardList);
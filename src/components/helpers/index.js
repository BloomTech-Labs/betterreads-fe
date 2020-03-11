import React from 'react';
import axios from 'axios';
import { notification } from 'antd';
import { Event } from '../tracking';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const updateBookItem = (userId, newBook, book, action, favorite, readingStatus) => {

    console.log(userId, newBook, book, action, favorite, readingStatus)

    const method = (!newBook ? 'post' : 'put');
    console.log(method)
    // Save a book as a favorite or update its reading status
    axios({
        method,
        url: `${API_URL}/api/${userId}/library`,
        data: {
            book, 
            favorite: favorite, 
            readingStatus: readingStatus
            }
    })
    .then(results => {
        // Analytics Event action
        if(action === 'favorite') {
            Event('Search', (favorite ? 'User added a book to favorites from search list.' : 'User removed a book from favorites on search list.' ),'SEARCH_RESULT');
            sendUpTheFlares('success', 'Success', (favorite ? 'Book added to favorites.' : 'Book removed from favorites.'));
        }else{
            Event('Search', 'User added a book to start tracking from search list.', 'SEARCH_RESULT');
            sendUpTheFlares('success', 'Success', 'Reading status has been updated.');
        }
    })
    .catch(err => console.log(err));
}

export const sendUpTheFlares = (type, message, description) => {
    notification.open({
        type,
        message,
        description,
        duration: 1.5
    });   
}
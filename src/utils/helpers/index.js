import axios from 'axios';
import { notification } from 'antd';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const updateBookItem = (userId, readrrId, inLibrary, book, action, favorite, readingStatus) => {
    console.log(book)
    let method = (inLibrary ? 'put' : 'post');

    let data;
    if (inLibrary) {
        data = {
            bookId: readrrId,
            readingStatus: parseInt(readingStatus),
            favorite: favorite
        };
    } else {
        data = {
            book,
            favorite: favorite, 
            readingStatus: parseInt(readingStatus)
        };
    };

    if (parseInt(readingStatus) === 4) {
        method = action = 'delete';
        data = {
            bookId: readrrId
        };
    };

    // save a book as a favorite or update its reading status
    return axios({
        method,
        url: `${API_URL}/api/${userId}/library`,
        data
    });
};

export const sendUpTheFlares = (type, message, description) => {
    notification.open({
        type,
        message,
        description,
        duration: 1.5
    });   
};

export const updateDates = (userId, readrrId, dateString, whichDate) => {
    let dateObj;
    // whichDate 0/true for start date 
    // 1/false for end date
    if (!whichDate) {
        dateObj = {
            bookId: readrrId,
            dateStarted: dateString
        };
    } else {
        dateObj = {
            bookId: readrrId,
            dateEnded: dateString
        };
    };
    
    return axios.put(`${API_URL}/api/${userId}/library`, dateObj);
};

export const updateUserRating = (userId, bookId, userRating) => {
    return axios.put(`${API_URL}/api/${userId}/library`, {bookId, userRating})
}
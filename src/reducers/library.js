import { 
	FETCH_USERS_BOOKS, 
	FETCH_USERS_SHELVES, 
	SET_CURRENT_SHELF, 
	UPDATE_BOOK_FAVORITE, 
	UPDATE_BOOK_READING_STATUS, 
	UPDATE_BOOK_USER_RATING,
	ADD_BOOK_TO_LIBRARY, 
	DELETE_USER_BOOK, 
	MOVE_BOOK_FROM_SHELF,
	UPDATE_SINGLE_BOOK_FIELD
} from '../actions/types';

export const initialState = {
	userBooks: [],
	userShelves: [],
	currentShelf: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_BOOKS:
			return {
				...state,
				userBooks: action.payload
			};

		case FETCH_USERS_SHELVES:
			return {
				...state,
				userShelves: action.payload
			};

		case SET_CURRENT_SHELF:
			return {
				...state,
				currentShelf: action.payload
			};

		case UPDATE_BOOK_FAVORITE:
			return {
				...state,
				userBooks: state.userBooks.map(book => {
					if (book.bookId === action.payload) {
						return {
							...book, 
							favorite: !book.favorite
						};
					} else {
						return book;
					};
				})
			};

		case UPDATE_BOOK_READING_STATUS:
			return {
				...state,
				userBooks: state.userBooks.map(book => {
					if (book.bookId === action.payload.bookId) {
						return {
							...book, 
							readingStatus: parseInt(action.payload.status)
						};
					} else {
						return book;
					};
				})
			};

		case UPDATE_BOOK_USER_RATING:
			return {
				...state,
				userBooks: state.userBooks.map(book => {
					if (book.bookId === action.payload.bookId){
						return {
							...book,
							userRating: parseFloat(action.payload.rating)
						}
					} else {
						return book;
					};
				})
			};

		case UPDATE_SINGLE_BOOK_FIELD:
			return {
				...state,
				userBooks: state.userBooks.map(book => {
					if (book.bookId === action.payload.bookId){
						return {
							...book,
							[action.payload.field]: action.payload.value
						}
					}
				})
			}
		
		case ADD_BOOK_TO_LIBRARY:
			return {
				...state,
				userBooks: state.userBooks.find(book => book.googleId === action.payload.googleId) ? state.userBooks : [...state.userBooks, action.payload]
			
			};
		
		case DELETE_USER_BOOK:
			return{
				...state,
				userBooks: [...state.userBooks.filter(b => b.bookId !== action.payload)]
			};

		case MOVE_BOOK_FROM_SHELF:
			return {
				...state,
				currentShelf: [...state.currentShelf.filter(b => b.bookId !== action.payload)]
			};
		
		default:
			return state;
	};
};

import { 
	FETCH_USERS_BOOKS, 
	FETCH_USERS_SHELVES, 
	SET_CURRENT_SHELF, 
	UPDATE_BOOK_FAVORTIE, 
	UPDATE_BOOK_READING_STATUS, 
	ADD_BOOK_TO_LIBRARY, 
	DELETE_USER_BOOK, 
	MOVE_BOOK_FROM_SHELF 
} from '../actions';

const initialState = {
	userBooks: [],
	userShelves: [],
	currentShelf: []
};

export default function reducer(state = initialState, action) {
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

		case UPDATE_BOOK_FAVORTIE:
			return {
				...state,
				userBooks: state.userBooks.map(book => {
					if(book.bookId === action.payload){
						return {
							...book, 
							favorite: !book.favorite
						}
					}else{
						return book
					}
				})
			}

		case UPDATE_BOOK_READING_STATUS:
			return {
				...state,
				userBooks: state.userBooks.map(book => {
					if(book.bookId === action.payload.bookId){
						return {
							...book, 
							readingStatus: parseInt(action.payload.status)
						}
					}else{
						return book
					}
				})
			}

		case ADD_BOOK_TO_LIBRARY:
			return {
				...state,
				userBooks: [...state.userBooks, action.payload]
			}
		
		case DELETE_USER_BOOK:
			return{
				...state,
				userBooks: [...state.userBooks.filter(b => b.bookId !== action.payload)]
			}

		case MOVE_BOOK_FROM_SHELF:
			return {
				...state,
				currentShelf: [...state.currentShelf.filter(b => b.bookId !== action.payload)]
			}
		
		default:
			return state;
	}
}

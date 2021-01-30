import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from "../actions/actions";

const booksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOK: {
      let newBook = [...state];
      newBook.push(action.payload);
      return newBook;
    }
    case DELETE_BOOK: {
      let newBook = [...state];
      newBook = newBook.filter((book) => book.id !== action.payload.id);
      return newBook;
    }
    case UPDATE_BOOK: {
      let newBook = [...state];
      let index = -1;
      for (let i = 0; i < newBook.length; i++) {
        index++;
        if (newBook[i].id === action.payload.id) {
          break;
        }
      }
      if (index !== -1) {
        newBook[index] = action.payload;
        return newBook;
      }
    }
    default:
      return state;
  }
};

export default booksReducer;

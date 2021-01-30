export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";

let nextAddBookId = 0;

export const addBook = (name, price, category, description) => {
  return {
    type: ADD_BOOK,
    payload: {
      id: ++nextAddBookId,
      name,
      price,
      category,
      description,
    },
  };
};

export const deleteBook = (id) => {
  return {
    type: DELETE_BOOK,
    payload: { id },
  };
};

export const updateBook = (id, name, price, category, description) => {
  return {
    type: UPDATE_BOOK,
    payload: { id, name, price, category, description },
  };
};

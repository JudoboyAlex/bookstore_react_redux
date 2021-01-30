import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, updateBook } from "../actions/actions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ListBook = (props) => {
  const [modal, setModal] = useState(false);
  const [updatedBookPrice, setUpdatedBookPrice] = useState("");
  const [updatedBookName, setUpdatedBookName] = useState("");
  const [updatedBookCategory, setUpdatedBookCategory] = useState("");
  const [updatedBookDescription, setUpdatedBookDescription] = useState("");
  const [updatedBookId, setUpdatedBookId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { className } = props;
  
  const dispatch = useDispatch();
  const books = useSelector( state => state);

  const toggle = () => setModal(!modal);

  const storeBookInfoAndOpenModal = (id,name,price,category,description) => {
    setUpdatedBookId(id);
    setUpdatedBookName(name);
    setUpdatedBookPrice(price);
    setUpdatedBookCategory(category);
    setUpdatedBookDescription(description);
    setModal(!modal);
  }

  const handleUpdatedBookPrice = ({ target }) => {
    setUpdatedBookPrice(target.value);
  };

  const handleUpdatedBookName = ({ target }) => {
    setUpdatedBookName(target.value);
  };

  const handleUpdatedBookCategory = ({ target }) => {
    setUpdatedBookCategory(target.value);
  };

  const handleUpdatedBookDescription = ({ target }) => {
    setUpdatedBookDescription(target.value);
  };

  const validate = () => {
    let regex = /^\d+(\.\d{0,2})?$/g;
    if (!regex.test(updatedBookPrice)) {
      setErrorMessage("Book price must be number")
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitUpdateBook = (event) => {
    event.preventDefault();
    const isValid = validate();

    if (!isValid){
      return false;
    } else {
      setErrorMessage("");
    }

    dispatch(updateBook(
      updatedBookId,
      updatedBookName,
      updatedBookPrice,
      updatedBookCategory,
      updatedBookDescription
    ));
    setUpdatedBookPrice("");
    setUpdatedBookName("");
    setUpdatedBookCategory("");
    setUpdatedBookDescription("");
    setModal(!modal)
  };
  
  return (
    <>
      <h3>List of Books</h3>
      <div className="bookListContainer">
        {books && books.length > 0 &&
          books.map((book, index) => (
            <ul key={book.id} className="bookContainer">
            <div onClick={() => storeBookInfoAndOpenModal(book.id, book.name, book.price, book.category, book.description)}>
              <li>Title: <span>{book.name}</span></li>
              <li>Category: <span>{book.category}</span></li>
              <li>Price: <span>${book.price}</span></li>
              </div>
              <Button className="deleteBtn" color="danger" onClick={() => dispatch(deleteBook(book.id))}>DELETE</Button>{' '}
            </ul>
          )) 
        }

        <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Please Update Your Book</ModalHeader>
        <ModalBody className="modalContainer">
          <form >
            <label>
              <input
                type="text"
                value={updatedBookName}
                onChange={handleUpdatedBookName}
              />
              <input
                type="text"
                value={updatedBookPrice}
                onChange={handleUpdatedBookPrice}
              />
              <div style={{ fontSize: 12, color: "red" }}>{errorMessage}</div>
              <input
                type="text"
                value={updatedBookCategory}
                onChange={handleUpdatedBookCategory}
              />
              <textarea
                type="text"
                value={updatedBookDescription}
                onChange={handleUpdatedBookDescription}
              />
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitUpdateBook} >
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    </>
  )
}

export default ListBook;


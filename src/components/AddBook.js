import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addBook } from "../actions/actions";

const AddBook = (props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [bookPrice, setBookPrice] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggle = () => setModal(!modal);

  const handleBookPrice = ({ target }) => {
    setBookPrice(target.value);
  };

  const handleBookName = ({ target }) => {
    setBookName(target.value);
  };

  const handleBookCategory = ({ target }) => {
    setBookCategory(target.value);
  };

  const handleBookDescription = ({ target }) => {
    setBookDescription(target.value);
  };

  const validate = () => {
    let regex = /^\d+(\.\d{0,2})?$/g;
    if (!regex.test(bookPrice)) {
      setErrorMessage("Book price must be number")
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitAddBook = (event) => {
    event.preventDefault();
    const isValid = validate();

    if (!isValid){
      return false;
    } else {
      setErrorMessage("");
    }

    dispatch(addBook(bookName, bookPrice, bookCategory, bookDescription));
    setBookPrice("");
    setBookName("");
    setBookCategory("");
    setBookDescription("");
    setModal(!modal)
  };

  return (
    <div className="header">
      <h1>Welcome to Book Store!</h1>
      <Button className="addBookBtn" color="primary" size="lg" onClick={toggle}>
        Add Book
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Please Add Your Book</ModalHeader>
        <ModalBody className="modalContainer" >
          <form >
            <label >
              <input
                type="text"
                placeholder="Book Name"
                value={bookName}
                onChange={handleBookName}
              />
              <input
                type="text"
                placeholder="Book Price(Must be numer)"
                value={bookPrice}
                onChange={handleBookPrice}
              />
              <div style={{ fontSize: 12, color: "red" }}>{errorMessage}</div>
              <input
                type="text"
                placeholder="Category"
                value={bookCategory}
                onChange={handleBookCategory}
              />
              <textarea
                type="text"
                placeholder="Description"
                value={bookDescription}
                onChange={handleBookDescription}
              />
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmitAddBook} >
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default connect()(AddBook);

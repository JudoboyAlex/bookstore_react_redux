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

  const handleSubmitAddBook = () => {
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
                placeholder="Price"
                value={bookPrice}
                onChange={handleBookPrice}
              />
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

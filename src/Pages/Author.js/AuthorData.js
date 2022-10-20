import React from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAuthorBook, deleteAuthorBook } from "../../Feature/UserSlice";

const AuthorData = ({ AuthorDetails, getValue }) => {
  const [show, setShow] = useState(false);
  const [addBook, setAddBook] = useState({
    bookName: "",
    bookContent: "",
  });

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddBook = (e) => {
    setAddBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addingBook = () => {
    setShow(false);
    return dispatch(
      addAuthorBook({
        id: Math.random(),
        userId: getValue,
        title: addBook.bookName,
        body: addBook.bookContent,
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">{AuthorDetails[0]?.name}</h2>
          <Button variant="primary" onClick={handleShow}>
            Add Book
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style={{ top: "20%" }}
          >
            <Form className="p-5 pt-3 pb-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="email"
                  name="bookName"
                  onChange={handleAddBook}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="bookContent"
                  onChange={handleAddBook}
                />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {addBook.bookName === "" ? (
                <Button variant="primary" disabled>
                  Add
                </Button>
              ) : (
                <Button variant="primary" onClick={addingBook}>
                  Add
                </Button>
              )}
            </Modal.Footer>
          </Modal>
          {AuthorDetails.map(({ id, title, body }) => {
            return (
              <Card bg="light" key={id} text="dark" className="mb-2 mt-5">
                <Card.Body>
                  <Card.Title className="text-center">
                    {title?.toUpperCase()}
                  </Card.Title>
                  <Card.Text>{`${body}.`}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteAuthorBook({ id: id }))}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorData;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { GetData, addAuthor, removeClean } from "../../Feature/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeTable from "./HomeTable";
import { UseUserContext } from "../../Component/Utilities/Context";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

const Home = () => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [authorName, setAuthorName] = useState("");

  const { toggleTheme } = UseUserContext();

  const UserList = useSelector((state) => state.UserInfo.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetData());
    return () => {
      dispatch(removeClean());
    };
  }, [dispatch]);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const AddAuthor = () => {
    setShow(false);
    return dispatch(
      addAuthor({
        userId: UserList[0].userId - 1,
        id: UserList[0].id - 1,
        name: authorName,
      })
    );
  };

  const RemoveDuplicateName = (array, element) => {
    return array.filter(
      (item, index, arr) =>
        index === arr.findIndex((el) => el[element] === item[element])
    );
  };
  const AuthorName = RemoveDuplicateName(UserList, "userId");

  return (
    <div className="cls">
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3 mt-5 w-50">
              <Form.Control
                placeholder="Search Author"
                aria-describedby="basic-addon2"
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputGroup.Text id="basic-addon2">Search Author</InputGroup.Text>
            </InputGroup>

            <Button onClick={toggleTheme}>Change color</Button>

            <Button variant="success" onClick={handleShow} className="mb-5">
              Add Author
            </Button>

            {/* This is Modal for Add Author */}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Form className="p-5 pt-3 pb-3">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="h5">Add Author:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name..."
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {authorName == "" ? (
                  <Button variant="primary" disabled>
                    Add
                  </Button>
                ) : (
                  <Button variant="primary" onClick={AddAuthor}>
                    Add
                  </Button>
                )}
              </Modal.Footer>
            </Modal>

            <HomeTable AuthorName={AuthorName} query={query} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

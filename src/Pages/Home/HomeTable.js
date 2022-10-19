import React from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { AiTwotoneDelete, AiFillEye } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAuthor, deleteAuthor } from "../../Feature/UserSlice";
import { useNavigate } from "react-router-dom";

const HomeTable = ({ AuthorName, query }) => {
  const [show, setShow] = useState(false);
  const [editAuthor, setEditAuthor] = useState("");
  const [edit, setEdit] = useState(0);
  const [view, setView] = useState({})

  console.log(view)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleClick = (userId) => {
    let item = AuthorName[userId - 1];
    setShow(true);
    setEdit(userId);
    setEditAuthor(item.name);
    console.log(userId)
  };

  const handleView = (userId) => {
    setView((prev) => (prev.view !== userId ? userId : ""));
  };

  return (
    <div>
      <Table striped bordered hover size="lg" className="text-center">
        <thead className="bg-primary text-white h3">
          <tr>
            <th>#</th>
            <th>Author Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="h4">
          {AuthorName.filter((item) =>
            item.name?.toLowerCase().includes(query)
          ).map(({ id, name, userId, title }, index, arr) => {
            return (
              <tr key={id}>
                {title ? (
                  <td
                    onClick={() => handleView(userId)}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}
                  </td>
                ) : (
                  <td>{index + 1}</td>
                )}
                <td>
                  {name} <br />
                  {view === userId ? (
                    <p style={{ color: "green", fontSize: "45px" }}>{title}</p>
                  ) : null}
                </td>
                <td>
                  <AiFillEye
                    style={{ cursor: "pointer" }}
                    size="23px"
                    onClick={() => navigate(`/${userId}`)}
                  />
                </td>
                <td>
                  <FaUserEdit
                    style={{ cursor: "pointer" }}
                    size="23px"
                    onClick={() => handleClick(userId, name)}
                  />
                </td>
                <td>
                  <AiTwotoneDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(deleteAuthor({ userId: userId }));
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>

        {show && (
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Form className="p-5 pt-3 pb-3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="h5">Edit Author:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name..."
                  onChange={(e) => setEditAuthor(e.target.value)}
                  value={editAuthor}
                />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {editAuthor == "" ? (
                <Button variant="primary" disabled>
                  Save
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    setShow(false);
                    dispatch(
                      updateAuthor({
                        userId: edit,
                        name: editAuthor,
                      })
                    );
                  }}
                >
                  Save
                </Button>
                
              )}
            </Modal.Footer>
          </Modal>
        )}
      </Table>
    </div>
  );
};

export default HomeTable;

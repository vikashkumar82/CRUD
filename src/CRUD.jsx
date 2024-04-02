import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../src/Style.css";
// import Form from "../src/Component/Form";




const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState("0");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editIsActive, setEditIsActive] = useState("0");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  //-----------------------------------------------------------------------------

  const handleSave = () => {
if(name != "" && age !="" ){
  const url = "https://localhost:7277/api/Employee";
  const data = {
    name: name,
    age: age,
    isActive: isActive,
  };
  axios.post(url, data).then((result) => {
    getData();
    clear();
    toast.success("Employee has been added");
  });
};
}
   

  const clear = () => {
    setName("");
    setAge("");
    setIsActive(0);
    setEditName("");
    setEditAge("");
    setEditIsActive(0);
    setEditId("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditIsActive(1);
    } else {
      setEditIsActive(0);
    }
  };

  const getData = () => {
    axios
      .get("https://localhost:7277/api/Employee")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7277/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setEditIsActive(result.data.isActive);
        setEditId(id);
      })
      .catch((error) => {
        console.error("AxiosError:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record") == true) {
      axios
        .delete(`https://localhost:7277/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Employee has been deleted");
            getData();
          } else {
            toast.error("Unable to delete");
          }
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7277/api/Employee?id=${editId}`;
    const data = {
      id: editId,
      name: editName,
      age: editAge,
      isActive: editIsActive,
    };
    axios.put(url, data).then((result) => {
      handleClose();
      getData();
      clear();
      toast.success("Employee has been updated");
    });
  };

  return (
    <>
      <div className="container mt-3">
        <Fragment>
          <ToastContainer />
          <Row>
            <Col>
              <input
                type="text"
                className="form-control inputBox"
                name="userName"
                placeholder="Enter Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
               
                className="form-control inputBox"
                placeholder="Enter Age"
                value={age}
                required
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <div className="checkBoxDiv">
                <input
                  type="checkbox"
                  className="checkBox"
                  onChange={(e) => handleActiveChange(e)}
                  value={isActive}
                />
                <label>Is Active</label>
              </div>
            </Col>
            <Col>
              <button class="btn btn-success submit" onClick={(e) => handleSave()}>
                Submit
              </button>
            </Col>
          </Row>
          <br />

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>isActive</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0
                ? data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.isActive}</td>
                        <td colSpan={2} className="updateDeleteBtn">
                          <button
                            className="btn btn-success actionButton"
                            onClick={() => handleEdit(item.id)}
                          >
                            Update
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-danger actionButton"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : "Loading....."}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Age"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="checkbox"
                    checked={editIsActive === 1 ? true : false}
                    onChange={(e) => handleEditActiveChange(e)}
                    value={editIsActive}
                  />
                  <label>Is Active</label>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>

        {/* <div>
        <Form />
      </div> */}
      </div>
    </>
  );
};

export default CRUD;

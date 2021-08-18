import { useState, useEffect } from "react";
import Filter from "./Filter";
import Table from "./Table";
import Header from "./Header";
import { Modal, Button, Alert } from "react-bootstrap";
import AddTask from "./AddTask";
import { useParams, Redirect } from "react-router-dom";
import API from "../../API";
import { LogoutButton } from "../login/Login";

export default function Home(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [tasks, setTasks] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [filter, setFilter] = useState("all");
  const params = useParams();

  useEffect(() => {
    if (params.filter === "all" || params.filter === "") {
      if (dirty) {
        API.getTasks().then((newT) => {
          setTasks(newT);
          setDirty(false);
        });
      }
    } else {
      if (dirty) {
        API.getFilteredTasks(params.filter).then((newT) => {
          setTasks(newT);
          setDirty(false);
          setFilter(params);
        });
      }
    }
  }, [tasks.length, dirty, params]);

  useEffect(() => {
    handleClose();
  }, []);

  return (
    <>
      <div className="row mt-5 pt-5">
        <div className="col-md-3 mt-5">
          <Filter setTasks={setTasks} filter={params.filter} />
        </div>
        <div className="col-md-9">
          <Alert variant={props.welcomeMsg.type}>{props.welcomeMsg.msg}</Alert>
          {props.loggedIn ? (
            <LogoutButton logout={props.logout} />
          ) : (
            <Redirect to="/login" />
          )}
          <Header filter={params.filter} />
          <Table tasks={tasks} setDirty={setDirty} close={handleClose} />
          <Button onClick={handleShow} className="add-btn" data-toggle="modal">
            <i className="material-icons">&#xE147;</i> <span>Add New Task</span>
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddTask close={handleClose} setDirty={setDirty} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

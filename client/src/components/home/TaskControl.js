import { useState, useEffect } from "react";
import { iconDelete, iconEdit } from "./icons";
import API from "../../API";
import { Modal, Button } from "react-bootstrap";
import UpdateTask from "./UpdateTask";
export default function TaskControl(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, []);

  return (
    <>
      <td>
        <span
          onClick={() => {
            handleShow();
          }}
        >
          {iconEdit}{" "}
        </span>

        <span
          onClick={() => {
            API.deleteTask(props.task.id).then(() => props.setDirty(true));
          }}
        >
          {iconDelete}
        </span>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpdateTask
            task={props.task}
            setDirty={props.setDirty}
            close={handleClose}
          />
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

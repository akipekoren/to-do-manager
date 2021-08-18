import { Form, Button } from "react-bootstrap";
import API from "../../API";
import { useState } from "react";

const UpdateTask = (props) => {
  const updateTask = (task) => {
    API.updateTask(task).then(() => {
      props.setDirty(true);
    });

    props.close();
  };

  const [newTask, setNewTask] = useState({
    description: props.task.description,
    deadline: props.task.deadline,
    important: props.task.important,
    privateVal: props.task.private,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var pInt;
    var iInt;

    if (
      important === "2" ||
      important === "0" ||
      important === 0 ||
      important === 2
    ) {
      iInt = 0;
    } else {
      iInt = 1;
    }
    if (
      privateVal === "2" ||
      privateVal === "0" ||
      privateVal === 0 ||
      privateVal === 2
    ) {
      pInt = 0;
    } else {
      pInt = 1;
    }

    const t = {
      description: description,
      deadline: deadline,
      private: pInt,
      important: iInt,
      user: 1,
      id: props.task.id,
    };
    updateTask(t);
  };

  const onInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const { description, deadline, important, privateVal } = newTask;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Task Name"
          name="description"
          value={description}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          type="date"
          placeholder="Deadline"
          name="deadline"
          value={deadline}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          as="select"
          name="important"
          value={important}
          onChange={(e) => onInputChange(e)}
        >
          <option disabled value="2">
            Important
          </option>
          <option value="0">False</option>
          <option value="1">True</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          as="select"
          name="privateVal"
          value={privateVal}
          onChange={(e) => onInputChange(e)}
        >
          <option disabled value="2">
            Private
          </option>
          <option value="0">False</option>
          <option value="1">True</option>
        </Form.Control>
      </Form.Group>

      <Button variant="success" type="submit" block className="mt-3">
        Update Task
      </Button>
    </Form>
  );
};

export default UpdateTask;

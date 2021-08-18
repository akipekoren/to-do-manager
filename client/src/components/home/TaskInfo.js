import React from "react";
import API from "../../API";
export default function TaskInfo(props) {
  const handleChange = () => {
    const task = {
      id: props.task.id,
      description: props.task.description,
      deadline: props.task.deadline,
      important: props.task.important,
      private: props.task.private,
      completed: !props.task.completed,
      user: props.task.user,
    };

    API.updateTask(task).then(() => {
      props.setDirty(true);
    });
  };

  return (
    <>
      {props.task.important ? (
        <>
          {" "}
          <td>
            <input
              type="checkbox"
              defaultChecked={props.task.completed}
              onChange={handleChange}
            />
          </td>
          <td style={{ color: "red" }}> {props.task.description}</td>
          <td style={{ fontSize: "12px" }}> {props.task.deadline}</td>
        </>
      ) : (
        <>
          {" "}
          <td>
            <input
              type="checkbox"
              defaultChecked={props.task.completed}
              onChange={handleChange}
            />
          </td>
          <td> {props.task.description}</td>
          <td style={{ fontSize: "12px" }}> {props.task.deadline}</td>
        </>
      )}
    </>
  );
}

import React from "react";
import { Table } from "react-bootstrap";
import TaskRow from "./TaskRow";
export default function TableComponent(props) {
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Completed</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              setDirty={props.setDirty}
              close={props.handleClose}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

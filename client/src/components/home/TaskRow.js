import React from "react";
import TaskInfo from "./TaskInfo";
import TaskControl from "./TaskControl";

export default function TaskRow(props) {
  return (
    <tr>
      <TaskInfo task={props.task} setDirty={props.setDirty} />{" "}
      <TaskControl
        task={props.task}
        setDirty={props.setDirty}
        close={props.handleClose}
      />{" "}
    </tr>
  );
}

import { useState } from "react";
import "./Filter.css";
import { ListGroup } from "react-bootstrap/";
import "../../App.css";
import { useHistory } from "react-router-dom";
import API from "../../API";
export default function Filter(props) {
  const [defaultKey, setDefaultKey] = useState(props.filter);
  const [choosen, setChoosen] = useState(props.filter);
  const history = useHistory();

  // Route to the filter view
  function handleSelection(filter) {
    history.push("/list/" + filter);
  }

  const handleAll = () => {
    setChoosen("all");
    handleSelection("all");
    API.getTasks().then((newT) => {
      props.setTasks(newT);
    });
  };

  const handleImportant = () => {
    setChoosen("important");
    handleSelection("important");
    API.getFilteredTasks("important").then((newT) => {
      props.setTasks(newT);
    });
  };

  const handleToday = () => {
    setChoosen("today");
    handleSelection("today");
    API.getFilteredTasks("today").then((newT) => {
      props.setTasks(newT);
    });
  };

  const handleNext = () => {
    setChoosen("week");
    handleSelection("week");
    API.getFilteredTasks("week").then((newT) => {
      props.setTasks(newT);
    });
  };

  const handlePrivate = () => {
    setChoosen("private");
    handleSelection("private");
    API.getFilteredTasks("private").then((newT) => {
      props.setTasks(newT);
    });
  };

  return (
    <>
      <ListGroup as="div" variant="flush" defaultActiveKey={defaultKey}>
        <ListGroup.Item
          as="a"
          action
          key={"all"}
          active={choosen === "all"}
          onClick={handleAll}
        >
          All
        </ListGroup.Item>
      </ListGroup>
      <ListGroup as="div" variant="flush">
        <ListGroup.Item
          as="a"
          action
          onClick={handleImportant}
          key={"important"}
          active={choosen === "important"}
        >
          Important
        </ListGroup.Item>
      </ListGroup>
      <ListGroup as="div" variant="flush">
        <ListGroup.Item
          as="a"
          action
          onClick={handleToday}
          key={"today"}
          active={choosen === "today"}
        >
          Today
        </ListGroup.Item>
      </ListGroup>
      <ListGroup as="div" variant="flush">
        <ListGroup.Item
          as="a"
          action
          onClick={handleNext}
          key={"week"}
          active={choosen === "week"}
        >
          Next 7 Days
        </ListGroup.Item>
      </ListGroup>
      <ListGroup as="div" variant="flush">
        <ListGroup.Item
          as="a"
          action
          onClick={handlePrivate}
          key={"private"}
          active={choosen === "private"}
        >
          Private
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

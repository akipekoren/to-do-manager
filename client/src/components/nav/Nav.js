import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap/";
import { PersonCircle, CheckAll } from "react-bootstrap-icons";

export default function NavBar() {
  return (
    <Navbar bg="success" variant="dark" fixed="top">
      <Navbar.Toggle aria-controls="left-sidebar" />
      <Navbar.Brand href="/">
        <CheckAll className="mr-1" size="40" /> ToDo Manager
      </Navbar.Brand>
      <Form
        inline
        className="my-0 mx-auto"
        action="#"
        role="search"
        aria-label="Quick search"
      >
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search query"
        />
      </Form>
      <Nav>
        <Nav.Item>
          <Nav.Link href="#">
            <PersonCircle size="40" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

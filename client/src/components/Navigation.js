import React from "react";
import { Nav, Navbar, Container, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/logo1.jpg";
import "./Navigation.css";

const Navigation = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar bg="light" expand="lg" className="justify-content-center">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="" style={{ width: 50, height: 50 }} />
          </Link>
        </Navbar.Brand>
        {Auth.loggedIn() ? (
          <>
            <Routes>
              <Route path="/" element={<Navigate to="/gadget" />}></Route>
            </Routes>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className="mr-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>User</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/gadget">
                  <Nav.Link>Gadgets</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </LinkContainer>
                <Button> 
              <Link className="text-white"to="/donate">Donate </Link>
              </Button>
              </Nav>
            {/* <Link to="/profile">Me</Link>
            <Link to="/gadget">Gadgets</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
            <Button> 
              <Link className="text-white"to="/donate">Donate </Link>
              </Button> */}
          </>
        ) : (
          <>
            <Navbar.Brand href="/gadget">Gadgets-To-Go</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className="mr-auto">
                <LinkContainer to="/login">
                  <Nav.Link >Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
              </Nav>
            <br />
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
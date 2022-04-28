import React from 'react'
import {Nav, Navbar, Container } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo1.jpg'

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    <LinkContainer to="/">
    <Navbar.Brand>
     <img src={logo} alt="" style={{width:50, height: 50}} />
      </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      <LinkContainer to="/gadget">
      <Nav.Link >Gadgets</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
      <Nav.Link >Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/about">
      <Nav.Link >About Us</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/contact">
      <Nav.Link >Contact</Nav.Link>
      </LinkContainer>
  
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Navigation
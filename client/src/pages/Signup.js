import React from 'react'
import {Row, Col, Container, Button, Form} from "react-bootstrap";
// import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  return (
    <Container>
    <Row>
      <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{width: '80%', maxWidth: 500}}>
            <h1 classsName="text-center">Create Account</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Your Name" />
           </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" />
</Form.Group>
<Button variant="primary" type="submit">
  Sign Up
</Button>
</Form>
</Col>
<Col md={5} className="signup__bg"> </Col>
</Row>
</Container>
  )
}

export default Signup
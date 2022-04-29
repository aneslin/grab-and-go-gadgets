import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css'
// import Homepage from '../assets/homepage.jpg'

const Home = () => {
  return (
    <Row>
      <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center"> 
      <div>
        <h1>Borrow Technology, Gadgets, Games, & More</h1>
        <h4> Gadgets to Go </h4>
        <LinkContainer to="/gadget"> 
          <Button variant="success">Get Started</Button>
        </LinkContainer>
      </div>
      </Col>
      <Col md={6} className="home__bg" >
      {/* <img src={Homepage} alt="" className="home__bg"/> */}
      </Col>
    </Row>
    
  )
}

export default Home
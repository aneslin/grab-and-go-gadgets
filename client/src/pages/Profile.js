import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import Items from "../components/Items/Items";
import { Row, CardColumns, Col, Button, Card, Container } from "react-bootstrap";

const Profile = () => {
 const page = "profile";
  const { loading, data, error, refetch } = useQuery(QUERY_ME);
  if (loading) return <p>loading data</p>
  if (error) return(
    <React.Fragment>
      <p>Oops, error! </p> 
      <button onClick={() => refetch()}>Please try again!</button>
    </React.Fragment>
  )
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  console.log(data);

  return (
    <Container>
      <h1>My Profile </h1>
      <section>
        
        <h3>My info</h3>
        <ul>
          <li>
            <span>UserName</span>: {data.me.username}
          </li>
          <li>
            <span>Email</span>: {data.me.email}
          </li>
          {data.me.userType === "ADMIN" ? (
            <li>Admin Status: You are admin!!</li>
          ) : (
            ""
          )}
        </ul>
      </section>
      <Row>
        {loading ? (
          <p>"loading"</p>
        ) : (
          data.me.reservedItems.map((item) => {
           let {_id, name, image, description, itemStatus, dueDate } = item
           
           return <Col> <Items
              page = {page}
              token = {token}
              _id={_id}
              name={name}
              image={image}
              description={description}
              dueDate= {dueDate}
              itemStatus={itemStatus}
            ></Items></Col>
          })
        )}
      </Row>
    </Container>
  );
};

export default Profile;

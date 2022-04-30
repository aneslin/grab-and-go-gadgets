import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import  Items  from "../components/Items/Items";
import { Row, Col, Button, Card } from "react-bootstrap";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const token = Auth.loggedIn() ? Auth.getToken() : null;


  return (
    <div>
      <h1>My Profile </h1>
      <section>
      <h3>My info</h3>
      <ul>
        <li><span>UserName</span>: {data.me.username}</li>
        <li><span>Email</span>: {data.me.email}</li>
        {data.me.userType === 'ADMIN'? <li>Admin Status: You are admin</li>:''}
      </ul>

      </section>
     
      { data ? data.me.reservedItems.map((item) => (
        <Items
          _id={item._id}
          name={item.name}
          image={item.image}
          description={item.description}
        ></Items>
      )) : "loading"}
    </div>
  );
};

export default Profile;

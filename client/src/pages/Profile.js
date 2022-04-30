import React, { useState } from "react";
import { useQuery} from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import {Row, Col, Button, Card} from 'react-bootstrap';


const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log(data)

 
  return (
    <div>
  { !data ? "loading": <span>{data.me.username}</span>

    }
  </div>
  
  
  
  
  );
};

export default Profile;

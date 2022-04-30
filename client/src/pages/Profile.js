import React, { useState } from "react";
import { useQuery} from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log(data)
  
  return (
  <div>
    <div>{!token ? "not logged in" : 
    data.me.name
    }</div>


  </div>
  
  
  
  
  
  );
};

export default Profile;

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  console.log(data)
  return <div>Profile</div>;
};

export default Profile;

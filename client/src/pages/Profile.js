import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from '../utils/helpers';
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import Items from "../components/Items/Items";
import {
  Row,
  CardColumns,
  Col,
  Button,
  Card,
  Stack,
  Container,
  CardGroup
} from "react-bootstrap";

const Profile = () => {
 
  const [pages] = useState([
    {
        name: "My Profile"
    }
]);
const [currentPage] = useState(pages[0]);

  const page = "profile";
  const { loading, data, error, refetch } = useQuery(QUERY_ME);

 
  
  useEffect(()=>{
    async function fetchAPI() {
      const callQuery = async () => {
        refetch().then((response) => {
          console.log(response)
        })
      }
      await callQuery();
    }
    fetchAPI()
  })
  if (loading) return <p>loading data</p>;
  if (error)
    return (
      <React.Fragment>
        <p>Oops, error! </p>
        {console.error(error)}
        <button onClick={() => refetch()}>Please try again!</button>
      </React.Fragment>
    );
    console.log(data.me.reservedItems)
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  let reserved = data.me.reservedItems.filter(
    (item) => item.itemStatus === "RESERVED"
  );
  let checkedOut = data.me.reservedItems.filter(
    (item) => item.itemStatus === "CHECKED_OUT"
  );
  console.log(data);

  return (
    <Container>
      <div className="masthead text-center text-black d-flex">
            <div className="container my-auto">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <h1>{capitalizeFirstLetter(currentPage.name)}</h1>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
      <section>
        <div>
          <h3>My info</h3>
          <div>
            <Stack className="bg-light border my-2 " style={{ width: "24rem" }}>
              <div>
                <span>Username</span>: {data.me.username}
              </div>
              <div>
                <span>Email</span>: {data.me.email}
              </div>
              <div>You have {reserved.length} reserved Items</div>
              <div>You have {checkedOut.length} Checked Out Items</div>
              {data.me.userType === "ADMIN" ? (
                <div>Admin Status: You are admin!!</div>
              ) : (
                ""
              )}
            </Stack>
          </div>
        </div>
      </section>
      <section>
        <h3 className="b">My Gadgets</h3>
        <Row>
          {loading ? (
            <p>"loading"</p>
          ) : (
            data.me.reservedItems.map((item) => {
              let { _id, name, image, description, itemStatus, dueDate } = item;

              return (
                <Col key={_id}>
                  {" "}
                  <Items
                    page={page}
                    _id={_id}
                    name={name}
                    image={image}
                    description={description}
                    dueDate={dueDate}
                    itemStatus={itemStatus}
                  ></Items>
                </Col>
              );
            })
          )}
        </Row>
      </section>
    </Container>
  );
};

export default Profile;

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, Button, CardGroup} from "react-bootstrap";
import { RESERVE_ITEM } from "../../utils/mutations";
import Auth from "../../utils/auth";
import laptop from "../../assets/laptop.jpg";
import headphones from "../../assets/headphones1.jpeg";
import iphone from "../../assets/iphone1.jpeg";
import mic from "../../assets/mic.jpg";
import desktop from "../../assets/monitor1.jpg";
import drone from "../../assets/drone.jpeg";
import watch from "../../assets/watch.jpg";
import Sony from "../../assets/sony.jpg";
import Playstation from "../../assets/ps5.jpg";
import "./Items.css";


function Items(props) {
  const { _id, name, image, description, dueDate, itemStatus, page } = props;
  const [reserveItem] = useMutation(RESERVE_ITEM);
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const currentItem = {
    _id: _id,
    name: name,
    image: image,
    description: description,
    dueDate: dueDate,
    itemStatus: itemStatus,
  };
  const [item, setItem] = useState(currentItem);



  const handleReserve = async (id) => {
    try {
      console.log(id);
      const data = await reserveItem({
        variables: { itemId: id, dueDate: "TODAY" },
      });
      console.log("====>", data);
      const updatedItem = await { data };

      console.log(updatedItem);
      setItem(updatedItem.data.data.reserveItem);
    } catch (err) {
      console.log(err);
    }
  };

  const findPage = function (page, token, itemStatus, _id) {
    if (page === "admin" && itemStatus === "RESERVED") {
      return <Button variant="success">Check OUT</Button>;
    } else if (page === "admin" && itemStatus === "CHECKED_OUT") {
      return <Button variant="danger">Check In</Button>;
    } else if (page === "Gadgets" && token && itemStatus !== "RESERVED") {
      return (
        <Button  onClick={() => handleReserve(_id)}>
          Reserve
        </Button>
      );
    } else if ( itemStatus === "RESERVED") {
      return (
        <Button variant="primary" disabled>
          Reserved
        </Button>
      );
    } else {
      return <></>;
    }
  };
  
  // render different images from assets to the card 
  const findImage = function (items) {
    if (name === "Laptop") {
      return laptop;
    } 
    if (name === "Headphones") {
      return headphones;
    } 
    if (name === "Iphone") {
      return iphone;
    } 
    if (name === "Microphone") {
      return mic;
    } 
    if (name === "Monitor") {
      return desktop;
    } 
    if (name === "Drone") {
      return drone;
    } 
    if (name === "Watch") {
      return watch;
    } 
    if (name === "Sony") {
      return Sony;
    } 
    if (name === "Ps5") {
      return Playstation;
    } 
    else {
      return laptop;
    }
  };


  return (

    // display everything on react boostrap card
    <Card className="card-item " style={{ width: "24rem" }}>
      <Card.Img className="card-img" variant="top" src={findImage(name)} />
      <Card.Body className="card-body">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{dueDate}</Card.Text>
        <Card.Text>{itemStatus}</Card.Text>
        </Card.Body>
        <Card.Footer variant="primary">
        {findPage(page, token, item.itemStatus, item._id)}

        </Card.Footer>
      
    </Card>

  );
}

export default Items;

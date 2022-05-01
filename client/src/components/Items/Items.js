import React from "react";
import { Card, Button } from "react-bootstrap";



function Items(props) {
  const { _id, name, image, description, dueDate, itemStatus, page, token } =
    props;
  const findPage = function (page, token, itemStatus) {
    if (page === "admin" && itemStatus === "RESERVED") {
      return <Button>Check OUT</Button>;
    } else if (page === "admin" && itemStatus === "CHECKED_OUT") {
      return <Button>Check In</Button>;
    } else if (page === "gadgets" && token && itemStatus !== "RESERVED") {
      return <Button>Reserve</Button>;
    } else {
      <></>;
    }
  };
  console.log(props);




  return (
    <div>
      <Card key={_id} style={{ width: "24rem" }}>
        {image ? (
          <Card.Img src={image} alt={`image of ${name}`} />
        ) : (
          <p>image not found</p>
        )}
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <span>{itemStatus}</span>
        </Card.Text>
        <Card.Text>{dueDate}</Card.Text>
        {findPage(page, token, itemStatus)}
      </Card>
    </div>
  );
}

export default Items;

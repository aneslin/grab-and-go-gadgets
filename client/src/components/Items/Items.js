import React from "react";
import { Card, Button } from "react-bootstrap";

function Items(props) {
  const { _id, name, image, description } =
    props;
  return (
    <div>
      <Card key={_id}>
        {image ? (
          <Card.Img src={image} alt={`image of ${name}`} />
        ) : (
          <p>image not found</p>
        )}
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card>
    </div>
  );
}

export default Items;

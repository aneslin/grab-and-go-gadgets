import React, {useState} from "react";
import { useMutation } from '@apollo/client';
import { Card, Button } from "react-bootstrap";
import {RESERVE_ITEM} from '../../utils/mutations'
function Items(props) {
  const [ item, setItem] = useState(props)
  const [reserveItem, {data, error}] = useMutation(RESERVE_ITEM)

  const { _id, name, image, description, dueDate, itemStatus, page, token } =
    item;

const handleReserve = async (id) => {
  console.log(id)
  const data = await reserveItem({
    variables:{_id:id, dueDate:"TODAY"}
    
  })
console.log(data)
 
}


  const findPage = function (page, token, itemStatus, _id) {
    if (page === "admin" && itemStatus === "RESERVED") {
      return <Button variant="success">Check OUT</Button>;
    } else if (page === "admin" && itemStatus === "CHECKED_OUT") {
      return <Button variant="danger">Check In</Button>;
    } else if (page === "Gadgets" && token && itemStatus !== "RESERVED") {
      return <Button variant="primary" onClick={()=>handleReserve(_id)}>Reserve</Button>;
    } else if (page === "Gadgets" && itemStatus === "RESERVED") {
      return (
        <Button variant="primary" disabled>
          Reserved
        </Button>
      );
    } else {
      return <></>
    }
  };

  return (
    <div>
      <Card key={_id} style={{ width: "24rem" }} className='m-1'>
        {image ? (
          <Card.Img src={'https://placekitten.com/150/150'} alt={`image of ${name}`} />
        ) : (
          <p>image not found</p>
        )}
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <span>{itemStatus}</span>
        </Card.Text>
        <Card.Text>{dueDate}</Card.Text>
        {findPage(page, token, itemStatus, _id)}
      </Card>
    </div>
  );
}

export default Items;

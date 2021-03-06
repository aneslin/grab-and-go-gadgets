import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_ITEM, ALTER_USER, RETURN_ITEM } from "../utils/mutations";
import "./Admin.css";


const Admin = () => {
  const [returnItemForm, setReturnItemForm] = useState(
    { username:'', itemId:''}
  )
  const [itemFormData, setItemFormData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [createItem, { errorI }] = useMutation(CREATE_ITEM);
  const [userFormData, setUserFormData] = useState({
    username: "",
    userType: "",
  });
  const [alterUser, { errorU }] = useMutation(ALTER_USER);
  const[ returnItem, {errorR}] = useMutation(RETURN_ITEM)
//return item
const handleReturnChange = (event) => {
  const { name, value } = event.target;

  setReturnItemForm({
    ...returnItemForm,
    [name]: value,
  });
};

const handleReturnSubmit = async (event) => {
  event.preventDefault();
  const { data } = await returnItem({
    variables: { ...returnItemForm },
  });
  console.log(data);

  setReturnItemForm({
    username: "",
    itemId: "",
  });
};


  //alter user
  const handleUserChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleAlterUserSubmit = async (event) => {
    event.preventDefault();
    const { data } = await alterUser({
      variables: { ...userFormData },
    });
    console.log(data);

    setUserFormData({
      username: "",
      userType: "",
    });
  };
//item form
  const handleItemChange = (event) => {
    const { name, value } = event.target;

    setItemFormData({
      ...itemFormData,
      [name]: value,
    });
  };

  const handleItemFormSubmit = async (event) => {
    event.preventDefault();

    const { data } = await createItem({
      variables: { ...itemFormData },
    });

    console.log(data);

    // clear form values
    setItemFormData({
      name: "",
      image: "",
      description: "",
    });
  };
  return (
    <div>
      <div>Admin</div>
      <main className="new-image-input">
        <div className="col-12 col-md-10">
          <div className="card">
            <h4 className="card-header">New Image</h4>
            <div className="card-body">
              
              <form onSubmit={handleItemFormSubmit}>
                <input
                  className="form-input"
                  placeholder="name"
                  name="name"
                  type="text"
                  id="name"
                  value={itemFormData.name}
                  onChange={handleItemChange}
                />
                <input
                  className="form-input"
                  placeholder="KITTEN!"
                  name="image"
                  type="text"
                  id="image"
                  value={itemFormData.image}
                  onChange={handleItemChange}
                />
                <input
                  className="form-input"
                  placeholder="description"
                  name="description"
                  type="text"
                  id="description"
                  value={itemFormData.description}
                  onChange={handleItemChange}
                />
                <button className="btn d-block w-100" type="submit">
                  Submit
                </button>
              </form>

              {errorI && <div>Item Creation Failed</div>}
            </div>
          </div>
        </div>
      
      <div>
        <Card className="promote-user">
       <Card.Title> <h4>Promote user</h4></Card.Title>
        <form onSubmit={handleAlterUserSubmit}>
          <input
            className="form-input"
            placeholder="userName"
            name="username"
            type="text"
            id="username"
            value={userFormData.username}
            onChange={handleUserChange}
          />
          <input
            className="form-input"
            placeholder="User Type"
            name="userType"
            type="text"
            id="userType"
            value={userFormData.userType}
            onChange={handleUserChange}
          />
          <Button variant = 'danger' type="submit">
            Submit
          </Button>
        </form>
        {errorU && <div>Alter User Failed</div>}
        </Card>
      </div>
      <div>
        <h4>Return Item</h4>
        <form onSubmit={handleReturnSubmit}>
          <input
            className="form-input"
            placeholder="userName"
            name="username"
            type="text"
            id="username"
            value={returnItemForm.username}
            onChange={handleReturnChange}
          />
          <input
            className="form-input"
            placeholder="itemId"
            name="itemId"
            type="text"
            id="ItemId"
            value={returnItemForm.itemId}
            onChange={handleReturnChange}
          />
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </form>
        {errorU && <div>Alter User Failed</div>}
      </div>
      </main>
    </div>
    
  );
};

export default Admin;

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_ITEM, ALTER_USER } from "../utils/mutations";

const Admin = () => {
  const [itemFormData, setItemFormData] = useState({name:'', image:'', description:''});
  const [createItem, { errorI }] = useMutation(CREATE_ITEM);
  const [ userFormData, setUserFormData] = useState({username:'', userType:''})
  const [alterUser, {errorU}] = useMutation(ALTER_USER)

  const handleUserChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleAlterUserSubmit = async (event) => {
    event.preventDefault()
    const {data} = await alterUser({
      variable: { ... itemFormData}
    })
    console.log(data)

    setUserFormData({
      username:'',
      userType:''

    })
  }
  
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
  
   console.log(data)
  
    // clear form values
    setItemFormData({
      name: '',
      image: '',
      description:''
    });
  }
  return (
    <div>
      <div>Admin</div>
      <main className="flex-row justify-center mb-4 form-body">
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
    </main>
        <div>
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
                value={itemFormData.image}
                onChange={handleUserChange}
              />
              </form>
              {errorU && <div>Alter User Failed</div>}
        </div>
    </div>
  );
};

export default Admin;

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_ITEM } from "../utils/mutations";

const Admin = () => {
  const [itemFormData, setItemFormData] = useState({name:'', image:'', description:''});
  const [createItem, { error }] = useMutation(CREATE_ITEM);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setItemFormData({
      ...itemFormData,
      [name]: value,
    });
  };


  const handleFormSubmit = async (event) => {
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
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="name"
                name="name"
                type="text"
                id="name"
                value={itemFormData.name}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="KITTEN!"
                name="image"
                type="text"
                id="image"
                value={itemFormData.image}
                onChange={handleChange}
              />
               <input
                className="form-input"
                placeholder="description"
                name="description"
                type="text"
                id="description"
                value={itemFormData.description}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
        
    </div>
  );
};

export default Admin;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css"

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    userType: '',
  });
  const [createUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4 form-body">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header text-center">Sign Up</h4>
          <div className="card-body">
            <Form onSubmit={handleFormSubmit}>
              <input
                className="form-control mb-3"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-control mb-3"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-control mb-3"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />

              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </Form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
        <div className="py-4">
    <p className="text-center">
      Already have an Account? <Link to="/login">Login</Link>
    </p>
  </div>
      </div>
    </main>

  );
};

export default Signup;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import "./Login.css"
import { Link } from "react-router-dom";

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 form-body">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header text-center">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
              // get the form input in the middle
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
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      <div className="py-4">
    <p className="text-center">
      Don't have an account? <Link to="/signup">Signup</Link>
    </p>
  </div>
      </div>
    </main>
  );
};

export default Login;
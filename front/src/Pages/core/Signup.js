import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../Components/core/Layout';
import { register } from '../../functions/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
  error: '',
  showPassword: false,
};

const Signup = ({ history, location }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [show, setShow] = useState(false);
  const redirect = location.search ? location.search.split('=')[1] : '';

  const { name, email, password } = values;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ name, email, password }, dispatch).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        toast.error(data.error);
      } else {
        console.log('REGISTER SUCCESS:', data);
        setValues(initialState);
        history.push(`/${redirect}`);
      }
    });
  };

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  return (
    <Layout
      title="Signup"
      className="container col-md-8 offset-md-2"
      description="Signup yourself to start booking..."
    >
      <div className="signup-form">
        <form onSubmit={onSubmitHandler}>
          <h2> Signup </h2>
          <p>Please fill in this form to create an account!</p>
          <hr />
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                onChange={onChangeHandler('name')}
                placeholder="Enter your name"
                className="form-control"
                value={name}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-paper-plane"></span>
                </span>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={onChangeHandler('email')}
                className="form-control"
                value={email}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-lock"></span>
                </span>
              </div>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Password..."
                onChange={onChangeHandler('password')}
                className="form-control"
                value={password}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShow(!show)}
                  className="fa fa-eye"
                ></button>
              </div>
            </div>
          </div>
          <div className="form-group d-flex justify-content-center">
            <button
              type="submit"
              onClick={onSubmitHandler}
              className="btn btn-outline-success btn-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          Already have an account?
          <Link to={!location.search ? '/login' : `/login${location.search}`}>
            Login
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../Components/core/Layout';
import { googleLogin, login } from '../../functions/auth';
import queryString from 'query-string';

const initialState = {
  email: '',
  password: '',
  error: '',
  showPassword: false,
};

const Login = ({ location, history, match }) => {
  const params = queryString.parse(location.search);
  console.log(params);
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [show, setShow] = useState(false);
  const redirect = location.search ? location.search.split('=')[1] : '';

  const { email, password } = values;
  console.log({ location, history, match });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    login({ email, password }, dispatch).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
        toast.error(data.error);
      } else {
        console.log('LOGIN SUCCESS:', data);
        setValues({
          ...values,
          email: '',
          password: '',
          error: '',
        });
        history.push(`/${redirect}`);
      }
    });
  };

  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  return (
    <Layout
      title="Login"
      className="container col-md-8 offset-md-2"
      description="Login to start booking..."
    >
      <div className="signup-form">
        <form>
          <h2> Login </h2>
          <p>Please fill in this form to login!</p>
          <hr />
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
              className="btn btn-outline-success mr-3 btn-lg"
            >
              Login
            </button>
            <a
              href="/api/v1/users/google"
              className="btn btn-outline-danger btn-lg"
            >
              <i className="fab fa-google"></i> Login through google
            </a>
          </div>
        </form>
        <div className="text-center">
          New to CC Airlines?{' '}
          <Link to={!location.search ? '/signup' : `/signup${location.search}`}>
            Signup
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

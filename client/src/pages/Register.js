import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/auth';
import { Link } from 'react-router-dom';

const Signup = ({ history }) => {
  const [values, setValues] = useState({
      email: '',
      password: '',
      name: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const googleLogin = async (e) => {
    e.preventDefault();
    // dispatch(actualLogin(result.user));
    history.push('/');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(values)
    await dispatch(signup(values))
    setLoading(false);

  };
  
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h3>Signup</h3> : <h3>Loading...</h3>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control mb-2"
                required
                value={values.name}
                onChange={(e) => setValues({...values, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-2"
                required
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                minLength="6"
                required
                className="form-control"
                value={values.password}
                onChange={(e) => setValues({...values, password: e.target.value})}
              />
            </div>
            <Button
              onClick={submitHandler}
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              disabled={loading || !values.email || values.password.length < 6}
              type="ghost"
              className="mb-3"
            >
              Signup with Email/Password
            </Button>
            <Button
              onClick={googleLogin}
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
              className="mb-3"
              disabled={loading}
              type="danger"
            >
              Signup with Google
            </Button>
            <div className="d-flex row justify-content-around mt-3">
              <p>
                Already a member?
                <Link to="/register">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

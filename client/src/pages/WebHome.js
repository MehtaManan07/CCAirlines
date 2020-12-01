import React, { useState } from 'react';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { webCheck } from '../redux/actions/airport';

const Login = ({ history }) => {
  const [values, setValues] = useState({ email: '', pnr: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(webCheck(values,history));
    } catch (error) {
        console.log(error)
        
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h3>Web check-In</h3> : <h3>Loading...</h3>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-2"
                autoFocus
                required
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="PNR"
                required
                className="form-control"
                value={values.pnr}
                onChange={(e) => setValues({ ...values, pnr: e.target.value })}
              />
            </div>
            <Button
              onClick={submitHandler}
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
            //   disabled={loading || !values.email || !values.pnr}
              type="ghost"
              className="mb-3"
            >
              Check in
            </Button>
            <Button
              onClick={() => history.push('/')}
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              type="ghost"
              className="mb-3"
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

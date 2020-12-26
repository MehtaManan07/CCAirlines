import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../functions/auth';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        CC Airlines
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/flights/search">
              Book now
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/flights/all">
              View FLights
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/web/check">
              Web Checkin
            </Link>
          </li>
        </ul>
        {localStorage.getItem('ccAirlinesAuth') ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span
                onClick={() => {
                  logout(dispatch);
                  history.push('/');
                }}
                style={{ cursor: 'pointer' }}
                className="nav-link"
                to="#"
              >
                Logout
              </span>
            </li>
            <li className="nav-item">
              {user && (
                <Link
                  className="nav-link"
                  to={{ pathname: `/${user.role}/dashboard` }}
                >
                  Dashboard
                </Link>
              )}
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

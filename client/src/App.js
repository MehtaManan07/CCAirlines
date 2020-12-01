import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Register';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/actions/auth';
import Flights from './pages/Flights';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('clientCC')) {
      dispatch(getMe());
    }
  }, []);
  return (
    <>
      <ToastContainer
        autoClose={3000}
        position="bottom-center"
        hideProgressBar
      />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Signup} />
        <Route path="/flights" exact component={Flights} />
      </Switch>
    </>
  );
};

export default App;

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/actions/auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Register';
import Flights from './pages/Flights';
import Booking from './pages/Booking';
import WebHome from './pages/WebHome';
import NewFlight from './pages/NewFlight';

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
        <Route path="/flights/new" exact component={NewFlight} />
        <Route path="/booking/:id" exact component={Booking} />
        <Route path="/web_check" exact component={WebHome} />
      </Switch>
    </>
  );
};

export default App;

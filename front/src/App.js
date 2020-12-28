import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch } from 'react-redux';
import Home from './Pages/core/Home';
import Signup from './Pages/core/Signup';
import Login from './Pages/core/Login';
import FlightSearch from './Pages/flight/FlightSearch';
import AllFlights from './Pages/flight/AllFlights';
import Booking from './Pages/booking/Booking';
import UserDashboard from './Pages/dashboard/UserDashboard';
import PrivateRoute from './Components/core/PrivateRoute';
import GuestRoute from './Components/core/GuestRoute';
import WebCheck from './Pages/webCheck/WebCheck';
import NewFlight from './Pages/flight/NewFlight';
import AdminDashboard from './Pages/dashboard/AdminDashboard';
import AllBookings from './Pages/booking/AllBookings';
import WebSeat from './Pages/webCheck/WebSeat';
import WebSeatSelect from './Pages/webCheck/WebSeatSelect';
import WebLuggage from './Pages/webCheck/WebLuggage';
import WebPass from './Pages/webCheck/WebPass';
import { getMe } from './functions/auth';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('ccAirlinesAuth')) {
      getMe(dispatch)
    }
  }, []);
  return (
    <div>
      <ToastContainer autoClose={3000} position="bottom-center" />
      <Switch>
        <Route path="/" exact component={Home} />
        <GuestRoute path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute
          path="/superuser/dashboard"
          exact
          component={AdminDashboard}
        />
        <Route path="/flights/search" exact component={FlightSearch} />
        <Route path="/flights/all" component={AllFlights} />
        <PrivateRoute
          path="/booking/:id/:passengers"
          exact
          component={Booking}
        />
        <Route path="/bookings/all" exact component={AllBookings} />
        <Route path="/flights/new" exact component={NewFlight} />
        <Route path="/web/check" exact component={WebCheck} />
        <Route path="/web/seat_select/:pnr" exact component={WebSeat} />
        <Route path="/web/seats/change/:bookId" exact component={WebSeatSelect} />
        <Route path="/web/baggage/:id" exact component={WebLuggage} />
        <Route path="/web/boarding-pass/:id" exact component={WebPass} />
      </Switch>
    </div>
  );
};

export default App;

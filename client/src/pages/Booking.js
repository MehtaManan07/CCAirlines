import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import BookingTable from '../components/BookingTable';
import { getSingleFlight, newBooking } from '../redux/actions/airport';

const Booking = (props) => {
  const dispatch = useDispatch();
  const airport = useSelector((state) => state.airport);
  const { flight } = airport;
  const [passengers, setPassengers] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(getSingleFlight(props.match.params.id));
  }, []);

  const submitHandler = async (e) => {
    setShow(false);
    e.preventDefault();
    if (passengers.length !== 3) {
      alert('Please add only three passengers');
      return;
    }
    await dispatch(newBooking(passengers, props.match.params.id));
    setShow(true);
    props.history.push('/');
  };
  console.log(passengers);
  return (
    <div className="container p-5">
      {show ? (
        <>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h5>New Booking for flight {flight && flight.name}</h5>
              <br />
              <br />
              <BookingTable
                passengers={passengers}
                setPassengers={setPassengers}
              />
              <br />
              <button
                onClick={submitHandler}
                className="btn btn-block btn-primary"
              >
                Book Tickets
              </button>
            </div>
          </div>
          <h5>
            Side note to everyone:
            <p>
              {' '}
              Backend is capable of taking dynaic number of passengers for every
              booking, just for sake of simplicity, I have not included the same
              here in client side!!{' '}
            </p>
          </h5>
        </>
      ) : <h1> BOOKING IN PROCESS... </h1>}
    </div>
  );
};

export default Booking;

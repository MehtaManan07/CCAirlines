import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { getBooking } from '../../functions/booking';
import moment from 'moment';
import Layout from '../../Components/core/Layout';
import Loader from '../../Components/core/Loader';
import PassengerTable from '../../Components/webCheck/PassengerTable';

const WebSeat = (props) => {
  const history = useHistory();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pnr } = props.match.params;

  useEffect(() => {
    getBooking(pnr).then((res) => {
      if (res.success) {
        setBooking(res.data);
        setLoading(false);
      }else {
        toast.error(res.data.error)
        setLoading(false);
      }
    });
  }, []);
  return (
    <Layout
      description="Check-in with the seat of your choice"
      className="container mb-5"
    >
      {loading ? (
        <Loader text="Loading..." />
      ) : booking ? (
        <>
          <div className="row">
            <h3> {booking.flight.from.city}</h3> <h4>&#8594;</h4>
            <h3> {booking.flight.to.city}</h3>
          </div>
          <div className="row">
            <h6 className="text-muted">
              {moment
                .utc(booking.flight.departureDate)
                .local()
                .format(' MMM Do YYYY, h:mm A')}
                <strong> | </strong> {booking.user.email}
            </h6>
          </div>
          <div className="row mb-3">
            <PassengerTable booking={booking} />
          </div>
          <div className="row d-flex justify-content-center">
            <button
              onClick={() => history.push(`/web/baggage/${pnr}`)}
              className="btn btn-outline-success btn-lg"
            >
              Proceed to check in luggage
            </button>
          </div>
        </>
      ) : history.goBack()}
    </Layout>
  );
};

export default WebSeat;

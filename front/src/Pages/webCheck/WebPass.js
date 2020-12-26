import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../Components/core/Layout';
import Loader from '../../Components/core/Loader';
import { webPass } from '../../functions/webCheck';
import moment from "moment";

const WebPass = ({ match }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    webPass(match.params.id).then((res) => {
      if (res.success) {
        setBooking(res.data);
        setLoading(false);
      }
      toast.error(res.data.error);
    });
  }, []);
  return (
    <Layout
      title="HAPPY JOURNEY"
      description="Your Boarding Pass"
      className="container-fluid"
    >
      {!loading && booking ? (
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
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default WebPass;

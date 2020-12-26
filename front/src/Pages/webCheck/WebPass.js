import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../Components/core/Layout';
import Loader from '../../Components/core/Loader';
import { webPass } from '../../functions/webCheck';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import PassengerTable from '../../Components/webCheck/PassengerTable';
import FinalFlightTable from '../../Components/flight/FinalFlightTable';

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
          <Row className="mt-4">
            <Col style={{ border: '1px solid black' }} xs={6}>
              <table className="table">
                <tr>
                  <td>PNR</td>
                  <td>{booking._id}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{booking.price}</td>
                </tr>
                <tr>
                  <td>Seats</td>
                  <td>{booking.numSeats}</td>
                </tr>
                <tr>
                  <td>User</td>
                  <td>{booking.user.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{booking.user.email}</td>
                </tr>
                <tr>
                  <td>FLight</td>
                  <td>{booking.flight.name}</td>
                </tr>
              </table>
              <img
                style={{
                  height: 300,
                  width: 350,
                  display: 'inline-flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                  borderRadius: 50,
                }}
                src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201809/RTR3K9VL_0.jpeg?r_z5zTPzhxB4S_09Dk6GKoOBk7U5MR3N"
                alt="Flight"
              />
            </Col>
            <Col style={{ border: '1px solid black' }} xs={6}>
              <Row className="p-3">
                <PassengerTable booking={booking} final />
              </Row>
              <Row className="p-3">
                <FinalFlightTable flight={booking.flight} final />
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default WebPass;

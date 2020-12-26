import React, { useState, useEffect } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../Components/core/Layout';
import Loader from '../../Components/core/Loader';
import { allBookings } from '../../functions/booking';
import Chart from '../../Components/core/Chart';

const AdminDashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    setLoading(true);
    allBookings().then((res) => {
      if (res.success) {
        setBookings(res.data);
        setLoading(false);
      }
      setLoading(false);
    });
  }, []);
  return (
    <Layout title={`${user.name && user.name.split(' ')[0]}'s Dashboard`}>
      {loading ? (
        <Loader />
      ) : !bookings ? (
        <h3> No Bookings found </h3>
      ) : (
        <>
          <Row>
            <Col xs={3}>
              {/* <Sidebar /> */}
              <div>
                <Nav className="col-md-12 d-none d-md-block bg-light">
                  <div className="myTestClass">
                    <Nav.Link onClick={() => history.push('/flights/new')}>
                      New Flight
                    </Nav.Link>
                    <Nav.Link
                      onClick={() =>
                        history.push('/bookings/all', { bookings })
                      }
                    >
                      All Bookings
                    </Nav.Link>
                    <Nav.Link onClick={() => history.push('/flights/all')}>
                      All Flights
                    </Nav.Link>
                  </div>
                </Nav>
              </div>
            </Col>
            <Col xs={9}>
              <Chart items={bookings} />
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default AdminDashboard;

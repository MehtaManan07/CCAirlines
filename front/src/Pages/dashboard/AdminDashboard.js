import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../Components/core/Layout';

const AdminDashboard = ({ history }) => {
  const user = useSelector((state) => state.user);
  return (
    <Layout title={`${user.name && user.name.split(' ')[0]}'s Dashboard`}>
      <>
        <Row>
          <Col xs={2}>
            {/* <Sidebar /> */}
            <div>
              <Nav className="col-md-12 d-none d-md-block bg-light">
                <div className="myTestClass">
                  <Nav.Link onClick={() => history.push('/flights/new')}>
                    New Flight
                  </Nav.Link>
                  <Nav.Link onClick={() => history.push('/bookings/all')}>
                    All Bookings
                  </Nav.Link>
                  <Nav.Link onClick={() => history.push('/flights/all')}>
                    All Flights
                  </Nav.Link>
                </div>
              </Nav>
            </div>
          </Col>
          <Col xs={10}>this is a test</Col>
        </Row>
      </>
    </Layout>
  );
};

export default AdminDashboard;

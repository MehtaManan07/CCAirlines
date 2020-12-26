import React, { useState } from 'react';
import Layout from '../../Components/core/Layout';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { webCheck } from '../../functions/webCheck';

const WebCheck = ({ history }) => {
  const [email, setEmail] = useState('');
  const [pnr, setPnr] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !pnr) {
      toast.error('Please enter all fields');
      return;
    }
    webCheck(email, pnr).then((res) => {
      if (res.success) {
        history.push(`/web/seat_select/${pnr}`);
      }
      toast.error(res.data.error);
    });
  };

  return (
    <Layout
      title="Web Check In"
      description="Online web check in with some easy steps"
      className="container col-md-10 md-offset-1"
    >
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>PNR number</Form.Label>
          <Form.Control
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            type="text"
            placeholder="Enter your 24 digit PNR"
          />
        </Form.Group>
        <Button variant="outline-success" onClick={submitHandler}>
          Check In
        </Button>
      </Form>
    </Layout>
  );
};

export default WebCheck;

import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Layout from '../../Components/core/Layout';
import { baggageCheck } from '../../functions/webCheck';

const WebLuggage = ({ match, history }) => {
  const id = match.params.id;
  const [weight, setWeight] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    baggageCheck(id, weight).then((res) => {
      if (res.success) {
        let price = weight > 15 ? (weight - 15) * 200 : 0;
        toast.info(`Rs ${price} extra are charged for luggage`);
        history.push(`/web/boarding-pass/${id}`);
      } else {
        toast.error(res.data.error)
      }
    });
  };
  return (
    <Layout
      title="Luggage check in"
      description="Check your luggage in"
      className="container col-md-10 md-offdet-1"
    >
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row}>
          <Col xs={4}>
            <Form.Label>
              Weight <p className="text-muted">In Kilograms</p>
            </Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control
              type="number"
              min="0"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
            />
          </Col>
        </Form.Group>
        <button className="btn btn-outline-primary" type="submit">
          Print Boarding Pass
        </button>
      </Form>
    </Layout>
  );
};

export default WebLuggage;

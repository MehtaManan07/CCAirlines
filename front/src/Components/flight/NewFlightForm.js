import React from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import Select from 'react-select';

const FlightNew = ({
  staff,
  airports,
  submitHandler,
  values,
  setValues,
  validated,
}) => {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const seatHandler = (classN) => (e) => {
    setValues({
      ...values,
      seatsToAdd: { ...values.seatsToAdd, [classN]: e.target.value },
    });
  };

  const staffOptions =
    staff &&
    staff.map((each) => {
      const { _id, name } = each;
      return { value: _id, label: name };
    });

  const featureOptions = [
    { value: 'breakfast', label: 'breakfast' },
    { value: 'drinks', label: 'drinks' },
    { value: 'magazine', label: 'magazine' },
    { value: 'dinner', label: 'dinner' },
  ];

  return (
    <div>
      <Form
        className="mt-4"
        noValidate
        validated={validated}
        onSubmit={submitHandler}
      >
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            Name
          </Form.Label>
          <Col sm="11">
            <Form.Control
              required
              name="name"
              value={values.name}
              onChange={onChangeHandler}
              placeholder="Enter flight name"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            From
          </Form.Label>
          <Col sm="11">
            <Form.Control
              name="from"
              as="select"
              value={values.from}
              onChange={onChangeHandler}
              placeholder="Departure Airport"
            >
              <option disabled value="">
                Source Airport
              </option>
              {airports &&
                airports.length > 5 &&
                airports.map((a, i) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            To
          </Form.Label>
          <Col sm="11">
            <Form.Control
              name="to"
              as="select"
              value={values.to}
              onChange={onChangeHandler}
              placeholder="Arrival Airport"
            >
              <option disabled value="">
                Destination Airport
              </option>
              {airports &&
                airports.length > 5 &&
                airports.map((a, i) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            Departure
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="dateTime-local"
              name="departureDate"
              value={values.departureDate}
              onChange={onChangeHandler}
              placeholder="Enter departure Date"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            Arrival
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="dateTime-local"
              name="arrivalDate"
              value={values.arrivalDate}
              onChange={onChangeHandler}
              placeholder="Enter arrival Date"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            Crew Staff
          </Form.Label>
          <Col sm="11">
            <Select
              isMulti
              onChange={(e) => {
                setValues({
                  ...values,
                  crewStaff: e && e.map((lol) => lol.value),
                });
              }}
              options={staffOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            Facilities
          </Form.Label>
          <Col sm="11">
            <Select
              isMulti
              onChange={(e) => {
                setValues({
                  ...values,
                  features: e && e.map((lol) => lol.value),
                });
              }}
              options={featureOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1">
            Seats
          </Form.Label>
          <Col className="d-flex justify-content-between" sm="11">
            <Form.Group>
            <Form.Label>
            For Economy Class
            </Form.Label>
              <Form.Control
                type="number"
                max="50"
                value={values.seatsToAdd.Economy}
                onChange={seatHandler('Economy')}
                placeholder="Seats for Economy Class"
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>
            For Business Class
            </Form.Label>
              <Form.Control
                type="number"
                max="50"
                value={values.seatsToAdd.Business}
                onChange={seatHandler('Business')}
                placeholder="Seats for Business Class"
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>
            For First Class
            </Form.Label>
              <Form.Control
                type="number"
                max="50"
                value={values.seatsToAdd.FirstClass}
                onChange={seatHandler('FirstClass')}
                placeholder="Seats for First Class"
              />
            </Form.Group>
          </Col>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="text-center"
            variant="outline-success"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FlightNew;

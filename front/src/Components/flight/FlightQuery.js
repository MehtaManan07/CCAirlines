import React from 'react';
import Select from 'react-select';
import { Form, Col, Row, Button } from 'react-bootstrap';
import Checkbox from './Checkbox';

const FlightQuery = ({
  filters,
  setFilters,
  submitHandler,
  checkValues,
  setCheckValues,
  passNum,
  setPassNum,
}) => {
  const priceOptions = [
    { value: '1000000', label: 'Any' },
    { value: '10000', label: 'Rs 10000' },
    { value: '8000', label: 'Rs 8000' },
    { value: '6000', label: 'Rs 6000' },
    { value: '4000', label: 'Rs 4000' },
    { value: '2000', label: 'Rs 2000' },
  ];

  const featureOptions = [
    { value: 'breakfast', label: 'breakfast' },
    { value: 'drinks', label: 'drinks' },
    { value: 'magazine', label: 'magazine' },
    { value: 'dinner', label: 'dinner' },
  ];

  return (
    <div className="d-flex flex-column pl-3 pt-3 pr-3">
      <div className="p-2">
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="1">
              Passengers
            </Form.Label>
            <Col sm="11">
              <input
                type="number"
                className="form-control"
                value={passNum}
                onChange={(e) => setPassNum(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
      <h4 className="text-center"> Filter </h4>
      <div className="p-2">
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row}>
            <Form.Label column sm="1">
              Budget
            </Form.Label>
            <Col sm="11">
              <Select
                onChange={(e) => {
                  setFilters({ ...filters, basePrice: e.value });
                }}
                options={priceOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="1">
              Dates
            </Form.Label>
            <Col sm="11">
              <Form.Control
                type="date"
                value={filters.departureString}
                onChange={(e) =>
                  setFilters({ ...filters, departureString: e.target.value })
                }
              ></Form.Control>
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
                  setFilters({
                    ...filters,
                    features: e && e.map((lol) => lol.value),
                  });
                }}
                options={featureOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Col>
          </Form.Group>
          <h4 className="text-center"> Sort </h4>
          <Checkbox checkValues={checkValues} setCheckValues={setCheckValues} />
          <div className="text-center">
            <Button
              type="submit"
              block
              className="mt-2"
              variant="outline-primary"
            >
              Search Flights
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FlightQuery;

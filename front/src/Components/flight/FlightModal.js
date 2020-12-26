import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

const FlightModal = ({ flight, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-center'>
          <div className="">Flight Details</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {flight ? (
          <table className="table table-bordered text-center table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Name</td>
                <td>{flight.name}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Total staff members</td>
                <td>{flight.crewStaff.length}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>From</td>
                <td>{flight.from.name}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>To</td>
                <td>{flight.to.name}</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Departure Date</td>
                <td>
                  {moment.utc(flight.departureDate).local().format('DD-MM-YYYY')}
                </td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Departure Time</td>
                <td>
                  {moment.utc(flight.departureDate).local().format('HH:mm A')}
                </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Arrival Time</td>
                <td>
                  {moment.utc(flight.arrivalDate).local().format('HH:mm A')}{' '}
                </td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Duration</td>
                <td>{Math.round(flight.duration)} hours</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Available Seats</td>
                <td>{flight.totalSeats - flight.bookedSeats.length}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h5>Loading...</h5>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FlightModal;

import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import FinalFlightTable from './FinalFlightTable';

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
          <FinalFlightTable flight={flight} />
        ) : (
          <h5>Loading...</h5>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FlightModal;

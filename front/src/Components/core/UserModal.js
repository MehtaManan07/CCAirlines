import React from 'react';
import { Modal } from 'react-bootstrap';

const UserModal = ({ user, showB, onHideB }) => {

  return (
    <Modal
      show={showB}
      onHide={onHideB}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
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
                <td>Id</td>
                <td>{user._id}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Phone no.</td>
                <td>{user.phoneNum}</td>
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

export default UserModal;

import React from 'react';
import { useHistory } from 'react-router-dom';

const PassengerTable = ({ booking }) => {
  const history = useHistory();
  return (
    <table className="table table-striped table-bordered text-center table-hover">
      <thead className="thead-dark">
        <tr>
          <td>#</td>
          <td>Passenger Name</td>
          <td>Seat No</td>
          <td>Class</td>
          <td>Edit</td>
        </tr>
      </thead>
      <tbody>
        {booking.passengers.map((passenger, i) => (
          <tr key={passenger._id}>
            <td>{i + 1}</td>
            <td>{passenger.name}</td>
            <td>{passenger.seat.seatName}</td>
            <td>{passenger.seat.type}</td>
            <td>
              <button
                // disabled={passenger.boarded}
                onClick={() =>
                  history.push(`/web/seats/change/${booking.flight._id}`, { passenger, booking })
                }
                className="btn btn-primary"
              >
                {passenger.boarded ? 'Boarded' : 'Edit Seat'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PassengerTable;

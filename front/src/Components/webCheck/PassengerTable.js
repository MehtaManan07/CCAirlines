import React from 'react';
import { useHistory } from 'react-router-dom';

const PassengerTable = ({ booking, final = false }) => {
  const history = useHistory();
  return (
    <table className="table table-striped table-bordered text-center table-hover">
      <thead className="thead-dark">
        <tr>
          <td>#</td>
          <td>Passenger Name</td>
          <td>Seat No</td>
          <td>Class</td>
         {!final && <td>Edit</td>}
        </tr>
      </thead>
      <tbody>
        {booking.passengers.map((passenger, i) => (
          <tr key={passenger._id}>
            <td>{i + 1}</td>
            <td>{passenger.name}</td>
            <td>{passenger.seat.seatName}</td>
            <td>{passenger.seat.type}</td>
           {!final && <td>
              <button
                disabled={passenger.boarded}
                onClick={() =>
                  history.push(`/web/seats/change/${booking.flight._id}`, { passenger, booking })
                }
                className="btn btn-primary"
                style={{ cursor: !passenger.boarded ? 'pointer' : 'no-drop' }}
              >
                {passenger.boarded ? 'Boarded' : 'Edit Seat'}
              </button>
            </td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PassengerTable;

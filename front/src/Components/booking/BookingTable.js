import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { cancelBooking } from '../../functions/booking';
import UserModal from '../core/UserModal';
import FlightModal from '../flight/FlightModal';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
const BookingTable = ({ user, bookings, admin = false }) => {
  const dispatch = useDispatch();
  const [flight, setFlight] = useState(null);
  const [show, setShow] = useState(false);
  const [showB, setShowB] = useState(false);
  const [userB, setUserB] = useState(null);
  const cancelBook = (e, booking) => {
    e.preventDefault();
    cancelBooking(booking._id).then((res) => {
      if (res.success) {
        toast.warning('Booking cancelled');
        Axios.get('/api/v1/users/me')
          .then((res) => {
            dispatch({
              type: 'SET_USER',
              payload: res.data.data,
            });
          })
          .catch((err) => console.log(err));
      }
      toast.error(res.data.error);
    });
  };
  return (
    <div>
      <UserModal showB={showB} user={userB} onHideB={() => setShowB(false)} />
      <FlightModal show={show} flight={flight} onHide={() => setShow(false)} />
      <div>
        {user && (
          <table className="table table-striped table-bordered text-center table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">PNR</th>
                {admin && <th scope="col">User</th>}
                <th scope="col">Passengers</th>
                <th scope="col">FLight</th>
                <th scope="col">Checked In</th>
                <th scope="col">Paid</th>
                <th scope="col">Final Price</th>
                <th scope="col">{``}</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking, i) => {
                  return (
                    <tr
                      style={{
                        backgroundColor: !booking.active && '#C1BAB9',
                        cursor: !booking.active && 'no-drop',
                      }}
                      key={i}
                    >
                      <th scope="row">{i + 1}</th>
                      <td>{booking._id}</td>
                      {admin && (
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={(e) => {
                              setUserB(booking.user);
                              setShowB(true);
                            }}
                          >
                            Details
                          </button>
                        </td>
                      )}
                      <td>{booking.passengers.length}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            setFlight(booking.flight);
                            setShow(true);
                          }}
                        >
                          Details
                        </button>
                      </td>
                      <td>{booking.checkedIn ? 'True' : 'False'}</td>
                      <td>{booking.paid ? 'True' : 'False'}</td>
                      <td>
                        Rs <strong>{Math.round(booking.price)}</strong>
                      </td>
                      <td>
                        { booking.checkedIn ? (
                          <button className="btn btn-success" disabled>
                            Checked in
                          </button>
                        ) : booking.active ? (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => cancelBook(e, booking)}
                          >
                            Cancel Booking
                          </button>
                        ) : (
                          <button className="btn btn-danger" disabled>
                            Cancelled booking
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <h3 className="text-center">NO BOOKINGS FOUND</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTable;

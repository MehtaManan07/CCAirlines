import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const SeatSelect = (props) => {
  const [passengerId, setPassengerId] = useState('');
  const [seats, setSeats] = useState(null);
  const [booking, setBooking] = useState(null);
  const [show, setShow] = useState(false);
  const submitHandler = async (e, p) => {
    e.preventDefault();
    const res = await Axios.get(`/api/v1/flights/seat/${booking && booking.flight}`);
    await setPassengerId(p);
    await setSeats(res.data.data);
    setShow(true);
  };
  useEffect(() => {
    loadBOoking(props.match.params.id);
  }, []);
  const loadBOoking = async (id, flightId) => {
    const { data } = await Axios.get(`/api/v1/bookings/${id}`);

    await setBooking(data.data);

    console.log(data);
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {booking && (
            <table className="table table-striped table-bordered text-center table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Seat number</th>
                  <th scope="col">{``}</th>
                </tr>
              </thead>
              <tbody>
                {booking && booking.passengers.length > 0 ? (
                  booking.passengers.map((p, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{p.name}</td>
                      <td>{p.seat}</td>
                      <td
                        onClick={(e) => submitHandler(e, p)}
                        className="btn btn-success"
                      >
                        Book now
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          )}
          {show && (
            <table className="table table-striped table-bordered text-center table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Seat number</th>
                  <th scope="col">Available</th>
                  <th scope="col">{``}</th>
                </tr>
              </thead>
              <tbody>
                {seats && seats.length > 0 ? (
                  seats.map((a, i) => (
                    <tr key={i + 1221}>
                      <th scope="row">{i + 1}</th>
                      <td>{a._id}</td>
                      <td>{a.available ? 'Available' : 'Taken'}</td>
                      <td
                        onClick={async (e) => {
                          e.preventDefault();
                          if (
                            window.confirm("Are you sure? This can't be undone")
                          ) {
                            await Axios.post(`/api/v1/web_check/change`, {
                              passengerId,
                              reqSeatId: a._id,
                            });
                            setShow(false)
                            setPassengerId('');
                            window.location.reload()
                          } else {setShow(false);setPassengerId('')};
                        }}
                        className="btn btn-success"
                      >
                        Select Now
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelect;

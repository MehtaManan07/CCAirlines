import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const FlightTable = ({ flights, passengers = 1 }) => {
  const history = useHistory();
  // const calcDate = (d) => {
  //   if (d.splice(-1) !== 'Z') {
  //     return d;
  //   } else {
  //     return moment.utc(flight.departureDate).format('D-M-YY');
  //   }
  // };
  return (
    <div>
      {flights.length > 0 ? (
        <>
          <table className="table table-striped table-bordered text-center table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">From - To</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Features</th>
                <th scope="col">Base Price</th>
                <th scope="col">{``}</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{flight.name}</td>
                  <td>
                    {flight.from.city} - {flight.to.city}
                  </td>
                  <td>{moment.utc(flight.departureDate).format('D-M-YY')}</td>
                  <td>
                    {moment.utc(flight.departureDate).format('HH:mm A')} -{' '}
                    {moment.utc(flight.arrivalDate).format('HH:mm A')}
                  </td>
                  <td>{flight.features.join(',')}</td>
                  <td>
                    Rs <strong>{Math.round(flight.basePrice)}</strong>
                  </td>
                  <td>
                    {localStorage.getItem('ccAirlinesAuth') ? (
                      <Link
                        to={`/booking/${flight._id}/${passengers}`}
                        className="btn btn-success"
                      >
                        Book now
                      </Link>
                    ) : (
                      <Link
                        to={`/login?redirect=booking/${flight._id}/${passengers}`}
                        className="btn btn-success"
                      >
                        Login to book
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3 className="text-center">NO FLIGHTS FOUND</h3> <br />
          <div className="text-center">
            <span
              onClick={() => history.goBack()}
              style={{ cursor: 'pointer', color: 'blue' }}
              className="mr-3"
            >
              Go back
            </span>
            <span
              onClick={() => {
                history.push('/flights/all');
                window.location.reload();
              }}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              View All Flights
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightTable;

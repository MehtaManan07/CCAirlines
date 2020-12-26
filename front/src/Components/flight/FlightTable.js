import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const FlightTable = ({ flights, passengers = 1 }) => {
  const history = useHistory();
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
                  <td>
                    {moment.utc(flight.departureDate).local().format('D-M-YY')}
                  </td>
                  <td>
                    {moment.utc(flight.departureDate).local().format('HH:mm A')}{' '}
                    - {moment.utc(flight.arrivalDate).local().format('HH:mm A')}
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
            <span onClick={() => history.goBack()} style={{ cursor: 'pointer', color: 'blue' }} className="mr-3">
              Go back
            </span>
            <span onClick={() => window.location.reload()} style={{ cursor: 'pointer', color: 'blue' }}>
              Refresh
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightTable;

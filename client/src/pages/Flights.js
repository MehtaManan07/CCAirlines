import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Flights = (props) => {
  const dispatch = useDispatch();
  const airport = useSelector((state) => state.airport);
  const { flights } = airport;

  return (
    
    <div className="container p-5">
      <div className="row">
        <div className="col-md-10 offset-md-1">
      {flights && (
        <table className="table table-striped table-bordered text-center table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Arrival</th>
              <th scope="col">Departure</th>
              <th scope="col">Base Price</th>
              <th scope="col">{``}</th>
            </tr>
          </thead>
          <tbody>
            {flights && flights.length > 0 ? (
              flights.map((flight, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{flight.name}</td>
                  <td>{flight.duration} hours</td>
                  <td>{flight.arrivalDate.substr(11,5)} </td>
                  <td>{flight.departureDate.substr(11,5)}</td>
                  <td>Rs {flight.basePrice}</td>
                  <Link to={`/booking/${flight._id}`} className='btn btn-success'>Book now</Link>
                </tr>
              ))
            ) : (
              <>
                {' '}
                <h1 className="text-center">NO FLIGHT FOUND</h1> <br />{' '}
                <Link to="/">Go back</Link>{' '}
              </>
            )}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </div>
  );
};

export default Flights;

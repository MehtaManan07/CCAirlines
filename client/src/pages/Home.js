import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FlightForm from '../components/FlightForm';
import { getFlights } from '../redux/actions/airport';

const Home = () => {
  const dispatch = useDispatch();
  const airport = useSelector((state) => state.airport);
  const { flights } = airport;
  useEffect(() => {
    dispatch(getFlights());
  }, []);
  return (
    <div className="container-fluid">
      <FlightForm />
      <br />
      <hr />
      <h1 className="text-center"> All Airports </h1>
      <br />
      {flights && (
        <table className="table table-striped table-bordered text-center table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
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
                  <td>{flight.from.name}</td>
                  <td>{flight.to.name}</td>
                  <td>{flight.arrivalDate.substr(11, 5)} </td>
                  <td>{flight.departureDate.substr(11, 5)}</td>
                  <td>Rs {flight.basePrice}</td>
                  <Link
                    to={`/booking/${flight._id}`}
                    className="btn btn-success"
                  >
                    Book now
                  </Link>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

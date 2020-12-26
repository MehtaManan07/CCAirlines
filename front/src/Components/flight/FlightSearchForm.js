import React, { useState, useEffect } from 'react';
import { getAllAirports } from '../../functions/airport';
import { useHistory } from 'react-router-dom'
const FlightSearchForm = () => {
  const history = useHistory()
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [departureString, setDepartureString] = useState('');
  const [passengers, setPassengers] = useState(1);

  const [airports, setAirports] = useState([]);

  useEffect(() => {
    getAirports();
  }, []);

  const getAirports = () => {
    getAllAirports().then((res) => {
      if (!res || res.status === 500) {
        // toast.error(res.statusText);
        return;
      }
      console.log(res);
      setAirports(res);
    });
  };

  const submitHandler = (e) => {};

  return (
    <div>
      <div className="form-group">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="form-control"
        >
          <option value="A">From</option>
          {airports.map((a, i) => (
            <option value={a._id} key={i}>
              {a.city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="form-control"
        >
          <option value="A">To</option>
          {airports.map((a, i) => (
            <option value={a._id} key={i}>
              {a.city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group form-inline">
        <label htmlFor="passengersCount">Passengers: </label>
        <input
          type="number"
          min="1"
          placeholder="Total Passengers"
          id="passengersCount"
          className="form-control"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        ></input>
      </div>
      <div className="form-groupp">
        <input
          type="date"
          name=""
          id=""
          value={departureString}
          onChange={(e) => setDepartureString(e.target.value)}
        />
      </div>
      <div className="form-group d-flex justify-content-center">
        <button
          onClick={() =>
            history.push(
              `/flights/all?to=${to}&from=${from}&departureString=${departureString}`
            )
          }
          className="btn btn-outline-success"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FlightSearchForm;

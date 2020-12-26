import React, { useState, useEffect } from 'react';
import Layout from '../../Components/core/Layout';
import { getAllAirports } from '../../functions/airport';
import { getStaff } from '../../functions/auth';
import FlightNew from '../../Components/flight/NewFlightForm';
import { createFlight } from '../../functions/flight';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  to: '',
  from: '',
  features: [],
  arrivalDate: '',
  departureDate: '',
  crewStaff: [],
  seatsToAdd: {
    Economy: 0,
    Business: 0,
    FirstClass: 0,
  },
};

const NewFlight = (props) => {
  const [values, setValues] = useState(initialState);
  const [staff, setStaff] = useState(null);
  const [airports, setAirports] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    let empty =
      Object.values(values).includes('') ||
      Object.values(values.seatsToAdd).includes('') ||
      values.crewStaff === [];
    if (empty) {
      toast.error('Please fill out all fields');
      return;
    }
    console.log(values)
    createFlight(values).then((res) => {
      console.log(res);
      if (res.success) {
        toast.success('FLight created');
        props.history.push('/superuser/dashboard');
      } else {
        if(res.status === 500){
          toast.error(res.statusText)
        }
        toast.error(res.data.error);
        return;
      }
    });
  };

  useEffect(() => {
    getStaff().then((res) => {
      if (res.success) setStaff(res.data);
    });
    getAllAirports().then((res) => {
      setAirports(res);
    });
  }, []);
  return (
    <Layout
      title="New Flight"
      className="container col-md-10 md-offset-1"
      description="Create a new flight/tour"
    >
      <FlightNew
        setValues={setValues}
        staff={staff}
        submitHandler={submitHandler}
        airports={airports}
        values={values}
      />
    </Layout>
  );
};

export default NewFlight;

/*

  //Mongoose duplicate key
  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log('\n' + value)
    const display = value || 'The field you entered'
    const message = `${display} is already taken`;
    error = new ErrorResponse(message, 400);
  }

*/

import React, { useEffect, useState } from 'react';
import FlightTable from '../../Components/flight/FlightTable';
import Layout from '../../Components/core/Layout';
import { getAllFlights } from '../../functions/flight';
import queryString from 'query-string';
import FlightQuery from '../../Components/flight/FlightQuery';
import Loader from '../../Components/core/Loader';

const AllFlights = (props) => {
  let params = queryString.parse(props.location.search);
  let passN = props.location.state ? props.location.state.passengers : 1
  const [flights, setFlights] = useState([]);
  const [passNum, setPassNum] = useState(passN)
  const [filters, setFilters] = useState({
    basePrice: '',
    departureString: '',
    features: [],
  });
  const [loading, setLoading] = useState(true);
  const [checkValues, setCheckValues] = useState([
    { key: 'basePrice', value: 'Price', check: false },
    { key: 'departureDate', value: 'Early Departure', check: false },
    { key: 'arrivalDate', value: 'Early Arrival', check: false },
    { key: 'duration', value: 'Duration', check: false },
  ]);

  const getFlights = (str) => {
    getAllFlights(params,str).then((res) => {
      console.log(res);
      setFlights(res);
      setLoading(false);
    });
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    let sorting = checkValues.map((value) => {
      if(value.check) return value.key
    });
    let str = `sort=${sorting.join(",")}`
    console.log({sorting, str})
    let myObj = {
      features: { opt: 'all', value: filters.features },
      basePrice: { opt: 'lte', value: filters.basePrice },
      departureString: filters.departureString,
    };
    params = Object.assign(params, myObj);
    getFlights(str);
  };

  useEffect(() => {
    getFlights();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout
    className='p-1'
      title="Flights"
      description="You are just one step away from booking..."
    >
      <div className="row">
        <div
          style={{ height: '100vh', border: '1px solid white' }}
          className="col-md-3 d-flex flex-column"
        >
          <FlightQuery
            filters={filters}
            submitHandler={submitHandler}
            setFilters={setFilters}
            checkValues={checkValues}
            setCheckValues={setCheckValues}
            passNum={passNum}
            setPassNum={setPassNum}
          />
        </div>
        <div
          style={{ backgroundColor: 'white', height: '100vh' }}
          className="col-md-9"
        >
          {!loading ? (
            <FlightTable
              flights={flights}
              loading={loading}
              passengers={passNum}
            />
          ) : (
            <Loader text="Fetching" />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllFlights;

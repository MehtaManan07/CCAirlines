import React from 'react';
import Layout from '../../Components/core/Layout';
import FlightSearchForm from '../../Components/flight/FlightSearchForm';

const FlightSearch = () => {

  return (
    <Layout className="container col-md-8 offset-md-2" title="Search Flights">
      <div className="card mb-5">
        <div className="card-header">Flight Information</div>
        <div className="card-body">
          <FlightSearchForm  />
        </div>
      </div>
    </Layout>
  );
};

export default FlightSearch;

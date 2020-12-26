import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../Components/core/Layout';
import BookingTable from '../../Components/booking/BookingTable';
import Loader from '../../Components/core/Loader';

const UserDashboard = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  return (
    <Layout
      title={`${user.name && user.name.split(' ')[0]}'s Dashboard`}
      className="container"
    >
      {!loading ? (
        <>
          <h3 className="text-center">All bookings</h3>
          <BookingTable user={user} bookings={user.bookings} />{' '}
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default UserDashboard;

/*

*/

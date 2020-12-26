import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../Components/core/Layout';
import BookingTable from '../../Components/booking/BookingTable';

const AllBookings = ({ location }) => {
  const user = useSelector((state) => state.user);
  const { bookings } = location.state;
  return (
    <Layout title="All Bookings" className="container">
      <BookingTable bookings={bookings} user={user} admin />
    </Layout>
  );
};
export default AllBookings;

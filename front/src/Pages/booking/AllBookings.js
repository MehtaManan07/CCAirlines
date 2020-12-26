import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../Components/core/Layout';
import Loader from '../../Components/core/Loader';
import BookingTable from '../../Components/booking/BookingTable';
import { allBookings } from '../../functions/booking';

const AllBookings = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    setLoading(true);
    allBookings().then((res) => {
      if (res.success) {
        setBookings(res.data);
        setLoading(false);
      }
      setLoading(false);
    });
  }, []);
  return (
    <Layout title="All Bookings" className="container">
      {!loading ? (
        <BookingTable bookings={bookings} user={user} admin />
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default AllBookings;

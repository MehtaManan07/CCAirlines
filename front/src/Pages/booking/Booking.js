import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingConfirmModal from '../../Components/booking/BookingConfirmModal';
import Layout from '../../Components/core/Layout';
import { newBooking } from '../../functions/booking';
import { getOneFlight } from '../../functions/flight';
import { useDispatch } from 'react-redux';
import Loader from '../../Components/core/Loader';
import PassengerForm from '../../Components/booking/PassengerForm';

const Booking = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const passengers = parseInt(match.params.passengers);
  const [flight, setFlight] = useState({});
  const [travellers, setTravellers] = useState([
    { name: '', age: 1, gender: 'lol' },
  ]);
  const [loading, setLoading] = useState(false);

  const getFlight = () => {
    getOneFlight(match.params.id).then(async (res) => {
      if (res.success) {
        await setFlight(res.data);
        if (passengers > res.data.totalSeats - res.data.bookedSeats.length) {
          toast.error(
            `Only ${
              res.data.totalSeats - res.data.bookedSeats.length
            } passengers can be accommodated in this flight`
          );
          history.goBack();
        }
      }
    });
  };
  const onAdd = (e) => {
    e.preventDefault();
    let local = travellers.slice(-1)[0];
    if (
      local.name === '' ||
      local.age === 1 ||
      local.gender === 'lol' ||
      local.type === 'lol'
    ) {
      toast.error('Please fill out all fields');
      return;
    }
    setTravellers([...travellers, { name: '', age: 1, gender: '', type: '' }]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    let values = [...travellers];
    values[i] = { ...values[i], [name]: value };
    setTravellers(values);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    newBooking(travellers, match.params.id, dispatch).then((res) => {
      if (res.success) {
        setLoading(false);
        history.push('/user/dashboard');
        toast.success('YAY! BOOKING SUCCESSFUL, PLEASE CHECK YOUR EMAIL');
      }
      setLoading(false);
      toast.error(res.data.error);
    });
  };

  useEffect(() => {
    getFlight();
  }, []);

  return (
    <Layout
      className="container"
      title={`Booking for flight ${flight.name || ''}`}
    >
      {!loading ? (
        <>
          <BookingConfirmModal
            travellers={travellers}
            submitHandler={submitHandler}
          />
          {travellers.map((p, i) => (
            <PassengerForm
              p={p}
              i={i}
              handleChange={handleChange}
              passengers={passengers}
              onAdd={onAdd}
            />
          ))}
          {travellers.length === passengers && (
            <div className="d-flex justify-content-center mt-3">
              {travellers.slice(-1)[0].name === '' ||
              travellers.slice(-1)[0].age === 1 ||
              travellers.slice(-1)[0].gender === 'lol' ||
              travellers.slice(-1)[0].type === 'lol' ? (
                <button
                  onClick={() => toast.error('Please fill out all fields')}
                  className="btn btn-outline-primary"
                >
                  Proceed to booking
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-toggle="modal"
                  data-target="#bookingModal"
                >
                  Proceed to booking
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <Loader text="Your booking is being processed. Do not refresh the page..." />
      )}
    </Layout>
  );
};

export default Booking;

// removeClick(i){
//    let users = [...this.state.users];
//    users.splice(i, 1);
//    this.setState({ users });
// }

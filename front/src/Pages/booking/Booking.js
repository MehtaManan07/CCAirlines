import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingConfirmModal from '../../Components/booking/BookingConfirmModal';
import Layout from '../../Components/core/Layout';
import { newBooking } from '../../functions/booking';
import { getOneFlight } from '../../functions/flight';
import { useDispatch } from 'react-redux';
import Loader from '../../Components/core/Loader';

const Booking = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const passengers = useState(match.params.passengers);
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
            <form
              key={i}
              className="form-inline d-flex justify-content-between mb-1"
            >
              <div className="form-group">{i + 1}</div>
              <div className="form-group">
                <label for="name">Name:</label>
                <input
                  required
                  value={p.name}
                  onChange={(e) => handleChange(e, i)}
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label for="age">Age:</label>
                <input
                  required
                  value={p.age}
                  onChange={(e) => handleChange(e, i)}
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Enter age"
                  name="age"
                />
              </div>
              <div className="form-group">
                <select
                  required
                  value={p.gender}
                  onChange={(e) => handleChange(e, i)}
                  name="gender"
                  required
                  className="form-control"
                >
                  <option value="lol">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  required
                  value={p.type}
                  onChange={(e) => handleChange(e, i)}
                  name="type"
                  required
                  className="form-control"
                >
                  <option value="lol">Class</option>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="FirstClass">First-Class</option>
                </select>
              </div>
              <button
                disabled={i + 1 === passengers}
                style={{ cursor: i + 1 === passengers && 'no-drop' }}
                onClick={onAdd}
                type="submit"
                className="btn btn-success"
              >
                Add Passenger
              </button>
            </form>
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
        <Loader text='Your booking is being processed...' />
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

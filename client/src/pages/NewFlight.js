import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAirports, newFlight } from '../redux/actions/airport';
import { getStaff } from '../redux/actions/auth';

const NewFlight = ({ history }) => {
  const airport = useSelector((state) => state.airport);
  const [loading, setLoading] = useState(false);
  const { airports, staff } = airport;
  const [values, setValues] = useState({
    name: '',
    from: '',
    to: '',
    crewStaff: [],
    featureDisplay: ['magazines', 'drinks', 'dinner', 'lunch'],
    features: [],
    departureDate: '',
    arrivalDate: '',
  });
  const [seatsToAdd, setSeatsToAdd] = useState({
    Economy: 0,
    Business: 0,
    FirstClass: 0,
  },)
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    await dispatch(newFlight({...values, seatsToAdd},history));
    setLoading(false)
  };

  useEffect(() => {
    dispatch(getStaff());
    dispatch(getAllAirports());
  }, []);
  const onChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? <h3>Login</h3> : <h3>Loading...</h3>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name of Flight"
                className="form-control mb-2"
                autoFocus
                required
                value={values.name}
                onChange={onChange('name')}
              />
            </div>
            <div className="form-group">
              <select
                onChange={onChange('from')}
                className="custom-select form-control"
              >
                <option placeholder="From">From</option>
                {airports &&
                  airports.map((airport,i) => (
                    <option value={airport._id} id={i+10}>
                      {airport.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <select
                onChange={onChange('to')}
                className="custom-select form-control"
              >
                <option placeholder="To">To</option>
                {airports &&
                  airports.map((airport, o) => (
                    <option value={airport._id} id={o+87}>
                      {airport.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <Space direction="vertical" size={12}>
                <DatePicker
                  placeholder="Departure Date"
                  showTime
                  onChange={(v, d) =>
                    setValues({ ...values, departureDate: d })
                  }
                />
              </Space>
            </div>
            <div className="form-group">
              <Space direction="vertical" size={12}>
                <DatePicker
                  placeholder="Arrival Date"
                  showTime
                  onChange={(v, d) => setValues({ ...values, arrivalDate: d })}
                />
              </Space>
            </div>
            <div className="form-group">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Crew members"
                value={values.crewStaff}
                onChange={(value) => setValues({ ...values, crewStaff: value })}
              >
                {staff &&
                  staff.map((member) => (
                    <Select.Option value={member._id}>
                      {' '}
                      {member.name}{' '}
                    </Select.Option>
                  ))}
              </Select>
            </div>
            <div className="form-group">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select facilities"
                value={values.features}
                onChange={(value) => setValues({ ...values, features: value })}
              >
                {values.featureDisplay &&
                  values.featureDisplay.map((f) => (
                    <Select.Option key={f} value={f}> {f} </Select.Option>
                  ))}
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="">Economy class seats</label>
              <input
                type="number"
                placeholder="Seats for economy class"
                className="form-control mb-2"
                autoFocus
                required
                value={seatsToAdd.Economy}
                onChange={(e) =>
                  setSeatsToAdd({...seatsToAdd,
                    Economy: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Business class seats</label>
              <input
                type="number"
                placeholder="Seats for business class"
                className="form-control mb-2"
                autoFocus
                required
                value={seatsToAdd.Business}
                onChange={(e) =>
                  setSeatsToAdd({ ...seatsToAdd, Business: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="">First class seats</label>
              <input
                type="number"
                placeholder="Seats for first class"
                className="form-control mb-2"
                autoFocus
                required
                value={seatsToAdd.FirstClass}
                onChange={(e) =>
                  setSeatsToAdd({
                    ...seatsToAdd,
                    FirstClass: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <Button
              onClick={submitHandler}
              block
              shape="round"
              size="large"
              disabled={loading}
              type="ghost"
              className="mb-3"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewFlight;

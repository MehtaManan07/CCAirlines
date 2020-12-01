import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAirports, getAllFlights } from '../redux/actions/airport';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, DatePicker, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const FlightForm = () => {
  const history = useHistory();
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getAllFlights(to, from, date));
    history.push('/flights');
    console.log({ date, to, from });
  };

  const airport = useSelector((state) => state.airport);
  const { airports } = airport;
  useEffect(() => {
    dispatch(getAllAirports());
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <select
              onChange={(e) => setFrom(e.target.value)}
              className="custom-select form-control"
            >
              <option placeholder="From">From</option>
              {airports &&
                airports.map((airport) => (
                  <option value={airport._id} id={airport._id}>
                    {airport.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <select
              onChange={(e) => setTo(e.target.value)}
              className="custom-select form-control"
            >
              <option placeholder="To">To</option>
              {airports &&
                airports.map((airport) => (
                  <option value={airport._id} id={airport._id}>
                    {airport.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <Space direction="vertical" size={12}>
              <DatePicker onChange={(v, d) => setDate(d)} />
            </Space>
          </div>
          <div className="form-group">
            <Button
              onClick={(e) => submitHandler(e)}
              block
              shape="round"
              icon={<ArrowRightOutlined />}
              size="large"
              type="ghost"
              className="mb-3"
            >
              Search Flights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightForm;

// {/* <button type="submit" className="btn btn-primary mb-2"> */}
// {/* Submit */}
// </button>

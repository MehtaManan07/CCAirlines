import React from 'react'
import { useHistory } from 'react-router-dom';
import Seat from './Seat';

const SeatLayout = ({ clickHandler, seats, passenger }) => {
    const history = useHistory()
    
  const DisplaySeat = (seat) => (
    <Seat seat={seat} passenger={passenger} clickHandler={clickHandler} />
  );

    return (
        <>
        <div className="row">
          <div className="col">
            <Seat bgcolor="#62a904" clickHandler={clickHandler} />
            <span className="text-muted"> Available </span>
          </div>
          <div className="col">
            <Seat bgcolor="#4682b4" clickHandler={clickHandler} />
            <span className="text-muted"> Assigned </span>
          </div>
          <div className="col">
            <Seat bgcolor="#800080" clickHandler={clickHandler} />
            <span className="text-muted"> Taken </span>
          </div>
        </div>
        <div className={`border border-warning col p-3 mt-5`}>
          <div className="row mb-2">
            {seats[0].map((seat) => {
              return <div key={seat._id} className="">{DisplaySeat(seat)}</div>;
            })}
          </div>
          <div className="row mb-2">
            {seats[1].map((seat) => {
              return <div key={seat._id} className="">{DisplaySeat(seat)}</div>;
            })}
          </div>
          <div className="row mb-2">
            {seats[2].map((seat) => {
              return <div key={seat._id} className=""> {DisplaySeat(seat)} </div>;
            })}
          </div>
          <div className="row d-flex justify-content-center">
            <button
              onClick={() => history.goBack()}
              className="btn btn-outline-primary mt-3"
            >
              I am fine with my seat
            </button>
          </div>
        </div>
      </>
    )
}

export default SeatLayout

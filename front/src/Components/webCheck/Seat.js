import React from 'react';

const Seat = ({ bgcolor, seat, passenger, clickHandler }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        cursor: seat && !seat.boarded ? 'pointer' : 'no-drop',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 50,
        color: 'white',
        background: seat
          ? seat.boarded && seat._id !== passenger.seat._id
            ? '#800080'
            : seat._id === passenger.seat._id
            ? '#4682b4'
            : '#62a904'
          : bgcolor,
      }}
      onClick={() => clickHandler(seat, passenger)}
    >
      <span className="p-1">{seat ? seat.seatName : ''}</span>
    </span>
  );
};

export default Seat;

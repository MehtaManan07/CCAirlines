import React, { useEffect, useState } from 'react';
import Layout from '../../Components/core/Layout';
import { toast } from 'react-toastify';
import { confirmSeat, mySeatsCalc } from '../../functions/webCheck';
// import { getBooking } from '../../functions/booking';
import Loader from '../../Components/core/Loader';
import Pusher from 'pusher-js';
import SeatLayout from '../../Components/webCheck/SeatLayout';
import { getOneFlight } from '../../functions/flight';

const WebSeatSelect = (props) => {
  const { passenger } = props.location.state;
  const [seatId, setSeatId] = useState('')
  const [loading, setLoading] = useState(true);
  const [seats, setSeats] = useState([]);

  const clickHandler = (seat, png) => {
    if (!seat) return;
    if (seat.boarded) {
      toast.error(`The seat ${seat.seatName} is already taken`);
      return;
    }
    const confirm = window.confirm(
      `Your seat would be ${seat.seatName}. This cannot be undone. Proceed?`
    );
    if (confirm) {
      confirmSeat(png._id, seat._id, props.match.params.bookId).then((res) => {
        console.log(res);
        if (res.success) {
          // props.history.push(`/web/seat_select/${props.match.params.bookId}`);
          toast
            .success
            // `${png.name}'s updated seat is ${res.data.pass1.seat.seatName}`
            ();
        } else toast.error(res.data.error);
      });
    }
  };

  const fetchFlight = (id) => {
    getOneFlight(id).then((res) => {
      if (res.success) {
        let fseats = res.data.seats.filter(
          (s) => s.type === passenger.seat.type
        );
        fseats = mySeatsCalc(3, fseats);
        setSeats(fseats);
        setLoading(false);
      } else {
        // toast.error(res.statusText);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    console.log('yo');
    fetchFlight(props.match.params.bookId);
  }, [seatId]);
  useEffect(() => {
    let pusher = new Pusher('ea0ef1441bbd85bef8fb', {
      cluster: 'ap2',
    });
    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function ({ id }) {
      console.log('triggered');
      setSeatId(id)
    });
    return () => {
      channel.unbind('my-event');
      channel.unsubscribe();
    };
  }, []);
  return (
    <Layout
      title={`Seat Select`}
      className="pb-5 pr-5 pl-5"
      description={`Seat selection for ${passenger.name}`}
    >
      {!loading ? (
        <SeatLayout
          seats={seats}
          passenger={passenger}
          clickHandler={clickHandler}
        />
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default WebSeatSelect;

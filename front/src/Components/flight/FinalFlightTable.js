import React from 'react'
import moment from 'moment'
const FinalFlightTable = ({ final = false, flight }) => {
    return (
        <div>
            <table className="table table-bordered text-center table-hover">
            {!final && <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
              </tr>
            </thead>}
            <tbody>
              <tr>
                {!final && <th scope="row">1</th>}
                <td>Name</td>
                <td>{flight.name}</td>
              </tr>
              {!final && <tr>
                {!final && <th scope="row">2</th>}
                <td>Total staff members</td>
                <td>{flight.crewStaff.length}</td>
              </tr>}
              <tr>
                {!final && <th scope="row">3</th>}
                <td>From</td>
                <td>{flight.from.name}</td>
              </tr>
              <tr>
                {!final && <th scope="row">4</th>}
                <td>To</td>
                <td>{flight.to.name}</td>
              </tr>
              <tr>
                {!final && <th scope="row">5</th>}
                <td>Departure Date</td>
                <td>
                  {moment.utc(flight.departureDate).format('DD-MM-YYYY')}
                </td>
              </tr>
              <tr>
                {!final && <th scope="row">6</th>}
                <td>Departure Time</td>
                <td>
                  {moment.utc(flight.departureDate).format('HH:mm A')}
                </td>
              </tr>
              <tr>
                {!final && <th scope="row">7</th>}
                <td>Arrival Time</td>
                <td>
                  {moment.utc(flight.arrivalDate).format('HH:mm A')}{' '}
                </td>
              </tr>
              <tr>
                {!final && <th scope="row">8</th>}
                <td>Duration</td>
                <td>{Math.round(flight.duration)} hours</td>
              </tr>
              {!final && <tr>
                {!final && <th scope="row">9</th>}
                <td>Available Seats</td>
                <td>{flight.totalSeats - flight.bookedSeats.length}</td>
              </tr>}
            </tbody>
          </table>
        </div>
    )
}

export default FinalFlightTable

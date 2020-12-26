import React from 'react';

const BookingConfirmModal = ({ travellers, submitHandler }) => {
  return (
    <div
      className="modal fade"
      id="bookingModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="bookingModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Modal title
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {travellers && (
              <table className="table table-striped table-bordered text-center table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age {`(years)`}</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Class</th>
                  </tr>
                </thead>
                <tbody>
                  {travellers.map((traveller, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{traveller.name}</td>
                      <td>{traveller.age}</td>
                      <td>{traveller.gender} </td>
                      <td>{traveller.type} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={submitHandler}
              data-dismiss="modal"
              className="btn btn-primary"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmModal;

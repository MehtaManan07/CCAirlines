import React, { useState } from 'react';

const BookingTable = ({ passengers, setPassengers }) => {
  const [valuesOne, setValuesOne] = useState({
    name: 'J Doe',
    gender: 'Male',
    age: 10,
    type: 'Economy',
  });
  const [valuesTwo, setValuesTwo] = useState({
    name: 'Jane',
    gender: 'Female',
    age: 20,
    type: 'Business',
  });
  const [valuesThree, setValuesThree] = useState({
    name: 'Jack',
    gender: 'Male',
    age: 30,
    type: 'FirstClass',
  });
const [show, setShow] = useState(true)
  return (
    <div>
      <table className="table table-striped table-bordered text-center table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Class</th>
            <th scope="col">{``}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Passenger 1</th>
            <td>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                required
                value={valuesOne.name}
                onChange={(e) =>
                  setValuesOne({ ...valuesOne, name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Age"
                className="form-control mb-2"
                required
                value={valuesOne.age}
                onChange={(e) =>
                  setValuesOne({ ...valuesOne, age: e.target.value })
                }
              />
            </td>
            <td>
              <select
                onChange={(e) =>
                  setValuesOne({ ...valuesOne, gender: e.target.value })
                }
                className="custom-select form-control"
              >
                <option placeholder="Male">Male</option>
                <option placeholder="Female">Female</option>
                <option placeholder="Other">Other</option>
              </select>{' '}
            </td>
            <td>
              <select
                onChange={(e) =>
                  setValuesOne({ ...valuesOne, type: e.target.value })
                }
                className="custom-select form-control"
              >
                <option placeholder="Economy">Economy</option>
                <option placeholder="Business">Business</option>
                <option placeholder="FirstClass">FirstClass</option>
              </select>
            </td>
            <td
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                console.log(valuesOne);
                setPassengers([...passengers, valuesOne])
              }}
            >
              Confirm
            </td>
          </tr>
          <tr>
            <th scope="row">Passenger 2</th>
            <td>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                required
                value={valuesTwo.name}
                onChange={(e) =>
                  setValuesTwo({ ...valuesTwo, name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Age"
                className="form-control mb-2"
                required
                value={valuesTwo.age}
                onChange={(e) =>
                  setValuesTwo({ ...valuesTwo, age: e.target.value })
                }
              />
            </td>
            <td>
              <select
                onChange={(e) =>
                  setValuesTwo({ ...valuesTwo, gender: e.target.value })
                }
                className="custom-select form-control"
              >
                <option placeholder="Male">Male</option>
                <option placeholder="Female">Female</option>
                <option placeholder="Other">Other</option>
              </select>{' '}
            </td>
            <td>
              <select
                onChange={(e) =>
                  setValuesTwo({ ...valuesTwo, type: e.target.value })
                }
                className="custom-select form-control"
              >
                <option placeholder="Economy">Economy</option>
                <option placeholder="Business">Business</option>
                <option placeholder="FirstClass">FirstClass</option>
              </select>
            </td>
            <td
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                console.log(valuesTwo);
                setPassengers([...passengers, valuesTwo])
              }}
            >
              Confirm
            </td>
          </tr>
          <tr>
            <th scope="row">Passenger 3</th>
            <td>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                required
                value={valuesThree.name}
                onChange={(e) =>
                  setValuesThree({ ...valuesThree, name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Age"
                className="form-control mb-2"
                required
                value={valuesThree.age}
                onChange={(e) =>
                  setValuesThree({ ...valuesThree, age: e.target.value })
                }
              />
            </td>
            <td>
              <select
                onChange={(e) =>
                  setValuesThree({ ...valuesThree, gender: e.target.value })
                }
                className="custom-select form-control"
              >
                <option placeholder="Male">Male</option>
                <option placeholder="Female">Female</option>
                <option placeholder="Other">Other</option>
              </select>{' '}
            </td>
            <td>
              <select
                onChange={(e) =>
                  setValuesThree({ ...valuesThree, type: e.target.value })
                }
                className="custom-select form-control"
              >
                <option placeholder="Economy">Economy</option>
                <option placeholder="Business">Business</option>
                <option placeholder="FirstClass">FirstClass</option>
              </select>
            </td>
            <td
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                if(passengers.length > 2) setShow(false)
                console.log(valuesThree);
                setPassengers([...passengers, valuesThree])
              }}
            >
              Confirm
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;

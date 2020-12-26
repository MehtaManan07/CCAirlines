import React from 'react'

const PassengerForm = ({ p,i, handleChange, passengers, onAdd }) => {
    return (
        <>
          <form
              className="form-inline d-flex justify-content-between mb-1"
            >
              <div className="form-group">{i + 1}</div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
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
                <label htmlFor="age">Age:</label>
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
        </>
    )
}

export default PassengerForm

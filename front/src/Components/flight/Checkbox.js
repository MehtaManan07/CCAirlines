import React from 'react';

const Checkbox = ({ checkValues, setCheckValues }) => {
  const changeHandler = (e) => {
    const vals = [...checkValues];
    const { value, checked } = e.target;
    vals.map((v) => {
      if (v.key === value) {
        v.check = checked;
        console.log({ v, vals });
        setCheckValues(vals);
      }
    });
  };

  return checkValues.map((value) => (
    <li key={value.key} className="list p-1">
      <input
        value={value.key}
        onChange={changeHandler}
        checked={value.check}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label"> {value.value} </label>
    </li>
  ));
};

export default Checkbox;

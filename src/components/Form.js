import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Form(props) {

  Form.propTypes = {
    addPlayer: PropTypes.func
  };

  const [name, setName] = useState('');

  function handleChange(e) {
    console.log(e.target.value);
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addPlayer(name);
    setName('');

  }

  return (
    <form  onSubmit={handleSubmit} >
      <h2 className="label-wrapper">
        <label htmlFor="new-player-input" className="label__lg">
            Add new player?
        </label>
      </h2>
      <input
        type="text"
        id="new-player-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
          Add
      </button>
    </form>);
    
}

export default Form;
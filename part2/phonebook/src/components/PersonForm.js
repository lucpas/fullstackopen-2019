import React from 'react';

const PersonForm = props => {
  return (
    <form onSubmit={props.addPersonHandler}>
      <div>
        name: <input onChange={props.onNameChange} />
      </div>
      <div>
        number: <input onChange={props.onNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;

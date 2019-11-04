import React, { useState } from 'react';

const login = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={() => props.loginHandler(userName, password)}>
        <label htmlFor='input_username'>username</label>
        <input
          type='text'
          id='input_username'
          onChange={() => setUserName(event.target.value)}
        />
        <label htmlFor='input_password'>username</label>
        <input
          type='password'
          id='input_password'
          onChange={() => setPassword(event.target.value)}
        />
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default login;

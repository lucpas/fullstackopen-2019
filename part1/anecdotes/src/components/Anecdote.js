import React from "react";

const Anecdote = props => {
  return (
    <div>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};

export default Anecdote;

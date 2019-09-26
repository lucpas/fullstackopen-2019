import React, { useState } from "react";

import Anecdote from "./components/Anecdote";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );
  const [maxVotes, setMaxVotes] = useState(0);

  const nextHandler = () => {
    const rand = Math.floor(Math.random() * Math.floor(props.anecdotes.length));
    setSelected(rand);
  };

  const voteHandler = () => {
    const copyVotes = [...votes];
    copyVotes[selected] = copyVotes[selected] + 1;
    setVotes(copyVotes);

    const newMaxVotes = copyVotes.reduce(
      (maxIdx, val, idx, arr) => (val > arr[maxIdx] ? idx : maxIdx),
      0
    );
    setMaxVotes(newMaxVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={voteHandler}>vote</button>
      <button onClick={nextHandler}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[maxVotes]} votes={votes[maxVotes]} />
    </div>
  );
};

export default App;

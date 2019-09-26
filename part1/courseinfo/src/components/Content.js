import React from 'react';

import Part from './Part';

const content = (props) => {
  // const parts = props.parts.map(part => <Part name={part.name} exercises={part.exercises}/>);
  const parts = props.parts.map(part => <Part {...part}/>);

  return <div>{parts}</div>
};

export default content;
import React from 'react';

import Part from './Part';

const content = props => {
  const parts = props.parts.map(part => <Part key={part.id} {...part} />);

  return <div>{parts}</div>;
};

export default content;

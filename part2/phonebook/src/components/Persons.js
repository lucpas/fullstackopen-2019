import React from 'react';

const Persons = props => {
  const persons = props.persons.map(person => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));

  return persons;
};

export default Persons;

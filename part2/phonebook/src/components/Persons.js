import React from 'react';

const Persons = props => {
  const persons = props.persons.map(person => (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={() => props.onDeletePerson(person)}>delete</button>
    </p>
  ));

  return persons;
};

export default Persons;

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, []);

  const addPersonHandler = event => {
    event.preventDefault();

    const personIndex = persons.find(person => person.name === newName);
    console.log(personIndex);

    if (personIndex) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personsCopy = persons.map(person => Object.assign({}, person));
    personsCopy.push({ name: newName, number: newNumber });
    setPersons(personsCopy);
  };

  const filterPersons = () => {
    return persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={event => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        addPersonHandler={addPersonHandler}
        onNameChange={event => setNewName(event.target.value)}
        onNumberChange={event => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons()} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

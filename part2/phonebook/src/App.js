import React, { useState, useEffect } from 'react';

import services from './services/services';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => services.fetchPersons(setPersons), []);

  const addPersonHandler = event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      updatePersonHandler(existingPerson);
      return;
    }

    services
      .storePerson({
        name: newName,
        number: newNumber
      })
      .then(newPerson => setPersons([...persons, newPerson]));
  };

  const updatePersonHandler = person => {
    const prompt = `${person.name} is already added to phonebook, replace the old number with a new one?`;
    if (!window.confirm(prompt)) {
      return;
    }

    const updatedPerson = { ...person, number: newNumber };
    services.updatePerson(updatedPerson);
    setPersons(
      persons.map(p => (p.id !== updatedPerson.id ? p : updatedPerson))
    );
  };

  const deletePersonHandler = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      setPersons(persons.filter(p => p.id !== person.id));
      services.deletePerson(person);
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={event => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        onAddPerson={addPersonHandler}
        onNameChange={event => setNewName(event.target.value)}
        onNumberChange={event => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={deletePersonHandler} />
    </div>
  );
};

export default App;

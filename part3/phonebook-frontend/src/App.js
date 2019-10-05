import React, { useState, useEffect } from 'react';

import services from './services/services';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    msg: '',
    type: null
  });

  useEffect(() => services.fetchPersons(setPersons), []);

  // ------------ Person handlers start -----------------------------------------
  const modifyPersonsHandler = event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      updatePersonHandler(existingPerson);
    } else {
      addPersonHandler();
    }
  };

  const addPersonHandler = event => {
    services
      .storePerson({
        name: newName,
        number: newNumber
      })
      .then(newPerson => {
        setPersons([...persons, newPerson]);
        showNotification(`Added ${newPerson.name}`, 'success');
      })
      .catch(err => showNotification(err.response.data.error, 'error'));
  };

  const updatePersonHandler = person => {
    const prompt = `${person.name} is already added to phonebook, replace the old number with a new one?`;
    if (!window.confirm(prompt)) {
      return;
    }

    services
      .updatePerson({ ...person, number: newNumber })
      .then(newPerson => {
        setPersons(persons.map(p => (p.id !== newPerson.id ? p : newPerson)));
        showNotification(`Updated ${newPerson.name}`, 'success');
      })

      .catch(err => showNotification(`error while updating person!`, 'error'));
  };

  const deletePersonHandler = person => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    services
      .deletePerson(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
        showNotification(`Deleted ${person.name}`, 'success');
      })
      .catch(err => showNotification(`error while deleting person!`, 'error'));
  };
  // ------------ Person handlers end -------------------------------------------

  const showNotification = (msg, type) => {
    setNotification({ show: true, msg, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 10000);
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.show ? <Notification {...notification} /> : null}
      <Filter onChange={event => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        onAddPerson={modifyPersonsHandler}
        onNameChange={event => setNewName(event.target.value)}
        onNumberChange={event => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={deletePersonHandler} />
    </div>
  );
};

export default App;

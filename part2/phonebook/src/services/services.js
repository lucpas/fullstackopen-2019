import axios from 'axios';

const baseURL = 'http://localhost:3001/persons/';

const fetchPersons = callback => {
  axios
    .get(baseURL)
    .then(response => callback(response.data))
    .catch(error => console.log(error));
};

const storePerson = person => {
  return axios
    .post(baseURL, person)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      return { name: '...', number: '...' };
    });
};

const updatePerson = person => {
  return axios
    .put(baseURL + person.id, person)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      return { name: '...', number: '...' };
    });
};

const deletePerson = person => {
  axios
    .delete(baseURL + person.id)
    .catch(error => console.log(error));
};

export default { fetchPersons, storePerson, updatePerson, deletePerson };

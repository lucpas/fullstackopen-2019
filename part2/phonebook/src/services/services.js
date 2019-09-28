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
};

const updatePerson = person => {
  return axios
    .put(baseURL + person.id, person)
    .then(response => response.data)
};

const deletePerson = person => {
  return axios
    .delete(baseURL + person.id)
    .then(response => response.data)
};

export default { fetchPersons, storePerson, updatePerson, deletePerson };

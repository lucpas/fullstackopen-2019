const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

//  Create custom morgan token for printing request body when POSTing
morgan.token('body', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

//  Create and apply morgan with custom config
morganConfig =
  ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(morganConfig));

//  Add new entry to database - dublicate names are allowed
app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body;
  if (!newPerson.name || !newPerson.number) {
    return response.status(400).send({ error: 'name or number is missing' });
  }

  Person.findOne({ name: newPerson.name })
    .then(result => {
      if (result) {
        response.status(403).send({ error: 'person already exists' });
      } else {
        new Person({ name: newPerson.name, number: newPerson.number })
          .save()
          .then(result => response.json(result))
          .catch(error => next(error));
      }
    })
    .catch(error => next(error));
});

//  Update entry associated with the id
app.put('/api/persons/:id', (request, response, next) => {
  const newPerson = request.body;
  if (!newPerson.name || !newPerson.number) {
    return response.status(400).send({ error: 'name or number is missing' });
  }

  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(result => response.json(result))
    .catch(error => next(error));
});

//  Delete entry associated with the ID
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error));
});

//  Return entry associated with the ID as JSON
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if (result) {
        response.json(result.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

//  Return all phonebook entries as JSON
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(result => response.json(result))
    .catch(error => next(error));
});

//  Print small overview of phonebook contents
app.get('/info', (request, response, next) => {
  Person.count({})
    .then(result => {
      let html = `<p>Phone has info for ${result} people</p>`;
      html = html + `<p>${new Date()}</p>`;
      response.send(html);
    })
    .catch(error => next(error));
});

//  Create handler for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

//  Create error handler middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectID') {
    return response.status(400).send({ error: 'malformatted id' });
  }
};
app.use(errorHandler);

//  Listen for incomming requests
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

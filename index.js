const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

morgan.token('body', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

morganConfig =
  ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(morganConfig));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

app.post('/api/persons', (request, response) => {
  const newPerson = request.body;

  if (!newPerson.name || !newPerson.number) {
    return response
      .statusMessage(400)
      .json({ error: 'name or number is missing' });
  }

  if (persons.find(p => p.id === newPerson.id)) {
    return response.statusMessage(400).json({ error: 'name must be unique' });
  }

  newPerson.id =
    persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 0;
  persons = [...persons, newPerson];
  response.json(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
  const requestID = Number(request.params.id);
  persons = persons.filter(person => person.id !== requestID);
  response.status(204).end();
});

app.get('/api/persons/:id', (request, response) => {
  const requestID = Number(request.params.id);
  const person = persons.find(person => person.id === requestID);
  response.json(person);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  let html = `<p>Phone has info for ${persons.length} people</p>`;
  html = html + `<p>${new Date()}</p>`;

  response.send(html);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

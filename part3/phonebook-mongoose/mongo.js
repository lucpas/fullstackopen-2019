const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const dbUser = 'phonebook_backend';
const dbPassword = process.argv[2];
const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-au3ft.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(reason => {
    console.log('Error connecting to database: ' + reason);
    mongoose.connection.close();
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      console.log('phonebook:');
      result.forEach(entry => console.log(`${entry.name} ${entry.number}`));
    })
    .catch(reason => console.log('Error fetching from database: ' + reason))
    .finally(() => {
      mongoose.connection.close();
      process.exit(2);
    });
}

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({ name, number });
  person
    .save()
    .then(result => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch(reason => console.log('Error uploading to database: ' + resason))
    .finally(() => {
      mongoose.connection.close();
      process.exit(2);
    });
}

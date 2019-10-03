const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('Successfully connected to MongoDB'))
  .catch(reason => {
    console.log('Error connecting to database: ' + reason);
    mongoose.connection.close();
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

//  Overwrite JSON method to map MongoDB property _id to id and ommit _v property
personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);

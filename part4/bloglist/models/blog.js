const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

//  Overwrite JSON method to map MongoDB property _id to id and ommit _v property
blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    /* eslint-disable */

    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    /* eslint-enable */
  },
});

module.exports = mongoose.model('Blog', blogSchema);

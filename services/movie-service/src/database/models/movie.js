const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
    },
    genre: {
      type: String,
    },
    director: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', entrySchema);

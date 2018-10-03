const mongoose = require('mongoose');

/*
  --------------------------------
          schema
  --------------------------------
*/
const movieSchema = mongoose.Schema({
  movieName: {
    type: String,
    required: true
  },
  screenNo: {
    type: Number,
    required: true
  },
  showTime: {
    type: String,
    enum : ['MORNING', 'MATINEE', 'FIRST', 'SECOND', 'NIGHT'],
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

const movie = module.exports = mongoose.model('movie', movieSchema);

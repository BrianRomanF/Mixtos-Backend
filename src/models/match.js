import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
    date: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: String,
    required: true,
   // select: false, // Hide password field by default when querying the database
  },
  place: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }
});



const Match = mongoose.model('Match', matchSchema);

export default Match;
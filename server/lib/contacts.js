import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
  name: { type: String },
  phone_num: { type: String, unique: true },
});

const People = mongoose.model('people', peopleSchema);

module.exports = People;
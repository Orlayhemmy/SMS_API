import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  msg: { type: String },
  sender: { type: String },
  receiver: { type: String },
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
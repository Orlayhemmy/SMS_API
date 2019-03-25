import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  msg: { type: String },
  sender: { type: String },
  receiver: { type: String },
  senderStatus: { type: Boolean },
  receiverStatus: { type: Boolean },
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
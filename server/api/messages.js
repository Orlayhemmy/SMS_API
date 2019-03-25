import Message from '../lib/message';
import People from '../lib/contacts';

const new_message = new Message();

export const sendMessage = async ({ body: { receiver, sender, msg } }, res) => {
  const isSender = await People.find({phone_num: sender});
  const isReceiver = await People.find({phone_num: receiver});

  if (isSender.length && isReceiver.length) {
    new_message.receiver = receiver;
    new_message.sender = sender;
    new_message.msg = msg;
    new_message.save((err, result) => {
      if (err) return res.status(500).send({ message: 'Message not sent' });
      return res.status(201).send({ status: 'message sent successfully', message: result.msg });
    });
    return
  } else {
    return res.status(400).send({
      message: 'Receiver or Sender phone number is invalid',
    });
  }
}

export const getSentMessages = async ({ params: { id } }, res) => {
  const phone = await People.findOne({ _id: id });
  Message.find({ sender: phone.phone_num }, (err, result) => {
    if (err) return res.status(500).send({ message: 'Network error' });
    return res.status(200).send({
      messages: result,
    });
  });
}

export const getInboxes = async ({ params: { id } }, res) => {
  const phone = await People.findOne({ _id: id });
  Message.find({ receiver: phone.phone_num }, (err, result) => {
    if (err) return res.status(500).send({ message: 'Network error' });
    return res.status(200).send({
      messages: result,
    });
  });
}
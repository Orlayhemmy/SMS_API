export const validateMessage = ({ body: { msg, receiver, sender } }, res, next) => {
  const errors = {};

  if (!msg || !receiver || !sender) {
    return res.status(400).send({
      message: 'All fields are required',
    });
  }

  if (!/^[0-9 ]+$/.test(receiver)) {
    errors.receiver = "Receiver\'s phone number is invalid"
  }

  if (!/^[0-9 ]+$/.test(sender)) {
    errors.receiver = "Sender\'s phone number is invalid"
  }

  const isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  next();
}
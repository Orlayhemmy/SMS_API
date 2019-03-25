"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validateMessage = exports.validateMessage = function validateMessage(_ref, res, next) {
  var _ref$body = _ref.body,
      msg = _ref$body.msg,
      receiver = _ref$body.receiver,
      sender = _ref$body.sender;

  var errors = {};

  if (!msg || !receiver || !sender) {
    return res.status(400).send({
      message: 'All fields are required'
    });
  }

  if (!/^[0-9 ]+$/.test(receiver)) {
    errors.receiver = "Receiver\'s phone number is invalid";
  }

  if (!/^[0-9 ]+$/.test(sender)) {
    errors.receiver = "Sender\'s phone number is invalid";
  }

  var isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  next();
};
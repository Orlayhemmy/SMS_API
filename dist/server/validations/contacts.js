"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validateContact = exports.validateContact = function validateContact(req, res, next) {
  var _req$body = req.body,
      name = _req$body.name,
      phone_num = _req$body.phone_num;

  var errors = {};

  if (!name) {
    errors.name = 'Name is required';
  } else {
    if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = "Name can only contain letters";
    }
  }
  if (!phone_num) {
    errors.phone_num = "Phone number is required";
  } else {
    if (!/^[0-9 ]+$/.test(phone_num)) {
      errors.phone_num = "Phone can only contain number";
    }
  }

  var isValid = Object.values(errors).length === 0;
  if (!isValid) {
    return res.status(400).json(errors);
  }

  next();
};
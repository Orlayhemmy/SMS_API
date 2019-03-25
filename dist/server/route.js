'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _contacts = require('./api/contacts');

var _messages = require('./api/messages');

var _contacts2 = require('./validations/contacts');

var _message = require('./validations/message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/contacts').post(_contacts2.validateContact, _contacts.addContact).get(_contacts.getContacts);

router.route('/contacts/:id').get(_contacts.getContact).delete(_contacts.deleteContact);

router.route('/sms').post(_message.validateMessage, _messages.sendMessage);

router.route('/sent/:id').get(_messages.getSentMessages);

router.route('/inbox/:id').get(_messages.getInboxes);

exports.default = router;
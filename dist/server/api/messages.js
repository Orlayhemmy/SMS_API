'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInboxes = exports.getSentMessages = exports.sendMessage = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _message = require('../lib/message');

var _message2 = _interopRequireDefault(_message);

var _contacts = require('../lib/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var new_message = new _message2.default();

var sendMessage = exports.sendMessage = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref, res) {
    var _ref$body = _ref.body,
        receiver = _ref$body.receiver,
        sender = _ref$body.sender,
        msg = _ref$body.msg;
    var isSender, isReceiver;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _contacts2.default.find({ phone_num: sender });

          case 2:
            isSender = _context.sent;
            _context.next = 5;
            return _contacts2.default.find({ phone_num: receiver });

          case 5:
            isReceiver = _context.sent;

            if (!(isSender.length && isReceiver.length)) {
              _context.next = 16;
              break;
            }

            new_message.receiver = receiver;
            new_message.sender = sender;
            new_message.msg = msg;
            new_message.senderStatus = true;
            new_message.receiverStatus = true;
            new_message.save(function (err, result) {
              if (err) return res.status(500).send({ message: 'Message not sent' });
              return res.status(201).send({ status: 'message sent successfully', message: result.msg });
            });
            return _context.abrupt('return');

          case 16:
            return _context.abrupt('return', res.status(400).send({
              message: 'Receiver or Sender phone number is invalid'
            }));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendMessage(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getSentMessages = exports.getSentMessages = function getSentMessages(_ref3, res) {
  var id = _ref3.params.id;

  _message2.default.find({ sender: id }, function (err, result) {
    if (err) return res.status(500).send({ message: 'Network error' });
    return res.status(200).send({
      messages: result
    });
  });
};

var getInboxes = exports.getInboxes = function getInboxes(_ref4, res) {
  var id = _ref4.params.id;

  _message2.default.find({ receiver: id }, function (err, result) {
    if (err) return res.status(500).send({ message: 'Network error' });
    return res.status(200).send({
      messages: result
    });
  });
};
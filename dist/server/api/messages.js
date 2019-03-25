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
              _context.next = 14;
              break;
            }

            new_message.receiver = receiver;
            new_message.sender = sender;
            new_message.msg = msg;
            new_message.save(function (err, result) {
              if (err) return res.status(500).send({ message: 'Message not sent' });
              return res.status(201).send({ status: 'message sent successfully', message: result.msg });
            });
            return _context.abrupt('return');

          case 14:
            return _context.abrupt('return', res.status(400).send({
              message: 'Receiver or Sender phone number is invalid'
            }));

          case 15:
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

var getSentMessages = exports.getSentMessages = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3, res) {
    var id = _ref3.params.id;
    var phone;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _contacts2.default.findOne({ _id: id });

          case 2:
            phone = _context2.sent;

            _message2.default.find({ sender: phone.phone_num }, function (err, result) {
              if (err) return res.status(500).send({ message: 'Network error' });
              return res.status(200).send({
                messages: result
              });
            });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getSentMessages(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var getInboxes = exports.getInboxes = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref5, res) {
    var id = _ref5.params.id;
    var phone;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _contacts2.default.findOne({ _id: id });

          case 2:
            phone = _context3.sent;

            _message2.default.find({ receiver: phone.phone_num }, function (err, result) {
              if (err) return res.status(500).send({ message: 'Network error' });
              return res.status(200).send({
                messages: result
              });
            });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getInboxes(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();
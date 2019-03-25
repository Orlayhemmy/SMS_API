'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteContact = exports.getContact = exports.getContacts = exports.addContact = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _contacts = require('../lib/contacts');

var _contacts2 = _interopRequireDefault(_contacts);

var _message = require('../lib/message');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addContact = exports.addContact = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref, res) {
    var _ref$body = _ref.body,
        name = _ref$body.name,
        phone_num = _ref$body.phone_num;
    var isContact, new_contact;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _contacts2.default.findOne({ $or: [{ name: name }, { phone_num: phone_num }] });

          case 2:
            isContact = _context.sent;

            if (isContact) {
              _context.next = 8;
              break;
            }

            new_contact = new _contacts2.default();

            new_contact.name = name;
            new_contact.phone_num = phone_num;
            return _context.abrupt('return', new_contact.save(function (err, result) {
              if (err) return res.status(500).send({ message: 'Sorry, user cannot be saved' });
              return res.status(201).send({
                message: 'Contact saved successfully',
                data: {
                  name: name,
                  phone_num: phone_num
                }
              });
            }));

          case 8:
            return _context.abrupt('return', res.status(409).send({
              message: 'Name or phone already exist. Please update your account instead!'
            }));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addContact(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getContacts = exports.getContacts = function getContacts(req, res) {
  _contacts2.default.find().then(function (result) {
    return res.status(200).send({
      users: result
    });
  }).catch(function (err) {
    return res.status(500).send({
      message: err
    });
  });
};

var getContact = exports.getContact = function getContact(_ref3, res) {
  var id = _ref3.params.id;

  _contacts2.default.findOne({ _id: id }).then(function (result) {
    return res.status(200).send({
      contact: result
    });
  }).catch(function (err) {
    return res.status(500).send({
      message: err
    });
  });
};

var deleteContact = exports.deleteContact = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4, res) {
    var id = _ref4.params.id;
    var deleteContact, name, phone_num;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _contacts2.default.findOneAndRemove({ _id: id });

          case 2:
            deleteContact = _context2.sent;

            if (!deleteContact) {
              _context2.next = 8;
              break;
            }

            name = deleteContact.name, phone_num = deleteContact.phone_num;

            _message2.default.deleteMany({ $or: [{ name: name }, { phone_num: phone_num }] }).then(function (result) {
              return res.status(200).send({
                message: 'Contact Deleted!'
              });
            }).catch(function (err) {
              return res.status(404).send({
                message: 'User not found'
              });
            });
            _context2.next = 9;
            break;

          case 8:
            return _context2.abrupt('return', res.status(400).send({
              message: 'Contact not found'
            }));

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function deleteContact(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();
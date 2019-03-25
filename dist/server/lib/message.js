'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messageSchema = new _mongoose2.default.Schema({
  msg: { type: String },
  sender: { type: String },
  receiver: { type: String }
});

var Message = _mongoose2.default.model('message', messageSchema);

module.exports = Message;
'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var peopleSchema = new _mongoose2.default.Schema({
  name: { type: String },
  phone_num: { type: String, unique: true }
});

var People = _mongoose2.default.model('people', peopleSchema);

module.exports = People;
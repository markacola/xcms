'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _packet = require('./packet');

var _packet2 = _interopRequireDefault(_packet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug');

var Plugin = function (_Emitter) {
  _inherits(Plugin, _Emitter);

  function Plugin(_ref) {
    var name = _ref.name;
    var _ref$handles = _ref.handles;
    var handles = _ref$handles === undefined ? new Set() : _ref$handles;

    var opt = _objectWithoutProperties(_ref, ['name', 'handles']);

    _classCallCheck(this, Plugin);

    (0, _assert2.default)(name, 'plugin name required');

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Plugin).call(this));

    Object.assign(_this, _extends({ name: name, handles: handles }, opt));
    _this.debug = debug('xcms:plugin:' + name);
    return _this;
  }

  _createClass(Plugin, [{
    key: 'emit',
    value: function emit() {
      var _get3;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args[0] instanceof _packet2.default) {
        var _get2;

        return (_get2 = _get(Object.getPrototypeOf(Plugin.prototype), 'emit', this)).call.apply(_get2, [this, 'packet'].concat(args));
      }
      (_get3 = _get(Object.getPrototypeOf(Plugin.prototype), 'emit', this)).call.apply(_get3, [this].concat(args));
    }
  }, {
    key: 'canHandlePacket',
    value: function canHandlePacket(_ref2) {
      var type = _ref2.type;
      var handles = this.handles;

      return handles === type || handles instanceof Set && handles.has(type) || handles instanceof RegExp && handles.test(type);
    }
  }, {
    key: 'consumePacket',
    value: function consumePacket(packet) {}
  }, {
    key: 'onMount',
    value: function onMount(app) {}
  }, {
    key: 'onUnmount',
    value: function onUnmount(app) {}
  }]);

  return Plugin;
}(_events2.default);

exports.default = Plugin;
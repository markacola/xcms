'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnhandledPacketError = undefined;

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnhandledPacketError = exports.UnhandledPacketError = function (_ExtendableError) {
  _inherits(UnhandledPacketError, _ExtendableError);

  function UnhandledPacketError() {
    var msg = arguments.length <= 0 || arguments[0] === undefined ? 'unhandled packet' : arguments[0];

    _classCallCheck(this, UnhandledPacketError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnhandledPacketError).call(this, msg));
  }

  return UnhandledPacketError;
}(_es6Error2.default);
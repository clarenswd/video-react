"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoadingSpinner;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  player: _react.PropTypes.object
};

function LoadingSpinner(_ref) {
  var player = _ref.player;

  if (!player.hasStarted || !player.seeking && !player.waiting) {
    return null;
  }

  return _react2.default.createElement("div", { className: "video-react-loading-spinner" });
}

LoadingSpinner.propTypes = propTypes;
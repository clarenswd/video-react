'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.formatTime = formatTime;
exports.isVideoChild = isVideoChild;
exports.mergeAndSortChildren = mergeAndSortChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file format-time.js
 *
 * Format seconds as a time string, H:MM:SS or M:SS
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide
 *
 * @param  {Number} seconds Number of seconds to be turned into a string
 * @param  {Number} guide   Number (in seconds) to model the string after
 * @return {String}         Time formatted as H:MM:SS or M:SS
 * @private
 * @function formatTime
 */
function formatTime() {
  var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var guide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : seconds;

  var s = Math.floor(seconds % 60);
  var m = Math.floor(seconds / 60 % 60);
  var h = Math.floor(seconds / 3600);
  var gm = Math.floor(guide / 60 % 60);
  var gh = Math.floor(guide / 3600);

  // handle invalid times
  if (isNaN(seconds) || seconds === Infinity) {
    // '-' is false for all relational operators (e.g. <, >=) so this setting
    // will add the minimum number of fields specified by the guide
    h = m = s = '-';
  }

  // Check if we need to show hours
  h = h > 0 || gh > 0 ? h + ':' : '';

  // If hours are showing, we may need to add a leading zero.
  // Always show at least one digit of minutes.
  m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

  // Check if leading zero is need for seconds
  s = s < 10 ? '0' + s : s;

  return h + m + s;
}

// Check if the element belongs to a video element
// only accept <source />, <track />,
// <MyComponent isVideoChild />
// elements
function isVideoChild(c) {
  if (c.props && c.props.isVideoChild) {
    return true;
  }
  return c.type === 'source' || c.type === 'track';
}

// merge default children
// sort them by `order` property
// filter them by `disabled` property
function mergeAndSortChildren(defaultChildren, _children, _parentProps) {
  var defaultOrder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var children = _react2.default.Children.toArray(_children);
  var parentProps = _extends({}, _parentProps);
  return children.filter(function (e) {
    return !e.props.disabled;
  }).concat(defaultChildren.filter(function (c) {
    return !children.find(function (component) {
      return component.type === c.type;
    });
  })).map(function (element) {
    var defaultComponent = defaultChildren.find(function (c) {
      return c.type === element.type;
    });
    delete parentProps.order;
    var defaultProps = defaultComponent ? defaultComponent.props : {};
    var props = _extends({}, parentProps, defaultProps, element.props);
    var e = _react2.default.cloneElement(element, props, element.props.children);
    return e;
  }).sort(function (a, b) {
    return (a.props.order || defaultOrder) - (b.props.order || defaultOrder);
  });
}
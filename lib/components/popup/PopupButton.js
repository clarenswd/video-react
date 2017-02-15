'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClickableComponent = require('../ClickableComponent');

var _ClickableComponent2 = _interopRequireDefault(_ClickableComponent);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  inline: _react.PropTypes.bool,
  onClick: _react.PropTypes.func.isRequired,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  className: _react.PropTypes.string
};

var defaultProps = {
  inline: true
};

var PopupButton = function (_Component) {
  _inherits(PopupButton, _Component);

  function PopupButton(props, context) {
    _classCallCheck(this, PopupButton);

    return _possibleConstructorReturn(this, (PopupButton.__proto__ || Object.getPrototypeOf(PopupButton)).call(this, props, context));
  }

  _createClass(PopupButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          inline = _props.inline,
          className = _props.className;

      var props = _extends({}, this.props);
      delete props.children;
      delete props.inline;
      delete props.className;
      return _react2.default.createElement(
        _ClickableComponent2.default,
        _extends({
          className: (0, _classnames2.default)(className, {
            'video-react-menu-button-inline': !!inline,
            'video-react-menu-button-popup': !inline
          }, 'video-react-control video-react-button video-react-menu-button')
        }, props),
        _react2.default.createElement(_Popup2.default, this.props)
      );
    }
  }]);

  return PopupButton;
}(_react.Component);

exports.default = PopupButton;


PopupButton.propTypes = propTypes;
PopupButton.defaultProps = defaultProps;
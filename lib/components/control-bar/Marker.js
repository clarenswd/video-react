'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Marker = function (_Component) {
	_inherits(Marker, _Component);

	function Marker(props) {
		_classCallCheck(this, Marker);

		var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props));

		_this.state = {
			offset: 0
		};
		return _this;
	}

	_createClass(Marker, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			var offset = this.props.seconds / this.props.videoDuration;
			this.setState({ offset: offset * 100 });
			console.log(this.props.seconds);
			console.log(this.props.videoDuration);
			console.log(this.state.offset);
		}
	}, {
		key: 'render',
		value: function render() {

			var style = {
				backgroundColor: 'red',
				width: '10px',
				height: '10px',
				borderRadius: '50%',
				position: 'absolute',
				top: '-4px',
				left: this.state.offset + '%',
				zIndex: "999999"
			};
			return _react2.default.createElement('div', { className: 'clarensMarker', style: style, onClick: this.props.toggleChat });
		}
	}]);

	return Marker;
}(_react.Component);

exports.default = Marker;
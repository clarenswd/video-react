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

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _Manager = require('../Manager');

var _Manager2 = _interopRequireDefault(_Manager);

var _BigPlayButton = require('./BigPlayButton');

var _BigPlayButton2 = _interopRequireDefault(_BigPlayButton);

var _LoadingSpinner = require('./LoadingSpinner');

var _LoadingSpinner2 = _interopRequireDefault(_LoadingSpinner);

var _PosterImage = require('./PosterImage');

var _PosterImage2 = _interopRequireDefault(_PosterImage);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Bezel = require('./Bezel');

var _Bezel2 = _interopRequireDefault(_Bezel);

var _Shortcut = require('./Shortcut');

var _Shortcut2 = _interopRequireDefault(_Shortcut);

var _ControlBar = require('./control-bar/ControlBar');

var _ControlBar2 = _interopRequireDefault(_ControlBar);

var _browser = require('../utils/browser');

var browser = _interopRequireWildcard(_browser);

var _utils = require('../utils');

var _fullscreen = require('../utils/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _react.PropTypes.any,

  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  fluid: _react.PropTypes.bool,
  muted: _react.PropTypes.bool,
  playsInline: _react.PropTypes.bool,
  aspectRatio: _react.PropTypes.string,

  startTime: _react.PropTypes.number,
  loop: _react.PropTypes.bool,
  autoPlay: _react.PropTypes.bool,
  src: _react.PropTypes.string,
  poster: _react.PropTypes.string,

  markers: _react.PropTypes.array,

  preload: _react2.default.PropTypes.oneOf(['auto', 'metadata', 'none']),

  onLoadStart: _react.PropTypes.func,
  onWaiting: _react.PropTypes.func,
  onCanPlay: _react.PropTypes.func,
  onCanPlayThrough: _react.PropTypes.func,
  onPlaying: _react.PropTypes.func,
  onEnded: _react.PropTypes.func,
  onSeeking: _react.PropTypes.func,
  onSeeked: _react.PropTypes.func,
  onPlay: _react.PropTypes.func,
  onPause: _react.PropTypes.func,
  onProgress: _react.PropTypes.func,
  onDurationChange: _react.PropTypes.func,
  onError: _react.PropTypes.func,
  onSuspend: _react.PropTypes.func,
  onAbort: _react.PropTypes.func,
  onEmptied: _react.PropTypes.func,
  onStalled: _react.PropTypes.func,
  onLoadedMetadata: _react.PropTypes.func,
  onLoadedData: _react.PropTypes.func,
  onTimeUpdate: _react.PropTypes.func,
  onRateChange: _react.PropTypes.func,
  onVolumeChange: _react.PropTypes.func,

  markerClick: _react.PropTypes.func
};

var defaultProps = {
  fluid: true,
  aspectRatio: 'auto',
  markers: [{ seconds: 3, duration: 52, topic: "autopilot" }, { seconds: 9, duration: 52, topic: "sensors" }, { seconds: 13, duration: 52, topic: "music" }, { seconds: 45, duration: 52, topic: "comfort" }],
  markerClick: function markerClick() {
    console.log('Default ToggleChatEvent, should Be called');
  }

};

var Player = function (_Component) {
  _inherits(Player, _Component);

  function Player(props) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

    _this.controlsHideTimer = null;

    _this.video = null; // the Video component
    _this.manager = new _Manager2.default();
    _this.actions = _this.manager.getActions();
    _this.manager.subscribeToPlayerStateChange(_this.handleStateChange.bind(_this));

    _this.getStyle = _this.getStyle.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    _this.getChildren = _this.getChildren.bind(_this);
    _this.handleMouseMove = (0, _lodash2.default)(_this.handleMouseMove.bind(_this), 250);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.startControlsTimer = _this.startControlsTimer.bind(_this);
    _this.handleFullScreenChange = _this.handleFullScreenChange.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  _createClass(Player, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);

      _fullscreen2.default.addEventListener(this.handleFullScreenChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove event listener
      window.addEventListener('resize', this.handleResize);
      _fullscreen2.default.removeEventListener(this.handleFullScreenChange);
      if (this.controlsHideTimer) {
        window.clearTimeout(this.controlsHideTimer);
      }
    }

    // get playback rate

  }, {
    key: 'getState',


    // get redux state
    // { player, operation }
    value: function getState() {
      return this.manager.getState();
    }

    // play the video

  }, {
    key: 'play',
    value: function play() {
      this.video.play();
    }

    // pause the video

  }, {
    key: 'pause',
    value: function pause() {
      this.video.pause();
    }

    // Change the video source and re-load the video:

  }, {
    key: 'load',
    value: function load() {
      this.video.load();
    }

    // Add a new text track to the video

  }, {
    key: 'addTextTrack',
    value: function addTextTrack() {
      var _video;

      (_video = this.video).addTextTrack.apply(_video, arguments);
    }

    // Check if your browser can play different types of video:

  }, {
    key: 'canPlayType',
    value: function canPlayType() {
      var _video2;

      (_video2 = this.video).canPlayType.apply(_video2, arguments);
    }

    // seek video by time

  }, {
    key: 'seek',
    value: function seek(time) {
      this.video.seek(time);
    }

    // jump forward x seconds

  }, {
    key: 'forward',
    value: function forward(seconds) {
      this.video.forward(seconds);
    }

    // jump back x seconds

  }, {
    key: 'replay',
    value: function replay(seconds) {
      this.video.replay(seconds);
    }

    // enter or exist full screen

  }, {
    key: 'toggleFullscreen',
    value: function toggleFullscreen() {
      this.video.toggleFullscreen();
    }

    // subscribe to player state change

  }, {
    key: 'subscribeToStateChange',
    value: function subscribeToStateChange(listener) {
      this.manager.subscribeToPlayerStateChange(listener);
    }

    // player resize

  }, {
    key: 'handleResize',
    value: function handleResize() {}
  }, {
    key: 'handleFullScreenChange',
    value: function handleFullScreenChange() {
      this.actions.handleFullscreenChange(_fullscreen2.default.isFullscreen);
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      this.startControlsTimer();
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove() {
      this.startControlsTimer();
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown() {
      this.startControlsTimer();
    }
  }, {
    key: 'startControlsTimer',
    value: function startControlsTimer() {
      var _this2 = this;

      this.actions.userActivate(true);
      clearTimeout(this.controlsHideTimer);
      this.controlsHideTimer = setTimeout(function () {
        _this2.actions.userActivate(false);
      }, 3000);
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var fluid = this.props.fluid;

      var _manager$getState = this.manager.getState(),
          player = _manager$getState.player;

      var style = {};
      var width = void 0;
      var height = void 0;
      var aspectRatio = void 0;

      // The aspect ratio is either used directly or to calculate width and height.
      if (this.props.aspectRatio !== undefined && this.props.aspectRatio !== 'auto') {
        // Use any aspectRatio that's been specifically set
        aspectRatio = this.props.aspectRatio;
      } else if (player.videoWidth) {
        // Otherwise try to get the aspect ratio from the video metadata
        aspectRatio = player.videoWidth + ':' + player.videoHeight;
      } else {
        // Or use a default. The video element's is 2:1, but 16:9 is more common.
        aspectRatio = '16:9';
      }

      // Get the ratio as a decimal we can use to calculate dimensions
      var ratioParts = aspectRatio.split(':');
      var ratioMultiplier = ratioParts[1] / ratioParts[0];

      if (this.props.width !== undefined) {
        // Use any width that's been specifically set
        width = this.props.width;
      } else if (this.props.height !== undefined) {
        // Or calulate the width from the aspect ratio if a height has been set
        width = this.props.height / ratioMultiplier;
      } else {
        // Or use the video's metadata, or use the video el's default of 300
        width = player.videoWidth || 400;
      }

      if (this.props.height !== undefined) {
        // Use any height that's been specifically set
        height = this.props.height;
      } else {
        // Otherwise calculate the height from the ratio and the width
        height = width * ratioMultiplier;
      }

      if (fluid) {
        style.paddingTop = ratioMultiplier * 100 + '%';
      } else {
        style.width = width + 'px';
        style.height = height + 'px';
      }

      return style;
    }
  }, {
    key: 'getDefaultChildren',
    value: function getDefaultChildren(props, fullProps) {
      var _this3 = this;

      return [_react2.default.createElement(_Video2.default, _extends({
        ref: function ref(c) {
          _this3.manager.video = _this3.video = c;
        },
        key: 'video',
        order: 0.0
      }, fullProps)), _react2.default.createElement(_PosterImage2.default, _extends({
        key: 'poster-image',
        order: 1.0
      }, props)), _react2.default.createElement(_LoadingSpinner2.default, _extends({
        key: 'loading-spinner',
        order: 2.0
      }, props)), _react2.default.createElement(_Bezel2.default, _extends({
        key: 'bezel',
        order: 3.0
      }, props)), _react2.default.createElement(_BigPlayButton2.default, _extends({
        key: 'big-play-button',
        order: 4.0
      }, props)), _react2.default.createElement(_ControlBar2.default, _extends({
        key: 'control-bar',
        order: 5.0
      }, props)), _react2.default.createElement(_Shortcut2.default, _extends({
        key: 'shortcut',
        order: 99.0
      }, props))];
    }
  }, {
    key: 'getChildren',
    value: function getChildren(props) {
      var propsWithoutChildren = _extends({}, props, {
        children: null
      });
      var children = _react2.default.Children.toArray(this.props.children).filter(function (e) {
        return !(0, _utils.isVideoChild)(e);
      });
      var defaultChildren = this.getDefaultChildren(propsWithoutChildren, props);
      return (0, _utils.mergeAndSortChildren)(defaultChildren, children, propsWithoutChildren);
    }
  }, {
    key: 'handleStateChange',
    value: function handleStateChange(state, prevState) {
      if (state.isFullscreen !== prevState.isFullscreen) {
        this.handleResize();
      }
      this.forceUpdate(); // re-render
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.actions.activate(true);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.actions.activate(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var fluid = this.props.fluid;

      var _manager$getState2 = this.manager.getState(),
          player = _manager$getState2.player;

      var paused = player.paused,
          hasStarted = player.hasStarted,
          waiting = player.waiting,
          seeking = player.seeking,
          isFullscreen = player.isFullscreen,
          userActivity = player.userActivity;

      var props = _extends({}, this.props, {
        player: player,
        actions: this.actions,
        manager: this.manager,
        store: this.manager.store,
        video: this.video ? this.video.video : null
      });
      var children = this.getChildren(props);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)({
            'video-react-controls-enabled': true,
            'video-react-has-started': hasStarted,
            'video-react-paused': paused,
            'video-react-playing': !paused,
            'video-react-waiting': waiting,
            'video-react-seeking': seeking,
            'video-react-fluid': fluid,
            'video-react-fullscreen': isFullscreen,
            'video-react-user-inactive': !userActivity,
            'video-react-user-active': userActivity,
            'video-react-workinghover': !browser.IS_IOS
          }, 'video-react'),
          style: this.getStyle(),
          ref: function ref(c) {
            _this4.manager.rootElement = c;
          },
          onTouchStart: this.handleMouseDown,
          onMouseDown: this.handleMouseDown,
          onMouseMove: this.handleMouseMove,
          onKeyDown: this.handleKeyDown,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          tabIndex: '-1'
        },
        children
      );
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this.video.playbackRate;
    }

    // set playback rate
    // speed of video
    ,
    set: function set(rate) {
      this.video.playbackRate = rate;
    }
  }, {
    key: 'muted',
    get: function get() {
      return this.video.muted;
    },
    set: function set(val) {
      this.video.muted = val;
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.video.volume;
    },
    set: function set(val) {
      this.video.volume = val;
    }

    // video width

  }, {
    key: 'videoWidth',
    get: function get() {
      return this.video.videoWidth;
    }

    // video height

  }, {
    key: 'videoHeight',
    get: function get() {
      return this.video.videoHeight;
    }
  }]);

  return Player;
}(_react.Component);

exports.default = Player;


Player.propTypes = propTypes;
Player.defaultProps = defaultProps;
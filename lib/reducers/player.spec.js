'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _video = require('../actions/video');

var _player3 = require('../actions/player');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('player', function () {

  it('should return the initail state', function () {
    var expectedInitialState = {
      duration: 0,
      currentTime: 0,
      seekingTime: 0,
      buffered: null,
      waiting: true,
      seeking: false,
      paused: true,
      autoPaused: false,
      ended: false,
      playbackRate: 1,
      muted: false,
      volume: 1,
      readyState: 0,
      networkState: 0,
      videoWidth: 0,
      videoHeight: 0,
      hasStarted: false,
      userActivity: true,
      isActive: false,
      isFullscreen: false
    };
    expect((0, _player2.default)(undefined, {})).toEqual(expectedInitialState);
  });

  it('should handle VOLUME_MUTE action with state muted', function () {
    var stateBefore = {
      muted: true
    };
    var action = {
      type: _video.VOLUME_MUTE,
      muted: true
    };
    var stateAfter = {
      muted: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);

    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle VOLUME_MUTE action with state NOT muted', function () {
    var stateBefore = {
      muted: false
    };
    var action = {
      type: _video.VOLUME_MUTE,
      muted: true
    };
    var stateAfter = {
      muted: true
    };

    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);

    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle LOAD_START action', function () {
    var bufferTwo = {
      length: 2,
      start: function start() {},
      end: function end() {}
    };
    var stateBefore = {
      hasStarted: false,
      ended: false,
      buffered: null
    };
    var action = {
      type: _video.LOAD_START,
      buffered: bufferTwo
    };
    var stateAfter = {
      hasStarted: false,
      ended: false,
      buffered: {
        length: 2,
        start: function start() {},
        end: function end() {}
      }
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    var stateResult = (0, _player2.default)(stateBefore, action);
    expect(stateResult.buffered.length).toEqual(stateAfter.buffered.length);
  });

  it('should handle CAN_PLAY action', function () {
    var stateBefore = {
      waiting: true,
      videoWidth: 0,
      videoHeight: 0,
      duration: 0
    };
    var action = {
      type: _video.CAN_PLAY,
      videoWidth: 1080,
      videoHeight: 1920,
      duration: 52.209
    };
    var stateAfter = {
      waiting: false,
      videoWidth: 1080,
      videoHeight: 1920,
      duration: 52.209
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle WAITING action with FALSE', function () {
    var stateBefore = {
      waiting: false
    };
    var action = {
      type: _video.WAITING
    };
    var stateAfter = {
      waiting: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle WAITING action with WAITING true', function () {
    var stateBefore = {
      waiting: true
    };
    var action = {
      type: _video.WAITING
    };
    var stateAfter = {
      waiting: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle PLAYING action with WAITING false', function () {
    var stateBefore = {
      waiting: false
    };
    var action = {
      type: _video.PLAYING
    };
    var stateAfter = {
      waiting: false
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle PLAYING action with WAITING true', function () {
    var stateBefore = {
      waiting: true
    };
    var action = {
      type: _video.PLAYING
    };
    var stateAfter = {
      waiting: false
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle PLAY action', function () {
    var stateBefore = {
      ended: false,
      paused: false,
      autoPaused: false,
      waiting: false,
      hasStarted: true,
      duration: 0
    };
    var action = {
      type: _video.PLAY,
      duration: 52.209
    };
    var stateAfter = {
      ended: false,
      paused: false,
      autoPaused: false,
      waiting: false,
      hasStarted: true,
      duration: 52.209
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle PAUSE action', function () {
    var stateBefore = {
      paused: false
    };
    var action = {
      type: _video.PAUSE
    };
    var stateAfter = {
      paused: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle END action', function () {
    var stateBefore = {
      ended: false
    };
    var action = {
      type: _video.END
    };
    var stateAfter = {
      ended: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SEEKING action', function () {
    var stateBefore = {
      seeking: false
    };
    var action = {
      type: _video.SEEKING
    };
    var stateAfter = {
      seeking: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SEEKED action', function () {
    var stateBefore = {
      seeking: false
    };
    var action = {
      type: _video.SEEKED
    };
    var stateAfter = {
      seeking: false
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle SEEKING_TIME action', function () {
    var stateBefore = {
      seekingTime: 12
    };
    var action = {
      type: _video.SEEKING_TIME,
      time: 12
    };
    var stateAfter = {
      seekingTime: 12
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle END_SEEKING action', function () {
    var stateBefore = {
      seekingTime: 1,
      currentTime: 12
    };
    var action = {
      type: _video.END_SEEKING,
      time: 1
    };
    var stateAfter = {
      seekingTime: 0,
      currentTime: 1
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle DURATION_CHANGE action', function () {
    var stateBefore = {
      duration: 0
    };
    var action = {
      type: _video.DURATION_CHANGE,
      duration: 23
    };
    var stateAfter = {
      duration: 23
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle TIME_UPDATE action', function () {
    var stateBefore = {
      currentTime: 49.11
    };
    var action = {
      type: _video.TIME_UPDATE,
      time: 12.01
    };
    var stateAfter = {
      currentTime: 12.01
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle VOLUME_CHANGE action', function () {
    var stateBefore = {
      volume: 0.99,
      muted: true
    };
    var action = {
      type: _video.VOLUME_CHANGE,
      volume: 0.62,
      muted: false
    };
    var stateAfter = {
      volume: 0.62,
      muted: false
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle PROGRESS_CHANGE action', function () {
    var bufferThree = {
      length: 3,
      start: function start() {},
      end: function end() {}
    };
    var stateBefore = {
      buffered: {
        length: 1,
        start: function start() {},
        end: function end() {}
      }
    };
    var action = {
      type: _video.PROGRESS_CHANGE,
      buffered: bufferThree
    };
    var stateAfter = {
      buffered: bufferThree
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    var stateResult = (0, _player2.default)(stateBefore, action);
    expect(stateResult.buffered.length).toEqual(stateAfter.buffered.length);
  });

  it('should handle RATE_CHANGE action', function () {
    var stateBefore = {
      playbackRate: 1
    };
    var action = {
      type: _video.RATE_CHANGE,
      rate: 1.1
    };
    var stateAfter = {
      playbackRate: 1.1
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle FULLSCREEN_CHANGE action', function () {
    var stateBefore = {
      isFullscreen: false
    };
    var action = {
      type: _player3.FULLSCREEN_CHANGE,
      isFullscreen: true
    };
    var stateAfter = {
      isFullscreen: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle USER_ACTIVATE action', function () {
    var stateBefore = {
      userActivity: false
    };
    var action = {
      type: _player3.USER_ACTIVATE,
      activity: true
    };
    var stateAfter = {
      userActivity: true
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle PLAYER_ACTIVATE action', function () {
    var stateBefore = {
      isActive: true
    };
    var action = {
      type: _player3.PLAYER_ACTIVATE,
      activity: false
    };
    var stateAfter = {
      isActive: false
    };
    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);
    expect((0, _player2.default)(stateBefore, action)).toEqual(stateAfter);
  });
});
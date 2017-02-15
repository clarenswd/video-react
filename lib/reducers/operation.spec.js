'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _operation = require('./operation');

var _operation2 = _interopRequireDefault(_operation);

var _player = require('../actions/player');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('reducer', function () {
  it('should return the initail state', function () {
    var expectedInitialState = {
      count: 0,
      operation: {
        action: '',
        source: ''
      }
    };
    expect((0, _operation2.default)(undefined, {})).toEqual(expectedInitialState);
  });

  it('should increase the count by action', function () {
    var stateBefore = {
      count: 0,
      operation: {
        action: '',
        source: ''
      }
    };
    var action = {
      type: _player.OPERATE,
      operation: {
        action: '',
        source: ''
      }
    };
    var stateAfter = {
      count: 1,
      operation: {
        action: '',
        source: ''
      }
    };

    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);

    expect((0, _operation2.default)(stateBefore, action)).toEqual(stateAfter);
  });

  it('should increase the count 100 by calling the action 100 times', function () {
    var stateBefore = {
      count: 0,
      operation: {
        action: '',
        source: ''
      }
    };
    var action = {
      type: _player.OPERATE,
      operation: {
        action: '',
        source: ''
      }
    };
    var stateAfter = {
      count: 100,
      operation: {
        action: '',
        source: ''
      }
    };

    (0, _deepFreeze2.default)(stateBefore);
    (0, _deepFreeze2.default)(action);

    var state = stateBefore;
    for (var i = 0; i < 100; i++) {
      state = (0, _operation2.default)(state, action);
    }

    expect(state).toEqual(stateAfter);
  });
});
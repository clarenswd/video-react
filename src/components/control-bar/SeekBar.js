import React, { Component, PropTypes } from 'react';
import Slider from '../Slider';
import PlayProgressBar from './PlayProgressBar';
import LoadProgressBar from './LoadProgressBar';
import MouseTimeDisplay from './MouseTimeDisplay';
import { formatTime } from '../../utils';

import Marker from './Marker';

const propTypes = {
  player: PropTypes.object,
  mouseTime: PropTypes.object,
  actions: PropTypes.object,
  markers: PropTypes.array, 
  markerClick: PropTypes.func
};

export default class SeekBar extends Component {

  constructor(props, context) {
    super(props, context);

    this.getPercent = this.getPercent.bind(this);
    this.getNewTime = this.getNewTime.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.stepBack = this.stepBack.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  /**
   * Get percentage of video played
   *
   * @return {Number} Percentage played
   * @method getPercent
   */
  getPercent() {
    const { currentTime, seekingTime, duration } = this.props.player;
    const time = seekingTime || currentTime;
    const percent = time / duration;
    return percent >= 1 ? 1 : percent;
  }

  getNewTime(event) {
    const { player: { duration } } = this.props;
    const distance = this.slider.calculateDistance(event);
    const newTime = distance * duration;

    // Don't let video end while scrubbing.
    return newTime === duration ? newTime - 0.1 : newTime;
  }

  handleMouseDown() {
    const { actions, player } = this.props;
    this.videoWasPlaying = !player.paused;
    actions.pause();
  }

  handleMouseUp(event) {
    const { actions } = this.props;
    const newTime = this.getNewTime(event);
    // Set new time (tell video to seek to new time)
    actions.seek(newTime);
    if (this.videoWasPlaying) {
      actions.play();
    }
    actions.handleEndSeeking(newTime);
  }

  handleMouseMove(event) {
    const { actions } = this.props;
    const newTime = this.getNewTime(event);
    actions.handleSeekingTime(newTime);
  }


  stepForward() {
    const { actions } = this.props;
    actions.forward(5);
  }

  stepBack() {
    const { actions } = this.props;
    actions.replay(5);
  }


  render() {
    let react_this  = this;
    const { player: { currentTime, seekingTime, duration, buffered }, mouseTime } = this.props;
    const time = seekingTime || currentTime;

    let markers = this.props.markers;
    const markerComponents =[];
     
    markers.forEach(function (marker, i ) {
      markerComponents.push(<Marker key={i} seconds={marker.seconds} videoDuration = { marker.duration } markerClick={ react_this.props.markerClick }/>);
    });
     

    return (
      <Slider
        ref={(input) => {
          this.slider = input;
        }}
        label="video progress bar"
        className="video-react-progress-holder"
        valuenow={(this.getPercent() * 100).toFixed(2)}
        valuetext={formatTime(time, duration)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        getPercent={this.getPercent}
        stepForward={this.stepForward}
        stepBack={this.stepBack}
      >
        <LoadProgressBar
          buffered={buffered}
          currentTime={time}
          duration={duration}
        />
        <MouseTimeDisplay
          duration={duration}
          mouseTime={mouseTime}
        />
        <PlayProgressBar
          currentTime={time}
          duration={duration}
        />

        {markerComponents}

      </Slider>
    );
  }
}

SeekBar.propTypes = propTypes;

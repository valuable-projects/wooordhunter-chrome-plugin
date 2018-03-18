import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import Volume from 'material-ui/svg-icons/av/volume-up';
import IconButton from 'material-ui/IconButton';

export default class SoundPlayer extends PureComponent {
  static propTypes = {
    playerStatus: PropTypes.oneOf([Sound.status.PLAYING, Sound.status.STOPPED, Sound.status.PAUSED])
      .isRequired,
    soundUrl: PropTypes.string.isRequired,
    onFinish: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.oneOf(['uk', 'us']).isRequired,
    transcription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.id);
  };

  onFinish = () => {
    this.props.onFinish(this.props.id);
  };

  render() {
    return (
      <div>
        {this.props.description}
        <IconButton onClick={this.onClick}>
          <Volume />
          <Sound
            url={this.props.soundUrl}
            playStatus={this.props.playerStatus}
            onFinishedPlaying={this.onFinish}
          />
        </IconButton>
        {this.props.transcription}
      </div>
    );
  }
}

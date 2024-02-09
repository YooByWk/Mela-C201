// SoundfontProvider.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Soundfont from 'soundfont-player';

class SoundfontProvider extends Component {
  static propTypes = {
    instrumentName: PropTypes.string.isRequired,
    audioContext: PropTypes.object,
    hostname: PropTypes.string,
    render: PropTypes.func,
  };

  static defaultProps = {
    hostname: 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM',
  };

  state = {
    activeAudioNodes: {},
    instrument: null,
  };

  componentDidMount() {
    const { instrumentName, audioContext, hostname } = this.props;
    
    // Set isLoading to true when instrument is loading
    this.setState({ isLoading: true });
  
    Soundfont.instrument(audioContext, instrumentName, { soundfont: 'MusyngKite', host: hostname })
      .then(instrument => {
        // Set isLoading to false when instrument is loaded
        this.setState({ instrument, isLoading: false });
      });
  }

  playNote = midiNumber => {
    const { audioContext } = this.props;
    const { instrument, activeAudioNodes } = this.state;
    const audioNode = instrument.play(midiNumber);

    this.setState({
      activeAudioNodes: { ...activeAudioNodes, [midiNumber]: audioNode },
    });
  };

  stopNote = midiNumber => {
    const { activeAudioNodes } = this.state;
    activeAudioNodes[midiNumber] && activeAudioNodes[midiNumber].stop();
  };

  render() {
    const { render } = this.props;
    const { isLoading } = this.state;

    return render({
      isLoading,
      playNote: this.playNote,
      stopNote: this.stopNote,
    });
  }
}

export default SoundfontProvider;

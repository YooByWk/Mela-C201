// PianoComponent.jsx
import React, { useEffect } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import SoundfontProvider from './SoundfontProvider';
import 'react-piano/dist/styles.css';
import JZZ from 'jzz';
import styled from 'styled-components';




const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM';

const noteRange = {
  first: MidiNumbers.fromNote("C2"),
  last: MidiNumbers.fromNote("C6"),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});



function PianoComponent() {
  const onWheel = (e) => {
    // e.preventDefault();
    const container = document.getElementById('piano-container');
    container.scrollLeft +=e.deltaY
  }


  
  return (

    <div>
      <PianoBackHolder onWheel={onWheel}>
        <PianoContainer id='piano-container'>
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({isLoading ,playNote, stopNote }) => (
              <Piano
                noteRange={noteRange}
                width={1000}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={null} // Disable keyboard shortcuts
                renderNoteLabel={({ keyboardShortcuts, midiNumber, isActive, isAccidental }) => {
                  const isNoteActive = isActive;
                  return !isAccidental ? (
                    <div
                      className={`NoteLabel ${isNoteActive ? "NoteLabel--active" : ""}`}
                      style={{ padding: '1.5px', textAlign: 'center', transform: 'rotate(-90deg)', color:'#000000'}}
                    >
                      {keyboardShortcuts ? keyboardShortcuts.toUpperCase() : ''}
                      <div>{MidiNumbers.getAttributes(midiNumber).note}</div>
                    </div>
                  ) : null;
                }}
              />
            )}
          />
        </PianoContainer>
      </PianoBackHolder>
    </div>

  );
}

export default PianoComponent;

const PianoBackHolder = styled.div`
  position: relative; // Add this
  height: auto;
  min-height: 150vh;
  color: #fff;
  h1 {
    font-size: 2rem;
  }
`

const PianoContainer = styled.div`
  position: absolute; // Add this
  /* bottom: 147vh; // Add this
  left: -60vw; // Add this */
  left: 5vw;
  /* top: 2vh; */
  transform: rotate(90deg);
  transform-origin: top left; // Change this;
  width: 900px;
  height: 1000px;
  overflow-x: auto;
  /* overflow-y: scroll; */
`
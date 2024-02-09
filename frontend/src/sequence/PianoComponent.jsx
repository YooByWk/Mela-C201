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
  last: MidiNumbers.fromNote("B5"),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});



function PianoComponent() {
  return (
    <PianoBackHolder>
      <PianoContainer>
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({isLoading ,playNote, stopNote }) => (
            <Piano
              noteRange={noteRange}
              width={950}
              playNote={playNote}
              stopNote={stopNote}
              disabled={isLoading}
              keyboardShortcuts={null}
              renderNoteLabel={({ keyboardShortcuts, midiNumber, isActive, isAccidental }) => {
                const isNoteActive = isActive;
                return !isAccidental ? (
                  <div
                    className={`NoteLabel ${isNoteActive ? "NoteLabel--active" : ""}`}
                    style={{ padding: '1.5px', textAlign: 'center', color:'#000000'}}
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
  );
}


export default PianoComponent;

const PianoBackHolder = styled.div`

`;

const PianoContainer = styled.div`

`;

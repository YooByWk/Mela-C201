// Code: 시퀀싱 메인 페이지
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import PianoComponent from './PianoComponent';
import MidiVisualizer from './MidiVisualizer';
import MidiUpload from './MidiUpload';


function SequenceMain() {
  const [midiData, setMidiData] = useState(null);
  const [playNote, setPlayNote] = useState(null);
  const [stopNote, setStopNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [containerRef.current]);

  const handleFileChange = (midiData) => {
    try {
      setMidiData(midiData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleNoteAdd = (note) => {
    if (playNote) {
      playNote(note.midi);
    }
  };

  const handleNoteRemove = (note) => {
    if (stopNote) {
      stopNote(note.midi);
    }
  };

  return (
    <div>
      <SequenceContainer ref={containerRef}>
        <PianoComponent />
        <h1>온라인 시퀀싱 작업</h1>
        <MidiUpload onFileChange={handleFileChange} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        
        <div className='midi'>
          <MidiVisualizer Cwidth={containerWidth * 0.95} midiData={midiData} onNoteAdd={handleNoteAdd} onNoteRemove={handleNoteRemove} />
        </div>
      </SequenceContainer>
    </div>
  );
}
export default SequenceMain;

const SequenceContainer = styled.div`
color: #FFFFFF;
display: flex;
flex-direction: column;
overflow-x: scroll;

`;

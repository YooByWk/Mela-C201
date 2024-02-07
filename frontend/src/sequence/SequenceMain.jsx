// Code: 시퀀싱 메인 페이지
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PianoComponent from './PianoComponent';
import MidiVisualizer from './MidiVisualizer';
import MidiUpload from './MidiUpload';


function SequenceMain() {

  const [midiData, setMidiData] = useState(null);
  const [playNote, setPlayNote] = useState(null)
  const [stopNote, setStopNote] = useState(null)

  // 미디 건반 스크롤 방지용 함수
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
    };
  }, []);

  const handleFileChange = (midiData) => {
    setMidiData(midiData);
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

  // 함수 결과
  return ( 
    <div>
      <SequenceContainer>
          <PianoComponent />
        <h1>온라인 시퀀싱 작업</h1>
        <MidiUpload onFileChange={handleFileChange} />
          <MidiVisualizer midiData={midiData}  onNoteAdd={handleNoteAdd} onNoteRemove={handleNoteRemove}/>
      </SequenceContainer>
    </div>
  );
}

export default SequenceMain;

const SequenceContainer = styled.div`
color: #FFFFFF;
display: flex;
`;

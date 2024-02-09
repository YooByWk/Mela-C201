import React, { useEffect, useRef, useState } from "react";
import { select, scaleLinear, axisLeft } from "d3";
import { Midi } from "@tonejs/midi";
import * as Tone from "tone";

function MidiVisualizer({ Cwidth, onNoteAdd, onNoteRemove }) {
  const ref = useRef();
  const [midiData, setMidiData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synths, setSynths] = useState([]);
  const [transportStarted, setTransportStarted] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  const selectTrack = (index) => {
    setSelectedTrackIndex(index);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const arrayBuffer = e.target.result;
        try {
          const midi = new Midi(arrayBuffer);
          setMidiData(midi);
        } catch (error) {
          console.error("미디 파일을 읽는 중 오류가 발생했습니다:", error);
          setMidiData(null);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const initializeSynths = () => {
    if (midiData) {
      const newSynths = midiData.tracks.map(() =>
        new Tone.PolySynth().set({ maxPolyphony: 8196 }).toDestination()
      );
      setSynths(newSynths);
    }
  };

  const playTrack = (track, synth) => {
    if (!synth) {
      alert("악기 정보가 없습니다. 재생할 수 없습니다.");
      return;
    }

    const notes = track.notes;
    notes.forEach((note) => {
      if (note.duration > 0) {
        synth.triggerAttackRelease(note.name, note.duration, note.time);
      }
    });
  };

  const playAllTracks = () => {
    setIsPlaying(true);
    if (!midiData) return;
    const tracks = midiData.tracks;
    tracks.forEach((track, index) => {
      playTrack(track, synths[index]);
    });

    Tone.Transport.start();
    setTransportStarted(true);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    synths.forEach((synth) => {
      if (synth) {
        synth.releaseAll();
      }
    });
    setSynths([]);
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setTransportStarted(false);
  };

  useEffect(() => {
    initializeSynths();
  }, [midiData]);

  useEffect(() => {
    const svg = select(ref.current);
    svg.selectAll('*').remove();
  
    if (midiData && midiData.tracks) {
      const tracks = midiData.tracks;
  
      const width = Cwidth > 0 ? Cwidth : 150;
      const height = 900;
      const margin = { top: 20, right: 20, bottom: 20, left: 80 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
  
      const ticksPerPixel = 60 / 1; // 0.01초당 30픽셀로 계산
  
      const xScale = scaleLinear()
      .domain([0, Math.max(...tracks.map(track => Math.max(...(track.notes || []).map(note => note.ticks || 0))))])
      .range([0, innerWidth ]); // X축 확장
  
      const yScale = scaleLinear()
        .domain([Tone.Midi('C8').toMidi(), Tone.Midi('A0').toMidi()])
        .range([0, innerHeight]);
  
      const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845']; // 각 트랙의 색상 배열
  
      const yAxis = axisLeft(yScale)
        .tickValues(Array.from({ length: 89 }, (_, i) => i + 21))
        .tickFormat(d => Tone.Frequency(d, "midi").toNote());
  
      const yAxisGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
  
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      tracks.forEach((track, index) => {
        const color = colors[index % colors.length]; // 트랙마다 다른 색상 적용
        g.selectAll(`rect-track-${index}`)
          .data(track.notes || [])
          .enter()
          .append('rect')
          .attr('x', d => xScale(d.ticks || 0))
          .attr('y', d => yScale(d.midi))
          .attr('width', d => Math.max(0, (d.durationTicks || 0) / ticksPerPixel)) // 0.1초당 30픽셀로 계산
          .attr('height', yScale(21) - yScale(22)) // 음표 간의 간격 조정
          .attr('fill', color); // 트랙 색상 적용
      });
    }
  }, [midiData]);
  

  useEffect(() => {
    if (transportStarted && !isPlaying) {
      stopPlayback();
    }
  }, [transportStarted, isPlaying]);

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={playAllTracks} disabled={isPlaying}>
        전체 재생
      </button>
      <button onClick={stopPlayback}>정지</button>
      {midiData &&
        midiData.tracks.map((track, index) => (
          <button
            key={index}
            onClick={() => playTrack(track, synths[index])}
            disabled={isPlaying}
          >
            트랙 {index + 1} 재생
          </button>
        ))}
      {/* <svg ref={ref} width={`${Cwidth}px`} height="900" style={{ backgroundColor: 'gray' }} /> */}
      <svg
        ref={ref}
        width={`2000px`}
        height="900"
        style={{ backgroundColor: "gray" }}
        overflow-x='scroll'
      />
    </div>
  );
}

export default MidiVisualizer;

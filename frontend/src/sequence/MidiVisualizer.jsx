import React, { useEffect, useRef, useState } from "react";
import { select, scaleLinear, axisLeft } from "d3";
import { Midi } from "@tonejs/midi";
import * as Tone from "tone";
import "./MidiVisualizer.css"; // CSS 파일 import
import styled from "styled-components";
function MidiVisualizer({ Cwidth, onNoteAdd, onNoteRemove }) {
  const ref = useRef();
  const [midiData, setMidiData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synths, setSynths] = useState([]);
  const [transportStarted, setTransportStarted] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0); // 현재 재생 위치 추가

  let xScale; // xScale 변수만 선언
  const margin = { top: 20, right: 20, bottom: 20, left: 80 }; // margin 변수 추가

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
          // console.error("미디 파일을 읽는 중 오류가 발생했습니다:", error);
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
    if (transportStarted && !isPlaying) {
      stopPlayback();
    }
  }, [transportStarted, isPlaying]);

  useEffect(() => {
    const svg = select(ref.current);
    svg.selectAll('*').remove();
  
    if (midiData && midiData.tracks) {
      const tracks = midiData.tracks;
  
      const width = Cwidth > 0 ? Cwidth * 2.3 : 1600;
      const height = 650;
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom; // 내부 높이 할당
  
      const ticksPerPixel = 100; 
  
      const noteInterval = 0.7; 
  
      const lowestNote = Tone.Midi('A0').toMidi(); // 가장 낮은 음(A0) 
      const highestNote = Tone.Midi('C8').toMidi(); // 가장 높은 음(C8) 
  
      xScale = scaleLinear()
        .domain([0, Math.max(...tracks.map(track => Math.max(...(track.notes || []).map(note => note.ticks || 0)))) * 2])
        .range([0, innerWidth * 2]);
  
      const yScale = scaleLinear()
        .domain([lowestNote, highestNote])
        .range([0, innerHeight - (noteInterval * 12)]); // 음표 간격만큼 내부 높이에서 빼줌
  
      const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845'];
  
      const yAxis = axisLeft(yScale)
      .tickValues([]) // y축의 음 표시를 비움
      .tickFormat(""); // y축의 텍스트 표시를 비움
    
    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
    
  
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      tracks.forEach((track, index) => {
        const color = colors[index % colors.length];
        g.selectAll(`rect-track-${index}`)
          .data(track.notes || [])
          .enter()
          .append('rect')
          .attr('x', d => xScale(d.ticks || 0))
          .attr('y', d => yScale(d.midi + d.name.length - 1)) // 음의 길이만큼 y값을 조정하여 표시
          .attr('width', d => Math.max(0, (d.durationTicks || 0) / ticksPerPixel))
          .attr('height', yScale(lowestNote + 1) - yScale(lowestNote)) // 음표 간격 조정
          .attr('fill', color);
      });

      const positionLineGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const positionLine = positionLineGroup.append('line')
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('y1', 0) // 선의 시작점
        .attr('y2', innerHeight); // 선의 끝점

      Tone.Transport.on('position', (position) => {
        setCurrentPosition(xScale(position));
        positionLine.attr('x1', xScale(position)).attr('x2', xScale(position)); // 빨간선 위치 갱신
      });

      return () => {
        Tone.Transport.off('position');
      };
    }
  }, [midiData, Cwidth, margin]);

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} />
      <Midibutton onClick={playAllTracks} disabled={isPlaying}>
        전체 재생
      </Midibutton>
      <svg
        ref={ref}
        width={Cwidth}
        height="650"
        style={{ backgroundColor: "gray" }}
      />
    </div>
  );
}

export default MidiVisualizer;
const Midibutton = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #4c6faf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`


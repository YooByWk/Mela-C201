import React, { useEffect, useRef, useState } from 'react';
import { select, scaleLinear, axisLeft } from 'd3';
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';

function MidiVisualizer() {
  const ref = useRef();
  const [midiData, setMidiData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);
  const [transportStarted, setTransportStarted] = useState(false);

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
          console.error('미디 파일을 읽는 중 오류가 발생했습니다:', error);
          setMidiData(null);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const initializeSynth = () => {
    const newSynth = new Tone.PolySynth().set({ maxPolyphony: 24 }).toDestination();
    setSynth(newSynth);
  };

  const playTrack = (track) => {
    console.log(midiData)
    if (!synth) {
      alert('악기 정보가 없습니다. 재생할 수 없습니다.');
      return;
    }

    const notes = track.notes;
    notes.forEach(note => {
      if (note.duration > 0) {
        synth.triggerAttackRelease(note.name, note.duration, note.time);
      }
    });
  };
  const CheckData = (ev) => {
    console.log(ev)
    console.log(midiData,'미디')
  } ;

  const playAllTracks = () => {
    setIsPlaying(true);
    if (!midiData) return;
    console.log('미디데이터:', midiData)
    const tracks = midiData.tracks;
    tracks.forEach(track => {
      playTrack(track);
    });

    Tone.Transport.start();
    setTransportStarted(true);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (synth) {
      synth.releaseAll();
      setSynth(null);
    }
    
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setTransportStarted(false);
  };
  
  useEffect(() => {
    initializeSynth();
  }, []);

  useEffect(() => {
    const svg = select(ref.current);
    svg.selectAll('*').remove();

    if (midiData && midiData.tracks) {
      const tracks = midiData.tracks;

      const width = 1800;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 20, left: 80 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = scaleLinear()
        .domain([0, Math.max(...tracks.map(track => Math.max(...(track.notes || []).map(note => note.ticks || 0))))])
        .range([0, innerWidth]);

      const yScale = scaleLinear()
        .domain([Tone.Midi('C5').toMidi(), Tone.Midi('A2').toMidi()])
        .range([0, innerHeight]);

      const yAxis = axisLeft(yScale)
        .tickValues(Array.from({ length: 4 }, (_, i) => Tone.Midi(`A${5 - i}`).toMidi()));

      const yAxisGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      tracks.forEach((track, index) => {
        g.selectAll(`rect-track-${index}`)
          .data(track.notes || [])
          .enter()
          .append('rect')
          .attr('x', d => xScale(d.ticks || 0))
          .attr('y', d => yScale(d.midi))
          .attr('width', d => xScale(d.durationTicks))
          .attr('height', d => 1)
          .attr('fill', 'black');
      });
    }
  }, [midiData]);

  useEffect(() => {
    if (transportStarted && !isPlaying) {
      stopPlayback();
    }
  }, [transportStarted, isPlaying]);

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={playAllTracks} disabled={isPlaying}>재생</button>
      <button onClick={stopPlayback}>정지</button>
      <svg ref={ref} width="1800" height="400" style={{ backgroundColor: 'gray' }} />
      <button onClick={ CheckData}>체크 </button>
    </div>
  );
}

export default MidiVisualizer;
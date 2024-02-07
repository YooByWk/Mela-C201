import { useEffect, useState, useRef } from "react";
import * as Tone from "tone";
import * as d3 from "d3";

function MidiVisualizer({ midiData, onNoteAdd, onNoteRemove }) {
  const ref = useRef();
  const [synth, setSynth] = useState(null)
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  useEffect(() => {
    setSynth(new Tone.Synth().toDestination())
  }, [])

  useEffect(() => {
    if (midiData) {
      const svg = d3.select(ref.current);
      svg.selectAll('*').remove();

      const track = midiData.tracks[selectedTrackIndex];
      const events = track.filter(event => event.type === "channel");
      const ticksPerBeat = midiData.header.ticksPerBeat;
      const microsecondsPerBeat = track.find(event => event.subtype === "setTempo")?.microsecondsPerBeat || 500000;
      const ticksToSeconds = (ticks) => (ticks * microsecondsPerBeat) / (ticksPerBeat * 1000000);

      if (events.length > 0) {
        const xScale = d3.scaleLinear().domain([0, d3.max(events, d => ticksToSeconds(d.deltaTime))]).range([0, 800]);
        const yScale = d3.scaleLinear().domain([0, 127]).range([400, 0]);

        svg.selectAll('rect')
          .data(events)
          .enter()
          .append('rect')
          .attr('x', d => xScale(ticksToSeconds(d.deltaTime)))
          .attr('y', d => yScale(d.noteNumber))
          .attr('width', 5)
          .attr('height', d => 400 - yScale(d.noteNumber))
          .attr('fill', 'white')
          .on('click', d => {
            synth.triggerAttackRelease(Tone.Frequency(d.noteNumber || 0, 'midi').toFrequency(), '8n');
            onNoteAdd && onNoteAdd({ midi: d.noteNumber || 0 });
          })
          .on('contextmenu', (event, d) => {
            if (d.subtype === 'noteOn') {
              synth.triggerAttackRelease(Tone.Frequency(d.noteNumber || 0, 'midi').toFrequency(), '8n');
              onNoteRemove && onNoteRemove({ midi: d.noteNumber || 0 });
            }
            event.preventDefault();
          });
      }
    }
  }, [midiData, selectedTrackIndex, synth, onNoteAdd, onNoteRemove]);

  const handleTrackSelect = (trackIndex) => {
    setSelectedTrackIndex(trackIndex);
  };

  return (
    <div>
      <svg ref={ref} width="800" height="400" style={{backgroundColor: 'black'}} />
      {midiData && midiData.tracks.map((track, index) => (
        track.length > 0 && (
          <button key={index} onClick={() => handleTrackSelect(index)}>
            Track {index + 1}
          </button>
        )
      ))}
    </div>
  );
}

export default MidiVisualizer;

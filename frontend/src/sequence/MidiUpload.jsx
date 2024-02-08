// Code: 파일 업로드 입력을 렌더링합니다.
import React, { useState } from 'react';
import parseMidi from 'midi-file-parser';


function MidiUpload({ onFileChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        const midiData = parseMidi(data);
        onFileChange(midiData);
      };
      reader.readAsBinaryString(file);
      console.log(file)
      // console.log(reader)
    }
  };

  // 파일 업로드 입력을 반환합니다.
  return <input type="file" accept=".mid,.midi" onChange={handleFileChange} />;
}

export default MidiUpload;
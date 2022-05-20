import Webcam from "react-webcam";
import React, { useRef, useState } from "react";

function Screenshot({ webcamRef }) {
  const [webcamOn, setWebcamOn] = useState(false);

  return (
    <div>
      <label className="toggle">
        <input
          className="toggle-checkbox"
          type="checkbox"
          value={webcamOn}
          onClick={() => setWebcamOn(!webcamOn)}
        />
        <span className="toggle-label">Webcam On</span>
      </label>
      <div>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          style={{
            textAlign: "center",
            zindex: 9,
            width: 200,
            height: 200,
            ...(!webcamOn && { opacity: 0 }),
          }}
        />
      </div>
    </div>
  );
}

export default Screenshot;

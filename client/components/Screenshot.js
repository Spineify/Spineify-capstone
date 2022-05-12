import Webcam from "react-webcam";
import React, { useRef, useState } from "react";

function Screenshot({ webcamRef }) {
  const [webcamOn, setWebcamOn] = useState(false);

  // const canvasRef = useRef(null)
  // function drawPose(pose) {
  // 	if (webcam.canvas) {
  // 			ctx.drawImage(webcam.canvas, 0, 0);
  // 			// draw the keypoints and skeleton
  // 			if (pose) {
  // 					const minPartConfidence = 0.5;
  // 					tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
  // 					tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
  // 			}
  // 	}
  // }
  return (
    <div>
      <label className="toggle">
        <input
          className="toggle-checkbox"
          type="checkbox"
          value={webcamOn}
          onClick={() => setWebcamOn(!webcamOn)}
        />
        <div className="toggle-switch"></div>
        <span className="toggle-label">Webcam On</span>
      </label>
      <div className="screenshot">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          style={{
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 400,
            height: 400,
            ...(!webcamOn && { opacity: 0 }),
            // opacity: 0,
          }}
        />
        {/* <canvas
				ref={canvasRef}
				style={{
					position: 'absolute',
					marginLeft: 'auto',
					marginRight: 'auto',
					left: 0,
					right: 0,
					textAlign: 'center',
					zindex: 9,
					width: 400,
					height: 400,
				}}
			/> */}
      </div>
    </div>
  );
}

export default Screenshot;

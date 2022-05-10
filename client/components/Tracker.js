import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Screenshot from "./Screenshot";
import { addPose } from "../store/posture";
import Webcam from "react-webcam";

function Tracker() {
  const [start, setStart] = useState(false);
  const [imageSrc, setImageSrc] = useState("/good_posture.jpeg");
  const [intervalId, setIntervalId] = useState(null);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const webcamRef = useRef(null);

  const URL = "https://teachablemachine.withgoogle.com/models/TzVVyOfnc/";
  let model;
  const init = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmPose.load(modelURL, metadataURL);

    console.log("initialize model: ", model);
  };

  const startPoses = () => {
    setIntervalId(
      setInterval(function () {
        capture();
        analyze();
      }, 5000)
    );
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  });
  const analyze = async () => {
    let imageElement = document.getElementById("image");
    console.log("Current image Element", imageElement);
    const flipHorizontal = false;
    let { pose, posenetOutput } = await model.estimatePose(
      imageElement,
      flipHorizontal
    );
    console.log("postNet OUTPUT", posenetOutput);
    let prediction = await model.predict(posenetOutput);
    console.log("prediction:", prediction);

    dispatch(addPose({ id: userId, data: prediction }));
  };

  return (
    <div className="screenshot">
      {start ? (
        <div>
          <Screenshot model={model} webcamRef={webcamRef} />
        </div>
      ) : null}
      <div>
        <img
          id="image"
          style={{ width: 400, height: 300, zindex: 10 }}
          src={imageSrc}
        />
      </div>
      <button
        onClick={() => {
          setStart(true);
          init();
          startPoses();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setStart(false);
          clearInterval(intervalId);
          setIntervalId(null);
        }}
      >
        Stop
      </button>
    </div>
  );
}

export default Tracker;

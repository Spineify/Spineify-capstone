import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Screenshot from "./Screenshot";
import { addPose } from "../store/posture";
import Webcam from "react-webcam";

const GOOD_POSTURE = "/good_posture.jpeg";
function Tracker() {
  const [start, setStart] = useState(false);
  const [imageSrc, setImageSrc] = useState(GOOD_POSTURE);
  const [model, setModel] = useState(null);

  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const pictureRef = useRef(null);

  // useEffect(() => dispatch(modelThunk), []); //empty array is CDM, only runs once // init in root

  // useEffect(() => dispatch(analyzeThunk),[imageSrc]) //where there are dependencies, its like CDU, runs everytime dependency changes

  useEffect(() => {
    const URL = "https://teachablemachine.withgoogle.com/models/TzVVyOfnc/";
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      const loadedModel = await tmPose.load(modelURL, metadataURL);
      setModel(loadedModel);

      console.log("initialize model: ", model);
    };
    init();
  }, []);

  console.log("rendering start", start);
  useEffect(() => {
    if (!model) {
      return;
    }
    const captureInterval = setInterval(function () {
      //console.log("about to capture", start);
      //if there is no active webcam, it wont take screenshot
      if (!webcamRef.current) {
        return;
      }
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }, 5000);
    return () => {
      //runs when you leave the page
      clearInterval(captureInterval);
    };
  }, [model]);

  useEffect(() => {
    // console.log("image source", imageSrc);
    // console.log("pictureRef", pictureRef.current);
    // console.log("start", start);
    if (start && imageSrc !== GOOD_POSTURE) {
      analyze();
    }
    if (!start && imageSrc !== GOOD_POSTURE) {
      setImageSrc(GOOD_POSTURE);
    }
  }, [imageSrc, start]);

  //init in a thunk, set model in store --> thunk should be dispatched in a useEffect, use through useSelector

  //another useEffect for setInterval, function that returns a function to end
  // const startPoses = () => {
  //   setIntervalId(
  //     setInterval(function () {
  //       capture();
  //       // analyze();
  //     }, 5000)
  //   );
  // };

  //analyze should also be a thunk and should take pictureRef.current, and model as parameters. dispatched in useEffect
  const analyze = async () => {
    let imageElement = pictureRef.current;
    console.log("Current image Element", imageElement);
    const flipHorizontal = false;
    let { pose, posenetOutput } = await model.estimatePose(
      imageElement,
      flipHorizontal
    );
    //console.log("postNet OUTPUT", posenetOutput);
    let prediction = await model.predict(posenetOutput);
    console.log("prediction:", prediction);

    dispatch(addPose({ data: prediction }));
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
          ref={pictureRef}
          id="image"
          style={{
            width: 400,
            height: 300,
            zindex: 10,
            ...(start && { display: "none" }),
          }}
          src={imageSrc}
        />
      </div>
      <button
        onClick={() => {
          setStart(true);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setStart(false);
        }}
      >
        Stop
      </button>
    </div>
  );
}

export default Tracker;

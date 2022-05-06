import React, { useRef, useState, Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";

import SingleBaseCalibration from "./SingleBaseCalibration";

import similarity from "compute-cosine-similarity";

function BaseCalibration() {
  //capture pose data from all three images
  const poseCalculations = async () => {
    const net = await posenet.load({
      flipHorizontal: true,
      inputResolution: { width: 640, height: 480 },
      scale: 0.6,
    });

    const imageElements = document.getElementsByClassName("base");

    let poses = [];
    for (let i = 0; i < imageElements.length; i++) {
      const pose = await net.estimateSinglePose(imageElements[i]);
      poses.push(pose);
    }

    function cosineDistanceMatching(poseVector1, poseVector2) {
      let cosineSimilarity = similarity(poseVector1, poseVector2);
      console.log("cos: ", cosineSimilarity);
      let distance = 2 * (1 - cosineSimilarity);
      console.log("euc: ", Math.sqrt(distance));
      return [cosineSimilarity, Math.sqrt(distance)];
    }

    let poseVector1 = [];
    let poseVector2 = [];
    let poseVector3 = [];
    for (let i = 0; i < 7; i++) {
      poseVector1.push(poses[0].keypoints[i].position.x);
      poseVector1.push(poses[0].keypoints[i].position.y);
      poseVector2.push(poses[1].keypoints[i].position.x);
      poseVector2.push(poses[1].keypoints[i].position.y);
      poseVector3.push(poses[2].keypoints[i].position.x);
      poseVector3.push(poses[2].keypoints[i].position.y);
    }
    let comparison1 = cosineDistanceMatching(poseVector1, poseVector2);
    let comparison2 = cosineDistanceMatching(poseVector1, poseVector3);

    console.log("base vs 2", comparison1);
    console.log("base vs 3", comparison2);

    console.log("1x:", poses[0].keypoints[1].position.x);
    console.log("1y:", poses[0].keypoints[1].position.y);
    console.log("2x:", poses[1].keypoints[1].position.x);
    console.log("2y:", poses[1].keypoints[1].position.y);
    console.log("3x:", poses[2].keypoints[1].position.x);
    console.log("3y:", poses[2].keypoints[1].position.y);

    let nose1x = poses[0].keypoints[0].position.x;
    let nose1y = poses[0].keypoints[0].position.y;
    let leftEye1x = poses[0].keypoints[1].position.x;
    let leftEye1y = poses[0].keypoints[1].position.y;
    let rightEye1x = poses[0].keypoints[2].position.x;
    let rightEye1y = poses[0].keypoints[2].position.y;

    let nose2x = poses[1].keypoints[0].position.x;
    let nose2y = poses[1].keypoints[0].position.y;
    let leftEye2x = poses[1].keypoints[1].position.x;
    let leftEye2y = poses[1].keypoints[1].position.y;
    let rightEye2x = poses[1].keypoints[2].position.x;
    let rightEye2y = poses[1].keypoints[2].position.y;

    let nose3x = poses[2].keypoints[0].position.x;
    let nose3y = poses[2].keypoints[0].position.y;
    let leftEye3x = poses[2].keypoints[1].position.x;
    let leftEye3y = poses[2].keypoints[1].position.y;
    let rightEye3x = poses[2].keypoints[2].position.x;
    let rightEye3y = poses[2].keypoints[2].position.y;

    let area1 = Math.abs(
      (nose1x * (leftEye1y - rightEye1y) +
        leftEye1x * (rightEye1y - nose1y) +
        rightEye1x * (nose1y - leftEye1y)) /
        2
    );
    let area2 = Math.abs(
      (nose2x * (leftEye2y - rightEye2y) +
        leftEye2x * (rightEye2y - nose2y) +
        rightEye2x * (nose2y - leftEye2y)) /
        2
    );
    let area3 = Math.abs(
      (nose3x * (leftEye3y - rightEye3y) +
        leftEye3x * (rightEye3y - nose3y) +
        rightEye3x * (nose3y - leftEye3y)) /
        2
    );

    console.log("area 1", area1);
    console.log("area 2", area2);
    console.log("area 3", area3);
  };

  return (
    <div className="baseCalibrations">
      <SingleBaseCalibration key="1" />
      <SingleBaseCalibration key="2" />
      <SingleBaseCalibration key="3" />
      <button onClick={() => poseCalculations()}>Save</button>
    </div>
  );

  //**question alec - how to traverse using reacthooks */
}

export default BaseCalibration;

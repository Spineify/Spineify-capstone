import React from 'react'
import * as posenet from '@tensorflow-models/posenet'

class PoseNet extends React.Component {
  static defaultProps = {
    videoWidth: 900,
    videoHeight: 700,
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: '#ffadea',
    skeletonLineWidth: 6,
    loadingText: 'Looooooading'
  }

  constructor(props){
    super(props, PoseNet.defaultProps)
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  render() {
    return (
      <div>
        <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
        </div>
      </div>
    )
  }
}

import React, { useRef } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'

import { drawKeypoints, drawSkeleton } from '../utilities'

function Posenet() {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	const runPosenet = async () => {
		const net = await posenet.load({
			flipHorizontal: true,
			inputResolution: { width: 640, height: 480 },
			scale: 0.6,
		})
		setInterval(() => {
			detect(net)
		}, 100)
	}

	const detect = async (net) => {
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			//video prop
			const video = webcamRef.current.video
			const videoWidth = webcamRef.current.video.videoWidth
			const videoHeight = webcamRef.current.video.videoHeight
			//video width-height
			webcamRef.current.video.width = videoWidth
			webcamRef.current.video.height = videoHeight

			// Make Detections
			const pose = await net.estimateSinglePose(video)
			//console.log(pose);

			drawCanvas(pose, videoWidth, videoHeight, canvasRef)
		}
	}
	const drawCanvas = (pose, videoWidth, videoHeight, canvas) => {
		const ctx = canvas.current.getContext('2d')
		canvas.current.width = videoWidth
		canvas.current.height = videoHeight

		drawKeypoints(pose['keypoints'], 0.6, ctx)
		drawSkeleton(pose['keypoints'], 0.7, ctx)
	}

	runPosenet()

	return (
		<div className="posenet">
			<header className="posenet-header">
				<Webcam
					ref={webcamRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 640,
						height: 480,
					}}
				/>

				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						marginLeft: 'auto',
						marginRight: 'auto',
						left: 0,
						right: 0,
						textAlign: 'center',
						zindex: 9,
						width: 640,
						height: 480,
					}}
				/>
			</header>
		</div>
	)
}

export default Posenet
// class PoseNet extends Component {
// 	static defaultProps = {
// 		videoWidth: 900,
// 		videoHeight: 700,
// 		flipHorizontal: true,
// 		algorithm: 'single-pose',
// 		showVideo: true,
// 		showSkeleton: true,
// 		showPoints: true,
// 		minPoseConfidence: 0.1,
// 		minPartConfidence: 0.5,
// 		maxPoseDetections: 2,
// 		nmsRadius: 20,
// 		outputStride: 16,
// 		imageScaleFactor: 0.5,
// 		skeletonColor: '#ffadea',
// 		skeletonLineWidth: 6,
// 		loadingText: 'Loading... be cheeeky',
// 	}
// }

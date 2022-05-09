import Webcam from 'react-webcam'
import React, { useRef, useState, Component } from 'react'
// import * as tf from '@tensorflow/tfjs'
// import * as tmPose from '@teachablemachine/pose'

function Screenshot() {
	const [screenshot, setScreenshot] = useState(
		'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffeedback.seekingalpha.com%2Fusers%2F21355-anonymous%2Ftopics%2F&psig=AOvVaw1zBL_pq1t9_-P3-ghBQBYV&ust=1651937852105000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNjS8Jqay_cCFQAAAAAdAAAAABAD'
	)
	const [webcamToggle, setWebcamToggle] = useState(false)
	const [model, setModel] = useState({})

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	//capture image
	const capture = React.useCallback(async () => {
		const imageSrc = webcamRef.current.getScreenshot()
		console.log(imageSrc)
		setScreenshot(imageSrc)
	})

	//teachable machine model
	const URL = 'https://teachablemachine.withgoogle.com/models/TzVVyOfnc/'

	const init = async () => {
		const modelURL = URL + 'model.json'
		const metadataURL = URL + 'metadata.json'

		setModel(await tmPose.load(modelURL, metadataURL))
		// const maxPredictions = model.getTotalClasses()
		console.log('model', model)
	}

	const predict = async () => {
		const imageElement = document.getElementById('image')
		console.log('img', imageElement)
		console.log('model', model)
		const flipHorizontal = false
		const { pose, posenetOutput } = await model.estimatePose(
			imageElement,
			flipHorizontal
		)
		const prediction = await model.predict(posenetOutput)

		console.log('prediction:', prediction)
	}

	return (
		<div className="screenshot">
			<button onClick={() => init()}>Start</button>
			<div>
				{webcamToggle ? (
					<Webcam
						ref={webcamRef}
						screenshotFormat="image/png"
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
					/>
				) : null}
				<img id="image" src={screenshot} />
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
						width: 400,
						height: 400,
					}}
				/>
				<button
					onClick={(e) => {
						e.preventDefault()
						setWebcamToggle(true)
					}}
				>
					Take Screenshot
				</button>
				{webcamToggle ? (
					<button
						onClick={() => {
							capture()
							setWebcamToggle(false)
						}}
					>
						Take Picture
					</button>
				) : null}

				<button onClick={() => predict()}>Analyze</button>
			</div>
		</div>
	)
}

// function Screenshot() {
// 	// the link to your model provided by Teachable Machine export panel
// 	const URL = 'https://teachablemachine.withgoogle.com/models/TzVVyOfnc/'
// 	let model, webcam, ctx, labelContainer, maxPredictions

// 	async function init() {
// 		const modelURL = URL + 'model.json'
// 		const metadataURL = URL + 'metadata.json'

// 		// load the model and metadata
// 		// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
// 		// Note: the pose library adds a tmPose object to your window (window.tmPose)
// 		model = await tmPose.load(modelURL, metadataURL)
// 		console.log('model', model)
// 		maxPredictions = model.getTotalClasses()

// 		// Convenience function to setup a webcam
// 		const size = 200
// 		const flip = true // whether to flip the webcam
// 		webcam = new tmPose.Webcam(size, size, flip) // width, height, flip
// 		await webcam.setup() // request access to the webcam
// 		await webcam.play()
// 		window.requestAnimationFrame(loop)

// 		// append/get elements to the DOM
// 		const canvas = document.getElementById('canvas')
// 		canvas.width = size
// 		canvas.height = size
// 		ctx = canvas.getContext('2d')
// 		labelContainer = document.getElementById('label-container')
// 		for (let i = 0; i < maxPredictions; i++) {
// 			// and class labels
// 			labelContainer.appendChild(document.createElement('div'))
// 		}
// 	}

// 	async function loop(timestamp) {
// 		webcam.update() // update the webcam frame
// 		await predict()
// 		window.requestAnimationFrame(loop)
// 	}

// 	async function predict() {
// 		// Prediction #1: run input through posenet
// 		// estimatePose can take in an image, video or canvas html element
// 		const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)
// 		// Prediction 2: run input through teachable machine classification model
// 		const prediction = await model.predict(posenetOutput)

// 		for (let i = 0; i < maxPredictions; i++) {
// 			const classPrediction =
// 				prediction[i].className + ': ' + prediction[i].probability.toFixed(2)
// 			labelContainer.childNodes[i].innerHTML = classPrediction
// 		}

// 		// finally draw the poses
// 		drawPose(pose)
// 	}

// 	function drawPose(pose) {
// 		if (webcam.canvas) {
// 			ctx.drawImage(webcam.canvas, 0, 0)
// 			// draw the keypoints and skeleton
// 			if (pose) {
// 				const minPartConfidence = 0.5
// 				tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx)
// 				tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx)
// 			}
// 		}
// 	}

// 	return (
// 		<div>
// 			<div>Teachable Machine Pose Model</div>
// 			<button type="button" onClick={() => init()}>
// 				Start
// 			</button>
// 			<div>
// 				<canvas id="canvas"></canvas>
// 			</div>
// 			<div id="label-container"></div>
// 			<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
// 			<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
// 		</div>
// 	)
// }

export default Screenshot

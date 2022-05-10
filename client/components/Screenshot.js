import Webcam from 'react-webcam'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import * as tf from '@tensorflow/tfjs'
// import * as tmPose from '@teachablemachine/pose'
import { addPose } from '../store/posture'

function Screenshot() {
	//set states/dispatch
	const [imageSrc, setImageSrc] = useState('/good_posture.jpeg')
	const [webcamToggle, setWebcamToggle] = useState(false)
	const [model, setModel] = useState({})
	const dispatch = useDispatch()
	const userId = useSelector((state) => state.auth.id)

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	//capture image using react-webcam
	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot()
		setImageSrc(imageSrc)
	})

	//teachable machine model
	const URL = 'https://teachablemachine.withgoogle.com/models/TzVVyOfnc/'

	const init = async () => {
		const modelURL = URL + 'model.json'
		const metadataURL = URL + 'metadata.json'

		setModel(await tmPose.load(modelURL, metadataURL))
		// const maxPredictions = model.getTotalClasses()
		console.log('initialize model: ', model)
	}

	const predict = async () => {
		const imageElement = document.getElementById('image')
		const flipHorizontal = false
		const { pose, posenetOutput } = await model.estimatePose(
			imageElement,
			flipHorizontal
		)
		const prediction = await model.predict(posenetOutput)
		console.log('prediction:', prediction)

		dispatch(addPose({ id: userId, data: prediction }))
	}

	return (
		<div className="screenshot">
			<button onClick={() => init()}>Start</button>
			<div>
				<img
					id="image"
					style={{ width: 400, height: 300, zindex: 10 }}
					src={imageSrc}
				/>
				{webcamToggle ? (
					<div>
						<Webcam
							ref={webcamRef}
							screenshotFormat="image/png"
							style={{
								// position: 'absolute',
								// marginLeft: 'auto',
								// marginRight: 'auto',
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
								capture()
								setWebcamToggle(false)
								predict()
							}}
						>
							Take Picture
						</button>
					</div>
				) : (
					<div>
						<button
							onClick={(e) => {
								e.preventDefault()
								setWebcamToggle(true)
							}}
						>
							Take Screenshot
						</button>
					</div>
				)}
			</div>
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
	)
}

export default Screenshot

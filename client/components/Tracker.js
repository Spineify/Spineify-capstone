import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Screenshot from './Screenshot'
import { addPose } from '../store/posture'
import Webcam from 'react-webcam'

const GOOD_POSTURE = '/good_posture.jpeg'
function Tracker() {
	const [start, setStart] = useState(false)
	const [imageSrc, setImageSrc] = useState(GOOD_POSTURE)
	const model = useSelector((state) => state.modelReducer)

	const dispatch = useDispatch()
	const webcamRef = useRef(null)
	const pictureRef = useRef(null)

	// useEffect(() => dispatch(modelThunk), []); //empty array is CDM, only runs once // init in root

	useEffect(() => {
		if (!model) {
			return
		}
		const captureInterval = setInterval(function () {
			//if there is no active webcam, it wont take screenshot
			if (!webcamRef.current) {
				return
			}
			const imageSrc = webcamRef.current.getScreenshot()
			setImageSrc(imageSrc)
		}, 5000)
		return () => {
			//runs when you leave the page
			clearInterval(captureInterval)
		}
	}, [model])

	useEffect(() => {
		if (start && imageSrc !== GOOD_POSTURE) {
			analyze()
		}
		if (!start && imageSrc !== GOOD_POSTURE) {
			setImageSrc(GOOD_POSTURE)
		}
	}, [imageSrc, start])

	const analyze = async () => {
		let imageElement = pictureRef.current
		console.log(imageElement)
		const flipHorizontal = false
		let { posenetOutput } = await model.estimatePose(
			imageElement,
			flipHorizontal
		)
		let prediction = await model.predict(posenetOutput)
		console.log('prediction:', prediction)
		dispatch(addPose({ data: prediction }))
	}

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
						...(start && { display: 'none' }),
					}}
					src={imageSrc}
				/>
			</div>
			<button
				onClick={() => {
					setStart(true)
				}}
			>
				Start
			</button>
			<button
				onClick={() => {
					setStart(false)
				}}
			>
				Stop
			</button>
		</div>
	)
}

export default Tracker

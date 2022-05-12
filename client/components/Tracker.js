import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Screenshot from './Screenshot'
import { addPose, getPoses } from '../store/posture'
import Webcam from 'react-webcam'

const GOOD_POSTURE = '/good_posture.jpeg'
const COUNT_POSES = 3
function Tracker() {
	const [start, setStart] = useState(false)
	const [imageSrc, setImageSrc] = useState(GOOD_POSTURE)
	const model = useSelector((state) => state.modelReducer)
	const poses = useSelector((state) => state.posesReducer)
	const [count, setCount] = useState(0)

	const dispatch = useDispatch()
	const webcamRef = useRef(null)
	const pictureRef = useRef(null)

	// if user logs X "No postures", then stop analyzing postures
	//OR
	// then listener listens for idle state, if system is idle, then don't capture image,
	//when user becomes active agian, start capture
	//take picture at interval when model is loaded in
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

	//analyze pose after taking a picture & when the start button is clicked
	useEffect(() => {
		if (start && imageSrc !== GOOD_POSTURE) {
			analyze()
			dispatch(getPoses())
			setCount(count + 1)
		}
		if (!start && imageSrc !== GOOD_POSTURE) {
			setImageSrc(GOOD_POSTURE)
		}
	}, [imageSrc, start])

	//notification
	useEffect(() => {
		if (count === COUNT_POSES) {
			console.log('poses', poses)
			let lastPoses = poses.slice(poses.length - COUNT_POSES)
			let numOfBad = 0
			let numOfGood = 0
			for (let i = 0; i < lastPoses.length; i++) {
				if (lastPoses[i].type === 'Bad Posture') {
					numOfBad++
				} else if (lastPoses[i].type === 'Good Posture') {
					numOfGood++
				}
			}

			if (numOfBad >= 2) {
				console.log('bad posture')
				electron.notificationApi.sendNotification(
					`Seems like you've been working in bad posture for the past hour, we suggest ....`
				)
			} else if (numOfGood >= 2) {
				console.log('good posture')
				electron.notificationApi.sendNotification(`Great Posture! Keep it up!`)
			}

			setCount(0)
		}
	}, [count])

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

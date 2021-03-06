import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Screenshot from './Screenshot'
import { addPose, getPoses } from '../store/posture'
import isElectron from 'is-electron'
import GoodPostureModal from './GoodPostureModal'

const GOOD_POSTURE = '/correct-posture.png'
const COUNT_POSES = 3

function Tracker() {
	const isLoggedIn = useSelector((state) => !!state.auth.id)
	const [start, setStart] = useState(false)
	const [imageSrc, setImageSrc] = useState(GOOD_POSTURE)
	const model = useSelector((state) => state.modelReducer)
	const poses = useSelector((state) => state.posesReducer)
	const [count, setCount] = useState(0)
	const [system, setSystem] = useState('')

	//get today's date
	const today = new Date()
	let date = today.toISOString()
	date = date.substr(0, 10) // format: YYYY-MM-DD

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

		const captureInterval = setInterval(async function () {
			//if there is no active webcam, it wont take screenshot
			if (!webcamRef.current) {
				return
			}

			//track system state ONLY if on electron
			if (isElectron()) {
				const system = await electron.systemState.getSystemState()
				setSystem(system)
				console.log('systemState in Tracker:', system)
				if (system === 'active') {
					const imageSrc = webcamRef.current.getScreenshot()
					setImageSrc(imageSrc)
				}
			} else {
				const imageSrc = webcamRef.current.getScreenshot()
				setImageSrc(imageSrc)
			}
		}, 5000)
		return () => {
			//runs when you leave the page
			clearInterval(captureInterval)
		}
	}, [model])

	//analyze pose after taking a picture & when the start button is clicked
	useEffect(() => {
		if (isElectron()) {
			if (system === 'active') {
				if (start && imageSrc !== GOOD_POSTURE) {
					analyze()
					dispatch(getPoses())
					setCount(count + 1)
				}
				if (!start && imageSrc !== GOOD_POSTURE) {
					setImageSrc(GOOD_POSTURE)
				}
			}
		} else {
			if (start && imageSrc !== GOOD_POSTURE) {
				analyze()
				dispatch(getPoses())
				setCount(count + 1)
			}
			if (!start && imageSrc !== GOOD_POSTURE) {
				setImageSrc(GOOD_POSTURE)
			}
		}
	}, [imageSrc, start])

	//notification
	useEffect(() => {
		if (isElectron()) {
			if (count === COUNT_POSES) {
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
					console.log('bad posture in Tracker:')
					electron.notificationApi.sendNotification(
						`Seems like you've been working in bad posture for the past hour, we suggest ....`
					)
				} else if (numOfGood >= 2) {
					console.log('good posture in Tracker:')
					electron.notificationApi.sendNotification(
						`Great Posture! Keep it up!`
					)
				}

				setCount(0)
			}
		}
	}, [count])

	const analyze = async () => {
		let imageElement = pictureRef.current
		const flipHorizontal = false
		let { posenetOutput } = await model.estimatePose(
			imageElement,
			flipHorizontal
		)
		let prediction = await model.predict(posenetOutput)
		console.log('prediction in Tracker:', prediction)
		dispatch(addPose({ data: prediction }))
	}

	return (
		<div className="tracker-container">
			{isLoggedIn ? (
				<div className="screenshot">
					<div className="tracker-button-container">
						<button
							className="tracker-button tracker-btn-1"
							onClick={() => {
								setStart(true)
							}}
						>
							Start
						</button>
						<button
							className="tracker-button"
							onClick={() => {
								setStart(false)
							}}
						>
							Stop
						</button>
					</div>
					{start ? (
						<div>
							<Screenshot model={model} webcamRef={webcamRef} />
						</div>
					) : null}
					<div>
						<GoodPostureModal
							pictureRef={pictureRef}
							start={start}
							imageSrc={imageSrc}
						/>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default Tracker

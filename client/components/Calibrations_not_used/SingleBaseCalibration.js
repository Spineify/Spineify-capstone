import React, { useRef, useState, Component } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'

function SingleBaseCalibration() {
	const [base, setBase] = useState(
		'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffeedback.seekingalpha.com%2Fusers%2F21355-anonymous%2Ftopics%2F&psig=AOvVaw1zBL_pq1t9_-P3-ghBQBYV&ust=1651937852105000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNjS8Jqay_cCFQAAAAAdAAAAABAD'
	)
	const [webcamToggle, setWebcamToggle] = useState(false)

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	//capture image
	const capture = React.useCallback(async () => {
		const imageSrc = webcamRef.current.getScreenshot()
		console.log(imageSrc)
		setBase(imageSrc)
	})

	return (
		<div className="posenet">
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
							width: 640,
							height: 480,
						}}
					/>
				) : null}
				<img className="base" src={base} />
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
				<button
					onClick={(e) => {
						e.preventDefault()
						setWebcamToggle(true)
					}}
				>
					Add Calibration
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
			</div>
		</div>
	)
}

export default SingleBaseCalibration

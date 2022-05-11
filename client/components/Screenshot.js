import Webcam from 'react-webcam'
import React, { useRef } from 'react'

function Screenshot({ webcamRef }) {
	// const canvasRef = useRef(null)

	return (
		<div className="screenshot">
			<Webcam
				ref={webcamRef}
				screenshotFormat="image/png"
				style={{
					left: 0,
					right: 0,
					textAlign: 'center',
					zindex: 9,
					width: 400,
					height: 400,
					opacity: 0,
				}}
			/>
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

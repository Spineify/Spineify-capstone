import React, { useRef, useState, Component } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'

import SingleBaseCalibration from './SingleBaseCalibration'

import similarity from 'compute-cosine-similarity'

function BaseCalibration() {
	//capture pose data from all three images
	const poseCalculations = async () => {
		const net = await posenet.load({
			flipHorizontal: true,
			inputResolution: { width: 640, height: 480 },
			scale: 0.6,
		})

		const imageElements = document.getElementsByClassName('base')

		let poses = []
		for (let i = 0; i < imageElements.length; i++) {
			const pose = await net.estimateSinglePose(imageElements[i])
			poses.push(pose)
		}

		function cosineDistanceMatching(poseVector1, poseVector2) {
			let cosineSimilarity = similarity(poseVector1, poseVector2)
			console.log('cos: ', cosineSimilarity)
			let distance = 2 * (1 - cosineSimilarity)
			console.log('euc: ', Math.sqrt(distance))
			return [cosineSimilarity, Math.sqrt(distance)]
		}

		let poseVector1 = []
		let poseVector2 = []
		for (let i = 0; i < 7; i++) {
			poseVector1.push(poses[0].keypoints[i].position.x)
			poseVector1.push(poses[0].keypoints[i].position.y)
			poseVector2.push(poses[1].keypoints[i].position.x)
			poseVector2.push(poses[1].keypoints[i].position.y)
		}
		let comparison = cosineDistanceMatching(poseVector1, poseVector2)
		console.log(comparison)

		console.log('1x:', poses[0].keypoints[1].position.x)
		console.log('1y:', poses[0].keypoints[1].position.y)
		console.log('2x:', poses[1].keypoints[1].position.x)
		console.log('2y:', poses[1].keypoints[1].position.y)
	}

	return (
		<div className="baseCalibrations">
			<SingleBaseCalibration key="1" />
			<SingleBaseCalibration key="2" />
			<SingleBaseCalibration key="3" />
			<button onClick={() => poseCalculations()}>Save</button>
		</div>
	)

	//**question alec - how to traverse using reacthooks */
}

export default BaseCalibration

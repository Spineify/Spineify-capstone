import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function ImageModal(props) {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const { pictureRef, start, imageSrc } = props
	return (
		<>
			<button onClick={handleShow} className="image-button">
				<img
					ref={pictureRef}
					id="image"
					style={{
						width: 200,
						height: 200,
						zindex: 10,
						...(start && { display: 'none' }),
					}}
					src={imageSrc}
				/>
			</button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Correct Sitting Posture</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<img className="modal-image" src={imageSrc} />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default ImageModal

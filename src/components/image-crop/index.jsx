import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-image-crop/lib/ReactCrop.scss';

import defaultImage from '../../assets/img/author-page.jpg';
import './style.scss';

export default class ImageCrop extends Component {
	state = {
		src: null,
		crop: {
			aspect: 1 / 1,
			width: 200,
			x: 0,
			y: 0
		},
		modal: false
	};

	toggle = () => {
		this.setState((prevState) => ({
			modal: !prevState.modal
		}));
	};

	onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => this.setState({ src: reader.result }));
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	onImageLoaded = (image, crop) => {
		this.imageRef = image;
	};

	onCropComplete = (crop) => {
		this.makeClientCrop(crop);
	};

	onCropChange = (crop) => {
		this.setState({ crop });
	};

	async makeClientCrop(crop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg');
			this.setState({ croppedImageUrl });
		}
	}

	getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (!blob) {
					console.error('Canvas is empty');
					return;
				}
				blob.name = fileName;
				window.URL.revokeObjectURL(this.fileUrl);
				this.fileUrl = window.URL.createObjectURL(blob);
				resolve(blob);
			}, 'image/jpg');
		});
	}
	render() {
		const { crop, croppedImageUrl, src } = this.state;
		let userImage = defaultImage;
		if (this.props.image) userImage = this.props.image;
		return (
			<Row>
				<Modal
					isOpen={this.state.modal}
					toggle={() => this.toggle()}
					centered
					fade
					size="lg"
					className="image-upload"
				>
					<ModalBody>
						<Row className="crop-span">
							<Col xs={8} className="align-self-center">
								{src && (
									<ReactCrop
										src={src}
										crop={crop}
										keepSelection={true}
										onImageLoaded={this.onImageLoaded}
										onComplete={this.onCropComplete}
										onChange={this.onCropChange}
									/>
								)}
							</Col>
							<Col xs={4} className="text-center">
								{croppedImageUrl && (
									<div>
										<p>Preview</p>
										<img
											alt="Crop"
											style={{ maxWidth: '100%', borderRadius: '50%' }}
											src={window.URL.createObjectURL(croppedImageUrl)}
										/>
									</div>
								)}
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter className="justify-content-between">
						<div>
							<input type="file" onChange={this.onSelectFile} />
						</div>
						<div>
							<Button
								color="primary"
								onClick={() => {
									const { croppedImageUrl } = this.state;
									this.props.setImage(
										new File([ croppedImageUrl ], 'user_avatat.jpg', { type: 'image/jpg' })
									);
									this.toggle();
								}}
							>
								Done
							</Button>{' '}
							<Button color="secondary" onClick={() => this.toggle()}>
								Cancel
							</Button>
						</div>
					</ModalFooter>
				</Modal>
				<Col xs={12} className="text-center">
					<img
						src={croppedImageUrl ? window.URL.createObjectURL(croppedImageUrl) : userImage}
						style={{ width: '150px', borderRadius: '50%' }}
					/>
					<br />
					<Button className="mt-4" onClick={() => this.toggle()}>
						Upload Picture
					</Button>
				</Col>
			</Row>
		);
	}
}

import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./cropImage"
import Swal from "sweetalert2"

const ImageCrop = () => {
	const dogImg =
		"https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels)
	}, [])

	// const showCroppedImage = useCallback(async () => {
	// 	try {
	// 		const croppedImage = await getCroppedImg(dogImg, croppedAreaPixels)
	// 		console.log("donee", { croppedImage })
	// 	} catch (e) {
	// 		console.error(e)
	// 	}
	// }, [croppedAreaPixels])

	// Swal.fire({
	// 	title: "Do you want to save the changes?",
	// 	showDenyButton: true,
	// 	showCancelButton: true,
	// 	confirmButtonText: "Save",
	// 	denyButtonText: `Don't save`,
	// }).then((result) => {
	// 	/* Read more about isConfirmed, isDenied below */
	// 	if (result.isConfirmed) {
	// 		Swal.fire("Saved!", "", "success")
	// 	} else if (result.isDenied) {
	// 		Swal.fire("Changes are not saved", "", "info")
	// 	}
	// })
	// Swal.fire({
	// 	imageUrl: "https://placeholder.pics/svg/300x1500",
	// 	imageHeight: 1500,
	// 	imageAlt: "A tall image",
	// })
	// Swal.fire({
	// 	title: "Sweet!",
	// 	text: "Modal with a custom image.",
	// 	imageUrl: "https://unsplash.it/400/200",
	// 	imageWidth: 400,
	// 	imageHeight: 200,
	// 	imageAlt: "Custom image",
	// })
	Swal.fire({
		title: "Custom width, padding, background.",
		width: 600,
		padding: "1em",
	})
	// Swal.fire({
	// 	title: "<strong>HTML <u>example</u></strong>",
	// 	icon: "info",
	// 	html:
	// 		"You can use <b>bold text</b>, " +
	// 		'<a href="//sweetalert2.github.io">links</a> ' +
	// 		"and other HTML tags",
	// 	showCloseButton: true,
	// 	showCancelButton: true,
	// 	focusConfirm: false,
	// 	confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
	// 	confirmButtonAriaLabel: "Thumbs up, great!",
	// 	cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
	// 	cancelButtonAriaLabel: "Thumbs down",
	// })

	return (
		<div>
			<Cropper
				image={dogImg}
				crop={crop}
				zoom={zoom}
				aspect={1}
				cropShape="round"
				showGrid={false}
				// cropShape="rect"
				// showGrid={true}
				onCropChange={setCrop}
				onCropComplete={onCropComplete}
				onZoomChange={setZoom}
			/>
		</div>
	)
}

export default ImageCrop

import React, { useState, useRef } from "react"
import { useContexts } from "../../../Contexts"
const PasswordSetting = () => {
	const { Toast, api, loadingButton } = useContexts()
	const [submited, setSubmited] = useState(false)
	const [saveButton, setSaveButton] = useState("Save")
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [reNewPassword, setReNewPassword] = useState("")
	const passRef = useRef()
	const newPassRef = useRef()
	const reNewPassRef = useRef()
	const changePassword = (e) => {
		e.preventDefault()
		if (saveButton !== loadingButton) {
			setSaveButton(loadingButton)
			let error = false
			setSubmited(true)
			if (!error) {
				error = "length"
				currentPassword.length < 8
					? passRef.current.focus()
					: newPassword.length < 8
					? newPassRef.current.focus()
					: reNewPassword.length < 8
					? reNewPassRef.current.focus()
					: (error = false)
			}
			if (!error) {
				error = "confirmation"
				if (newPassword === reNewPassword) error = false
			}
			switch (error) {
				case "length":
					Toast.fire({
						icon: "warning",
						title: "Fill all fields and make sure to to write password with at least 8 characters or digit or both!",
					})
					setSaveButton("Save")
					break
				case "confirmation":
					Toast.fire({
						icon: "warning",
						title: "Password and confirm password does not match!",
					})
					setSaveButton("Save")
					break
				case false:
				case "":
				default:
					api()
						.post("/newPassword", {
							currentPassword,
							newPassword,
						})
						.then((response) => {
							const data = response.data
							if (data.message === "success") {
								setCurrentPassword("")
								setNewPassword("")
								setReNewPassword("")
								setSubmited(false)
								Toast.fire({
									icon: "success",
									title: "Your password has been changed successfully!",
								})
							} else {
								Toast.fire({
									icon: "warning",
									title: "Something went wrong!",
								})
							}
						})
						.catch((error) => {
							if (
								error.response &&
								error.response.status === 419
							) {
								// window.location.reload()
							}
							if (
								error.response &&
								error.response.status === 401
							) {
								Toast.fire({
									icon: "warning",
									title: "Incorrect information!",
								})
							} else if (
								error.response &&
								error.response.status === 422
							) {
								Toast.fire({
									icon: "warning",
									title: "Incorrect Infromation!",
								})
							} else {
								Toast.fire({
									icon: "warning",
									title: "Something went wrong!",
								})
							}
						})
						.finally(() => {
							setSaveButton("Save")
						})
					break
			}
		}
	}
	return (
		<div className="nk-social-container accordion-custom">
			{/* START: Settings */}
			<form onSubmit={changePassword}>
				<input
					ref={passRef}
					type="password"
					className={
						"form-control" +
						(passRef &&
						passRef.current &&
						submited &&
						passRef.current.value.length < 8
							? " forced"
							: "")
					}
					placeholder="Current Password"
					onChange={(e) => setCurrentPassword(e.target.value)}
					value={currentPassword}
				/>
				<div className="nk-gap-2" />
				<input
					ref={newPassRef}
					type="password"
					className={
						"form-control" +
						(newPassRef &&
						newPassRef.current &&
						submited &&
						newPassRef.current.value.length < 8
							? " forced"
							: newPassRef &&
							  reNewPassRef &&
							  newPassRef.current &&
							  reNewPassRef.current &&
							  newPassRef.current.value !==
									reNewPassRef.current.value
							? " error"
							: "")
					}
					placeholder="New Password"
					onChange={(e) => setNewPassword(e.target.value)}
					value={newPassword}
				/>
				<div className="nk-gap-2" />
				<input
					ref={reNewPassRef}
					type="password"
					className={
						"form-control" +
						(reNewPassRef &&
						reNewPassRef.current &&
						submited &&
						reNewPassRef.current.value.length < 8
							? " forced"
							: reNewPassRef &&
							  newPassRef &&
							  reNewPassRef.current &&
							  newPassRef.current &&
							  reNewPassRef.current.value !==
									newPassRef.current.value
							? " error"
							: "")
					}
					placeholder="Confirm New Password"
					onChange={(e) => setReNewPassword(e.target.value)}
					value={reNewPassword}
				/>
				<div className="mt-5">
					<em>Repeat New Password</em>
				</div>
				<div className="nk-gap-2" />
				<button className="nk-btn link-effect-4 nk-btn-bg-main-custom float-right">
					{saveButton}
				</button>
			</form>
			{/* END: Settings */}
		</div>
	)
}

export default PasswordSetting

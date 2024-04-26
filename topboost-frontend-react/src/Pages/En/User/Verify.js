import React, { useState, useEffect } from "react"
import { useContexts } from "../../../Contexts"
import Loader from "react-loader-spinner"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
const Verify = () => {
	const history = useHistory()
	const {
		Toast,
		userData,
		isLogin,
		loadingButton,
		api,
		setUsername,
		setUserData,
	} = useContexts()
	useEffect(() => {
		if (userData && userData.email_verified_at !== null) {
			history.push("/user")
		}
	}, [userData])
	const [resendButton, setResendButton] = useState("Resend")
	const resendEmail = () => {
		if (
			resendButton !== loadingButton &&
			userData &&
			userData.email_verified_at === null
		) {
			setResendButton(loadingButton)
			api()
				.post("/resendVerify")
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setUsername(data.user.name)
						setUserData(data.user)
						Toast.fire({
							icon: "success",
							title: "An email has been sent with a link to activate your account!",
						})
					} else if (data.message === "waiting") {
						let timerInterval
						Swal.fire({
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							title: "Auto close alert!",
							html:
								"You can request again in <b>" +
								data.seconds +
								"</b> seconds.",
							timer: data.seconds * 1000,
							timerProgressBar: true,
							showCloseButton: true,
							didOpen: (toast) => {
								toast.addEventListener(
									"mouseenter",
									Swal.stopTimer
								)
								toast.addEventListener(
									"mouseleave",
									Swal.resumeTimer
								)
								Swal.showLoading()
								const b =
									Swal.getHtmlContainer().querySelector("b")
								timerInterval = setInterval(() => {
									b.textContent = (
										Swal.getTimerLeft() / 1000
									).toFixed(0)
								}, 1000)
							},
							willClose: () => {
								clearInterval(timerInterval)
							},
						})
					} else {
						Toast.fire({
							icon: "warning",
							title: "Something went wrong please try again later!",
						})
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						// window.location.reload()
					}
					Toast.fire({
						icon: "warning",
						title: "Something went wrong please try again later!",
					})
				})
				.finally(() => {
					setResendButton("Resend")
				})
		}
	}
	return (
		<>
			{isLogin && userData ? (
				<>
					<div className="nk-gap-4" />
					<div className="container">
						<div className="nk-info-box bg-main-4">
							<div className="nk-info-box-icon">
								<i className="ion-email" />
							</div>
							Check your email account for the verification link!
							<div className="nk-gap" />
							<button
								className="nk-btn link-effect-4 nk-btn-bg-main-custom"
								onClick={() => resendEmail()}
							>
								<span>{resendButton}</span>
								<span className="icon pl-3">
									<i className="ion-android-send" />
								</span>
							</button>
						</div>
					</div>
					<div className="nk-gap-4" />
				</>
			) : (
				<>
					<div className="nk-gap-4" />
					<div className="container">
						<div className="nk-info-box bg-main-4 text-center">
							<div className="nk-gap" />
							<Loader
								className="ml-auto mr-auto"
								type="Oval"
								color="#FFF"
								height="50"
							/>
							<div className="nk-gap" />
						</div>
					</div>
					<div className="nk-gap-4" />
				</>
			)}
		</>
	)
}

export default Verify

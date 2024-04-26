import React, { useRef, useState } from "react"
import { Dot } from "react-animated-dots"
import { useContexts } from "../../Contexts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const CustomPay = () => {
	const { Toast, api } = useContexts()
	const [sendButton, setSendButton] = useState("Send")
	const EmailRef = useRef()
	const NameRef = useRef()
	const MessageRef = useRef()
	const Submiter = (e) => {
		e.preventDefault()
		if (sendButton === "Send") {
			if (
				EmailRef.current.value.length &&
				NameRef.current.value.length &&
				MessageRef.current.value.length
			) {
				const email = EmailRef.current.value
				const name = NameRef.current.value
				const message = MessageRef.current.value
				setSendButton(
					<>
						<Dot>.</Dot>
						<Dot>.</Dot>
						<Dot>.</Dot>
					</>
				)
				api()
					.post("/custompay", {
						email: email,
						name: name,
						message: message,
					})
					.then((response) => {
						const data = response.data
						if (data.code !== "undefined") {
							switch (data.code) {
								case 0:
									Toast.fire({
										icon: "warning",
										title: "Fill the important fields!",
									})
									break
								case 1:
									Toast.fire({
										icon: "info",
										title: "You can't send more than one message per minute!",
									})
									break
								case 200:
									alert(
										"https://topboost.net/checkout/" +
											data.codee
									)
									break
								default:
									Toast.fire({
										icon: "warning",
										title: "Something went wrong!",
									})
									break
							}
						}
					})
					.catch((error) => {
						if (error.response && error.response.status === 419) {
							window.location.reload()
						}
						Toast.fire({
							icon: "warning",
							title: "Something went wrong!",
						})
					})
					.finally(() => setSendButton("Send"))
			} else {
				Toast.fire({
					icon: "warning",
					title: "Fill the important fields!",
				})
			}
		}
	}
	return (
		<>
			<div className="nk-gap" />
			<div className="nk-gap" />
			<div className="container col-10">
				<div className="row">
					<div className="col-md-8 ml-auto mr-auto accordion-custom mb-30">
						<div className="nk-box-3 bg-image-1">
							<form
								className="nk-form nk-form-style-1"
								onSubmit={Submiter}
							>
								<input
									ref={EmailRef}
									type="text"
									className="form-control required"
									placeholder="Title"
								/>
								<div className="nk-gap-1" />
								<textarea
									ref={MessageRef}
									className="form-control required"
									rows={5}
									placeholder="Info"
									defaultValue={""}
								/>
								<div className="nk-gap-1" />
								<input
									ref={NameRef}
									type="text"
									className="form-control required"
									placeholder="Price"
								/>
								<div className="nk-gap-1" />
								<div className="nk-form-response-success" />
								<div className="nk-form-response-error" />
								<button
									type="submit"
									className="nk-btn nk-btn-lg nk-btn-bg-main-3 link-effect-1"
								>
									{sendButton}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="nk-gap-2" />
			<div className="nk-gap-4" />
			<div className="nk-gap-6" />
		</>
	)
}

export default CustomPay

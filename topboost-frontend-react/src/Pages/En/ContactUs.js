import React, { useRef, useState } from "react"
import { Dot } from "react-animated-dots"
import { useContexts } from "../../Contexts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const ContactUs = () => {
	const { Toast, api } = useContexts()
	const [sendButton, setSendButton] = useState("Send")
	const EmailRef = useRef()
	const NameRef = useRef()
	const DiscordRef = useRef()
	const OrderRef = useRef()
	const MessageRef = useRef()
	const Submiter = (e) => {
		e.preventDefault()
		if (sendButton === "Send") {
			if (
				EmailRef.current.value.length &&
				NameRef.current.value.length &&
				DiscordRef.current.value.length &&
				MessageRef.current.value.length
			) {
				const email = EmailRef.current.value
				const name = NameRef.current.value
				const discordId = DiscordRef.current.value
				const orderId = OrderRef.current.value
				const message = MessageRef.current.value
				setSendButton(
					<>
						<Dot>.</Dot>
						<Dot>.</Dot>
						<Dot>.</Dot>
					</>
				)
				api()
					.post("/contactUs", {
						email: email,
						name: name,
						discordId: discordId,
						orderId: orderId,
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
									Toast.fire({
										icon: "success",
										title: "Your message has been sent successfully!",
									})
									MessageRef.current.value = ""
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
			<div className="nk-box">
				<div className="container">
					<div className="nk-gap-5" />
					<h1 className="nk-title">Contact US</h1>
					<div className="nk-gap-4" />
				</div>
			</div>
			<div className="nk-gap-4" />
			<div className="container col-10">
				<div className="row">
					<div className="col-md-5 col-sm-12 ml-auto mr-auto mr-10 accordion-custom mb-30">
						<div className="nk-box-3 bg-image-1 pl-15 pr-15">
							<h2 className="nk-title h3">Drop Us a Line</h2>
							<div className="nk-gap" />
							<form
								className="nk-form nk-form-style-1"
								onSubmit={Submiter}
							>
								<input
									ref={EmailRef}
									type="email"
									className="form-control required"
									placeholder="Email *"
								/>
								<div className="nk-gap-1" />
								<input
									ref={NameRef}
									type="text"
									className="form-control required"
									placeholder="Name *"
								/>
								<div className="nk-gap-1" />
								<input
									ref={DiscordRef}
									type="text"
									className="form-control required"
									placeholder="Discord ID *"
								/>
								<div className="nk-gap-1" />
								<input
									ref={OrderRef}
									type="text"
									className="form-control"
									placeholder="Order URL"
								/>
								<div className="nk-gap-1" />
								<textarea
									ref={MessageRef}
									className="form-control required"
									rows={5}
									placeholder="Message *"
									defaultValue={""}
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
					<div className="col-md-5 col-sm-12 ml-10 ml-auto mr-auto accordion-custom mb-30">
						<div className="nk-box-3 bg-image-1 pl-15 pr-15">
							<h2 className="nk-title h3">YOU CAN REACH US</h2>
							<div className="nk-gap" />
							<div className="row">
								<div className="col-12 mb-10">
									<span className="nk-dropcap">
										<FontAwesomeIcon icon={faAt} />
									</span>
									<p className="mt-10">
										<a
											href="mailto:support@topboost.net"
											target="_blank"
										>
											support@topboost.net
										</a>
									</p>
								</div>
								<div className="col-12 mb-10">
									<span className="nk-dropcap">
										<FontAwesomeIcon icon={faDiscord} />
									</span>
									<p className="mt-10">
										<a
											href="https://discord.gg/fgzVvyd"
											target="_blank"
										>
											Discord server of TopBoost
										</a>
									</p>
								</div>
							</div>
							<div className="nk-gap" />
							<h2 className="nk-title h3">LEGAL INFORMATIONS</h2>
							<div className="nk-gap" />
							<div className="row">
								<div className="col-12 mb-10">
									<span style={{ color: "#5bc0de" }}>
										Name:
									</span>
									<p className="mt-10">TopBoost Group LTD</p>
								</div>
								<div className="col-12 mb-10">
									<span style={{ color: "#5bc0de" }}>
										Registered Office:
									</span>
									<p className="mt-10">
										71-75 Shelton Street, Covent Garden,
										London, United Kingdom, WC2H 9JQ
									</p>
								</div>
								<div className="col-12 mb-10">
									<span style={{ color: "#5bc0de" }}>
										Company Number:
									</span>
									<p className="mt-10">+1 210 591 8468</p>
								</div>
							</div>
							<div className="nk-gap" />
							<h2 className="nk-title h3">JOBS</h2>
							<div className="nk-gap" />
							<div className="row">
								<div className="col-12 mb-10">
									<p className="mt-10">
										We are looking for boosters. More
										informations about open spots,{" "}
										<Link to="/Work-With-Us">
											you can find here
										</Link>
									</p>
								</div>
							</div>
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

export default ContactUs

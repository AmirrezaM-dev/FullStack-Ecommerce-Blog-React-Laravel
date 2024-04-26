import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import Loader from "react-loader-spinner"
import { useContexts } from "../../Contexts"
import { useStripe } from "@stripe/react-stripe-js"
import Error from "./Error"

const Checkout = () => {
	const stripe = useStripe()
	const { Toast, api, email_test } = useContexts()
	const { purchase_code } = useParams()
	const [isLoaded, setIsLoaded] = useState(false)
	const [is404, setIs404] = useState(false)
	const [checkoutData, setCheckoutData] = useState(false)
	const [stripeButton, setstripeButton] = useState("Stripe")
	const [isStripe, setIsStripe] = useState(false)
	const [discordId, setDiscordId] = useState("")
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [usernamePlaceholder, setUsernamePlaceholder] =
		useState("Game Username")
	const [password, setPassword] = useState("")
	const [discordIdClass, setDiscordIdClass] = useState("")
	const [emailClass, setEmailClass] = useState("")
	const [usernameClass, setUsernameClass] = useState("")
	const [passwordClass, setPasswordClass] = useState("")
	const [passwordParentClass, setPasswordParentClass] = useState("")
	const [usernameParentClass, setUsernameParentClass] = useState("")
	const discordIdRef = useRef()
	const emailRef = useRef()
	const usernameRef = useRef()
	const passwordRef = useRef()
	useEffect(() => {
		if (!isLoaded) {
			api()
				.post("/checkout", {
					code: purchase_code,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						let typeOfService = JSON.parse(
							data.data[0].cart
						).filter(
							(item) =>
								item.length >= 3 &&
								item[2] === false &&
								item[0]
									.toLowerCase()
									.indexOf("type of service") !== -1
						)
						let typeOfDuo = JSON.parse(data.data[0].cart).filter(
							(item) =>
								item.length >= 3 &&
								item[2] === false &&
								item[0].toLowerCase().indexOf("type of duo") !==
									-1
						)
						setCheckoutData(data.data[0])
						setIsLoaded(true)
						setUsernamePlaceholder(
							"Game " +
								((typeOfService.length >= 2 &&
									typeOfService[1].toLowerCase() === "duo") ||
								typeOfDuo.length
									? "Summoner Name"
									: "Username")
						)
						if (
							(typeOfService.length >= 2 &&
								typeOfService.length[1].toLowerCase() ===
									"duo") ||
							typeOfDuo.length
						) {
							setUsernameParentClass(" mr-auto")
							setPasswordParentClass(" hide")
						}
					} else {
						setIs404(true)
					}
				})
				.catch((error) => {
					console.log(error)
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setIs404(true)
				})
				.finally(() => {})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const stripePay = () => {
		if (isLoaded) {
			let typeOfService = JSON.parse(checkoutData.cart).filter(
				(item) =>
					item.length >= 3 &&
					item[2] === false &&
					item[0].toLowerCase().indexOf("type of service") !== -1
			)
			let typeOfDuo = JSON.parse(checkoutData.cart).filter(
				(item) =>
					item.length >= 3 &&
					item[2] === false &&
					item[0].toLowerCase().indexOf("type of duo") !== -1
			)
			if (
				checkoutData.paid !== 1 &&
				(!discordId.length ||
					!email.length ||
					!username.length ||
					(!password.length &&
						((typeOfService.length >= 2 &&
							typeOfService[1].toLowerCase() !== "duo") ||
							!typeOfDuo.length)) ||
					!email_test.test(email))
			) {
				!discordId.length ? (
					discordIdRef.current.focus()
				) : !email.length ? (
					emailRef.current.focus()
				) : !email_test.test(email) ? (
					emailRef.current.focus()
				) : !username.length ? (
					usernameRef.current.focus()
				) : !password.length &&
				  ((typeOfService.length >= 2 &&
						typeOfService[1].toLowerCase() !== "duo") ||
						!typeOfDuo.length) ? (
					passwordRef.current.focus()
				) : (
					<></>
				)
				!discordId.length
					? setDiscordIdClass("forced")
					: setDiscordIdClass("")
				!email.length
					? setEmailClass("forced")
					: !email_test.test(email)
					? setEmailClass("error")
					: setEmailClass("")
				!username.length
					? setUsernameClass("forced")
					: setUsernameClass("")
				!password.length
					? setPasswordClass("forced")
					: setPasswordClass("")
			} else {
				if (!isStripe) {
					setIsStripe(true)
					setstripeButton(
						<Loader
							className="ml-auto mr-auto"
							type="Oval"
							color="#FFF"
							height="50"
						/>
					)
					api()
						.post("/checkout", {
							code: purchase_code,
							pay: true,
							discordId: discordId,
							email: email,
							username: username,
							password: password,
						})
						.then((response) => {
							const data = response.data
							if (
								data.message === "success" &&
								data.data.sessionId
							) {
								stripe.redirectToCheckout({
									sessionId: data.data.sessionId,
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
								window.location.reload()
							}
							Toast.fire({
								icon: "warning",
								title: "Something went wrong!",
							})
						})
						.finally(() => {
							setstripeButton("Stripe")
							setIsStripe(false)
						})
				}
			}
		}
	}
	return !is404 ? (
		<div className="row accordion-custom">
			<div className="col-8 paypal">
				{checkoutData !== false ? (
					<>
						<div className="paypal__header">
							<div className="paypal__logo-wrapper">
								<img
									src="/assets/images/large-logo.png"
									width="200%"
									alt="Paypal"
									className="paypal__logo"
								/>
							</div>
							<div className="paypal__header-info">
								<span className="paypal__date">
									{
										checkoutData.created_at
											.replace("T", " ")
											.split(".")[0]
									}
								</span>
								<span className="paypal__ref">
									Purchase Code : {purchase_code}
								</span>
							</div>
						</div>
						<div className="paypal__subheader-wrapper">
							<div className="paypal__subheader">
								<h1 className="paypal__username">
									{checkoutData.title}
								</h1>
							</div>
						</div>
						<div className="paypal__cart">
							<h2 className="paypal__cart-title">Cart:</h2>
							<ul className="paypal__cart-list">
								{JSON.parse(checkoutData.cart)
									.filter((item) => item[1] && item[2])
									.map((item, key) => {
										return (
											<li
												key={key}
												className="paypal__cart-item"
											>
												<span className="paypal__index">
													{key + 1}
												</span>
												<span className="paypal__item-name">
													{item[0]}
												</span>
												<span className="paypal__item-price">
													{item[1].toFixed(2)} &euro;
												</span>
											</li>
										)
									})}
								<li className="paypal__cart-item">
									<span className="paypal__cart-total">
										Total
									</span>
									<span className="paypal__item-price last">
										{checkoutData.price.toFixed(2)} &euro;
									</span>
								</li>
							</ul>
						</div>
						{!checkoutData.paid ? (
							<div className="col-md-12 mt-25">
								<div className="row vertical-gap">
									<div className="col-md-3 ml-auto">
										<input
											ref={discordIdRef}
											className={
												"form-control " + discordIdClass
											}
											type="text"
											placeholder="Discord ID"
											onChange={(e) =>
												setDiscordId(
													e.currentTarget.value
												)
											}
										/>
									</div>
									<div className="col-md-3">
										<input
											ref={emailRef}
											className={
												"form-control " + emailClass
											}
											type="email"
											placeholder="Email"
											onChange={(e) =>
												setEmail(e.currentTarget.value)
											}
										/>
									</div>
									<div
										className={
											"col-md-3" + usernameParentClass
										}
									>
										<input
											ref={usernameRef}
											className={
												"form-control " + usernameClass
											}
											type="text"
											placeholder={usernamePlaceholder}
											onChange={(e) =>
												setUsername(
													e.currentTarget.value
												)
											}
										/>
									</div>
									<div
										className={
											"col-md-3 mr-auto" +
											passwordParentClass
										}
									>
										<input
											ref={passwordRef}
											className={
												"form-control " + passwordClass
											}
											type="password"
											placeholder="Game Password"
											onChange={(e) =>
												setPassword(
													e.currentTarget.value
												)
											}
										/>
									</div>
								</div>
								<div className="nk-gap-2" />
							</div>
						) : (
							<></>
						)}
						{!checkoutData.paid ? (
							<div className="paypal__footer row pl-50 pr-50">
								<div
									className="btn col-2 ml-auto mr-auto"
									onClick={stripePay}
								>
									<div className="shop-now">
										{stripeButton}
									</div>
									<div className="snowflake-grid to-left">
										<div className="snowflake-item border-bottom border-right">
											<div className="sub-items border-right border-bottom pull-down">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
										<div className="snowflake-item border-bottom border-left">
											<div className="sub-items border-right border-bottom r-90 pull-down-right">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
										<div className="snowflake-item border-top border-right">
											<div className="sub-items border-right border-bottom r-270 pull-right">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
										<div className="snowflake-item border-top border-left">
											<div className="sub-items border-right border-bottom r-180 pull-left">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
									</div>
									<div className="snowflake-grid to-right">
										<div className="snowflake-item border-bottom border-right">
											<div className="sub-items border-right border-bottom pull-down">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
										<div className="snowflake-item border-bottom border-left">
											<div className="sub-items border-right border-bottom r-90 pull-down-right">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
										<div className="snowflake-item border-top border-right">
											<div className="sub-items border-right border-bottom r-270 pull-right">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
										<div className="snowflake-item border-top border-left">
											<div className="sub-items border-right border-bottom r-180 pull-left">
												<div className="m-w-15 m-h-15 border-right border-bottom m-3" />
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
					</>
				) : (
					<div className="paypal__header row">
						<div className="btn col ml-auto mr-auto">
							<Loader
								className="ml-auto mr-auto"
								type="Circles"
								color="#FFF"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<Error />
	)
}

export default Checkout

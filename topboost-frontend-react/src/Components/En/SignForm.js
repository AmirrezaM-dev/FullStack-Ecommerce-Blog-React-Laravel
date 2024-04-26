import React, { useState, useRef } from "react"
import { useContexts } from "../../Contexts"
import { Dot } from "react-animated-dots"
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
// import Loader from "react-loader-spinner"

const SignForm = () => {
	const history = useHistory()
	const { Toast, setIsLogin, api, email_test, setUsername, setUserData } =
		useContexts()
	const bgImg = process.env.PUBLIC_URL + "/assets/images/login-bg.jpg"
	const loadingButton = (
		<>
			<Dot>.</Dot>
			<Dot>.</Dot>
			<Dot>.</Dot>
		</>
	)
	const toggleSignForm = () => {
		const signToggle = document.querySelector(".nk-sign-toggle.active")
		if (signToggle) {
			signToggle.click()
		}
	}
	const [loginButton, setLoginButton] = useState("Log In")
	const [registerButton, setRegisterButton] = useState("Register")
	const [checkButton, setCheckButton] = useState("Check")
	const [Lemail, setLEmail] = useState("")
	const [Lpassword, setLPassword] = useState("")
	const LemailRef = useRef()
	const LpasswordRef = useRef()
	const [LemailClass, setLEmailClass] = useState("")
	const [LpasswordClass, setLPasswordClass] = useState("")
	const [Femail, setFEmail] = useState("")
	const FemailRef = useRef()
	const [FemailClass, setFemailClass] = useState("")
	const [Remail, setREmail] = useState("")
	const [Rpassword, setRPassword] = useState("")
	const [Rname, setRName] = useState("")
	const RemailRef = useRef()
	const RpasswordRef = useRef()
	const RnameRef = useRef()
	const [RnameClass, setRNameClass] = useState("")
	const [RemailClass, setREmailClass] = useState("")
	const [RpasswordClass, setRPasswordClass] = useState("")
	const [agree, setAgree] = useState(false)
	const signIn = (e) => {
		let error = 0
		e.preventDefault()
		if (loginButton === "Log In") {
			setLoginButton(loadingButton)
			!Lemail.length ? setLEmailClass(" forced") : setLEmailClass("")
			!Lpassword.length
				? setLPasswordClass(" forced")
				: setLPasswordClass("")
			!Lemail.length ? (
				LemailRef.current.focus()
			) : !Lpassword.length ? (
				LpasswordRef.current.focus()
			) : (
				<></>
			)
			if (Lemail.length && Lpassword.length) {
				api()
					.post("/login", { email: Lemail, password: Lpassword })
					.then((response) => {
						const data = response.data
						if (data.message === "success") {
							toggleSignForm()
							setIsLogin(true)
							setUsername(data.user.name)
							setUserData(data.user)
							LemailRef.current.value = ""
							Toast.fire({
								icon: "success",
								title: "Successfully logged in!",
							})
							history.push("/user")
						} else {
							setUserData(null)
							Toast.fire({
								icon: "warning",
								title: "Something went wrong!",
							})
						}
					})
					.catch((error) => {
						setUserData(null)
						if (error.response && error.response.status === 419) {
							window.location.reload()
						}
						if (error.response && error.response.status === 401) {
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
								title: "Username or Email already exist!",
							})
						} else {
							Toast.fire({
								icon: "warning",
								title: "Something went wrong!",
							})
						}
					})
					.finally(() => {
						LpasswordRef.current.value = ""
						setLoginButton("Log In")
					})
			} else {
				setLoginButton("Log In")
			}
		}
	}
	const signUp = (e) => {
		e.preventDefault()
		if (registerButton === "Register" && agree) {
			setRegisterButton(loadingButton)
			!Rname.length ? setRNameClass(" forced") : setRNameClass("")
			!Remail.length ? setREmailClass(" forced") : setREmailClass("")
			!email_test.test(Remail)
				? setREmailClass(" forced")
				: setREmailClass("")
			!Rpassword.length
				? setRPasswordClass(" forced")
				: setRPasswordClass("")
			!Rname.length ? (
				RnameRef.current.focus()
			) : !Remail.length ? (
				RemailRef.current.focus()
			) : !email_test.test(Remail) ? (
				RemailRef.current.focus()
			) : !Rpassword.length ? (
				RpasswordRef.current.focus()
			) : (
				<></>
			)
			if (Rname.length && Remail.length && Rpassword.length) {
				api()
					.post("/register", {
						name: Rname,
						email: Remail,
						password: Rpassword,
					})
					.then((response) => {
						const data = response.data
						if (data.message === "success") {
							toggleSignForm()
							setIsLogin(true)
							setUsername(data.user.name)
							setUserData(data.user)
							RnameRef.current.value = ""
							RemailRef.current.value = ""
							RpasswordRef.current.value = ""
							Toast.fire({
								icon: "success",
								title: "Successfully saved and logged in!",
							})
						} else {
							setUserData(null)
						}
					})
					.catch((error) => {
						setUserData(null)
						if (error.response && error.response.status === 419) {
							window.location.reload()
						}
						if (error.response && error.response.status === 422) {
							Toast.fire({
								icon: "warning",
								title: "Username or Email already exist!",
							})
						} else {
							Toast.fire({
								icon: "warning",
								title: "Something went wrong!",
							})
						}
					})
					.finally(() => {
						setRegisterButton("Register")
					})
			} else {
				setRegisterButton("Register")
			}
		} else if (!agree) {
			Toast.fire({
				icon: "info",
				title: "You must agree with Terms of Service and Privacy Policy!",
			})
		}
	}
	const forgot = (e) => {
		e.preventDefault()
		if (checkButton === "Check") {
			setCheckButton(loadingButton)
			!Femail.length ? setFemailClass(" forced") : setFemailClass("")
			!Femail.length ? FemailRef.current.focus() : <></>
			if (Femail.length) {
				api()
					.post("/forgot", { email: Femail })
					.then((response) => {
						const data = response.data
						if (data.message === "success") {
							toggleSignForm()
							FemailRef.current.value = ""
							Toast.fire({
								icon: "info",
								title: "An email has been sent with a link to reset your account!",
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
										Swal.getHtmlContainer().querySelector(
											"b"
										)
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
							setUserData(null)
							Toast.fire({
								icon: "warning",
								title: "Something went wrong!",
							})
						}
					})
					.catch((error) => {
						setUserData(null)
						if (error.response && error.response.status === 419) {
							window.location.reload()
						}
						if (error.response && error.response.status === 401) {
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
								title: "Username or Email already exist!",
							})
						} else {
							Toast.fire({
								icon: "warning",
								title: "Something went wrong!",
							})
						}
					})
					.finally(() => {
						setCheckButton("Check")
					})
			} else {
				setCheckButton("Check")
			}
		}
	}
	return (
		<div
			className="nk-sign-form accordion-custom"
			style={{ backgroundImage: `url(${bgImg})` }}
		>
			<div className="nk-gap-5" />
			<div className="container">
				<div className="row">
					<div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
						<div className="nk-sign-form-container">
							<div className="nk-sign-form-toggle h3">
								<a
									href="javascript:void(none)"
									className="nk-sign-form-login-toggle active"
								>
									Sign in
								</a>
								<a
									href="javascript:void(none)"
									className="nk-sign-form-register-toggle"
								>
									Sign up
								</a>
							</div>
							<div className="nk-gap-2" />
							<form
								className="nk-sign-form-login active"
								onSubmit={(e) => signIn(e)}
							>
								<input
									ref={LemailRef}
									className={"form-control" + LemailClass}
									type="text"
									placeholder="Username or Email"
									onChange={(e) => setLEmail(e.target.value)}
								/>
								<div className="nk-gap-2" />
								<input
									ref={LpasswordRef}
									className={"form-control" + LpasswordClass}
									type="password"
									placeholder="Password"
									onChange={(e) =>
										setLPassword(e.target.value)
									}
								/>
								<div className="nk-gap-2" />
								<div className="form-check float-left">
									<a
										className="nk-sign-form-register-toggle text-light custom-link"
										href="/forgot"
									>
										Don't have an account yet?
									</a>
									<div className="form-check"></div>
									<a
										className="nk-sign-form-lost-toggle text-light custom-link"
										href="/forgot"
									>
										Need help?
									</a>
								</div>
								<button className="nk-btn nk-btn-color-white nk-btn-bg-main-custom link-effect-1 float-right">
									{loginButton}
								</button>
							</form>
							<form
								className="nk-sign-form-lost"
								onSubmit={(e) => forgot(e)}
							>
								<input
									ref={FemailRef}
									className={"form-control" + FemailClass}
									type="text"
									placeholder="Username or Email"
									onChange={(e) => setFEmail(e.target.value)}
								/>
								<div className="nk-gap-2" />
								<div className="form-check float-left">
									<a
										className="nk-sign-form-login-toggle text-light custom-link"
										href="/forgot"
									>
										Already have an account?
									</a>
									<div className="form-check"></div>
									<a
										className="nk-sign-form-register-toggle text-light custom-link"
										href="/forgot"
									>
										Don't have an account yet?
									</a>
								</div>
								<button className="nk-btn nk-btn-color-white nk-btn-bg-main-custom link-effect-1 float-right">
									{checkButton}
								</button>
							</form>
							<form
								className="nk-sign-form-register"
								onSubmit={(e) => signUp(e)}
							>
								<input
									ref={RnameRef}
									className={"form-control" + RnameClass}
									type="text"
									placeholder="Username"
									onChange={(e) => setRName(e.target.value)}
								/>
								<div className="nk-gap-2" />
								<input
									ref={RemailRef}
									className={"form-control" + RemailClass}
									type="email"
									placeholder="Email"
									onChange={(e) => setREmail(e.target.value)}
								/>
								<div className="nk-gap-2" />
								<input
									ref={RpasswordRef}
									className={"form-control" + RpasswordClass}
									type="password"
									placeholder="Password"
									onChange={(e) =>
										setRPassword(e.target.value)
									}
								/>
								<div className="nk-gap-2" />
								<div className="form-check float-left">
									<label className="form-check-label">
										<input
											type="checkbox"
											className="form-check-input"
											onChange={(e) =>
												e.target.checked
													? setAgree(true)
													: setAgree(false)
											}
										/>
										I agree to the&nbsp;
										<Link
											to="/Terms-of-Service"
											onClick={() => {
												toggleSignForm()
											}}
										>
											Terms &#38; Conditions
										</Link>
									</label>
									<div className="form-check"></div>
									<a
										className="nk-sign-form-login-toggle text-light custom-link"
										href="/forgot"
									>
										Already have an account?
									</a>
									<div className="form-check"></div>
									<a
										className="nk-sign-form-lost-toggle text-light custom-link"
										href="/forgot"
									>
										Need help?
									</a>
								</div>
								<button className="nk-btn nk-btn-color-white nk-btn-bg-main-custom link-effect-1 float-right">
									{registerButton}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="nk-gap-5" />
		</div>
	)
}

export default SignForm

import React, { useState, useEffect } from "react"
import { useContexts } from "../../../Contexts"
import Loader from "react-loader-spinner"
import { useParams, useHistory } from "react-router-dom"

const Verifier = () => {
	const history = useHistory()
	const { Toast, isLogin, userData, api, setUserData } = useContexts()
	const { code } = useParams()
	const [apiSent, setApiSent] = useState(false)
	useEffect(() => {
		if (isLogin && userData && userData.email_verified_at !== null) {
			history.push("/user")
		}
		if (
			isLogin &&
			userData &&
			userData.email_verified_at === null &&
			!apiSent
		) {
			api()
				.post("/verifyEmail/" + code)
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setApiSent(true)
						setUserData(data.user)
						Toast.fire({
							icon: "success",
							title: "Your account activated successfully!",
						})
						history.push("/user")
					} else if (data.message === "expired") {
						Toast.fire({
							icon: "error",
							title: "Link has expired!",
						})
						history.push("/user/expired")
					} else {
						Toast.fire({
							icon: "warning",
							title: "Something went wrong please try again later!",
						})
						history.push("/user/error")
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
					history.push("/user/error")
				})
				.finally(() => {
					setApiSent(true)
				})
		}
	}, [isLogin, userData, apiSent])
	return (
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
	)
}

export default Verifier

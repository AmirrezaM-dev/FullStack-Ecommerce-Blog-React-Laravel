import React, { useEffect } from "react"
import { useContexts } from "../../../Contexts"
import Loader from "react-loader-spinner"
import { Switch, Route, useHistory } from "react-router-dom"

const Dashboard = () => {
	const history = useHistory()
	const { isLogin, userData } = useContexts()
	useEffect(() => {
		if (isLogin && userData && userData.email_verified_at === null) {
			history.push("/user/verify")
		}
	}, [isLogin, userData])
	return (
		<div className="col-lg-9">
			<div className="nk-gap-2 d-none d-lg-block" />
			<div className="nk-social-menu-inline">
				<ul>
					<li className="active">
						<a href="social-user-settings.html">General</a>
					</li>
					<li>
						<a href="social-user-settings-email.html">Email</a>
					</li>
					<li>
						<a href="#">Profile Visibility</a>
					</li>
				</ul>
			</div>
			<div className="nk-social-container accordion-custom">
				{/* START: Settings */}
				<form action="#">
					<input
						type="email"
						className="form-control"
						name="email"
						placeholder="Account Email"
						defaultValue="mymail@gmail.com"
					/>
					<div className="nk-gap-2" />
					<input
						type="password"
						className="form-control"
						name="password"
						placeholder="Change Password"
					/>
					<div className="nk-gap-2" />
					<input
						type="password"
						className="form-control"
						name="password2"
						placeholder="New Password"
					/>
					<div className="mt-10">
						<em>Repeat New Password</em>
					</div>
					<div className="nk-gap-2" />
					<button className="nk-btn link-effect-4 nk-btn-bg-main-custom float-right">
						Save Changes
					</button>
				</form>
				{/* END: Settings */}
			</div>
			<div className="nk-gap-4" />
		</div>
	)
}

export default Dashboard

import React, { useEffect } from "react"
import { useContexts } from "../../../Contexts"
import Loader from "react-loader-spinner"
import ProfileSetting from "./ProfileSetting"
import PasswordSetting from "./PasswordSetting"
import { Switch, Route, useHistory, Link, useLocation } from "react-router-dom"

const Setting = () => {
	const history = useHistory()
	const location = useLocation()
	const { isLogin, userData } = useContexts()
	useEffect(() => {
		if (isLogin && userData && userData.email_verified_at === null) {
			history.push("/user/verify")
		}
	}, [isLogin, userData])
	return (
		<div className="col-lg-9">
			<div className="nk-gap-2 d-none d-lg-block" />
			{userData.type === 1 ? (
				<div className="nk-social-menu-inline">
					<ul>
						<li
							className={
								location.pathname.toLowerCase() ===
									"/user/setting" ||
								location.pathname.toLowerCase() ===
									"/user/setting/"
									? "active"
									: ""
							}
						>
							<Link to="/user/setting">Profile</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("password") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/setting/password">Password</Link>
						</li>
					</ul>
				</div>
			) : (
				<></>
			)}
			{userData.type === 1 ? (
				<Switch>
					<Route
						path={["/user/setting", "/user/setting/profile"]}
						exact
						component={ProfileSetting}
					/>
					<Route
						path={["/user/setting/password"]}
						exact
						component={PasswordSetting}
					/>
				</Switch>
			) : (
				<PasswordSetting />
			)}
			<div className="nk-gap-4" />
		</div>
	)
}

export default Setting

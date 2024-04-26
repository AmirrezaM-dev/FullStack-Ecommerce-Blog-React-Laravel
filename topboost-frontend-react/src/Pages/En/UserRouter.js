import React, { useEffect } from "react"
import { useContexts } from "../../Contexts"
import { Switch, Route, useHistory } from "react-router-dom"
import Router from "./User/Router"
import Verify from "./User/Verify"
import Verifier from "./User/Verifier"
import Reset from "./User/Reset"
import Error from "../../Pages/En/Error"

const UserRouter = () => {
	const history = useHistory()
	const { isLogin, userData } = useContexts()
	useEffect(() => {
		if (isLogin && userData && userData.email_verified_at === null) {
			history.push("/user/verify")
		}
	}, [isLogin, userData])
	return (
		<Switch>
			<Route path={["/user/verify"]} exact component={Verify} />
			<Route path={["/user/reset/:code"]} exact component={Reset} />
			<Route
				path={["/user/verifyEmail/:code"]}
				exact
				component={Verifier}
			/>
			<Route
				path={["/user/password"]}
				exact
				render={() => {
					return (
						<>
							<div className="nk-gap-4" />
							<div className="container">
								<div className="nk-info-box bg-main-4 text-center">
									<div className="nk-gap" />
									Your new password sent to your email address
									successfully!
									<div className="nk-gap" />
								</div>
							</div>
							<div className="nk-gap-4" />
						</>
					)
				}}
			/>
			<Route
				path={["/user/expired"]}
				exact
				render={() => {
					return (
						<>
							<div className="nk-gap-4" />
							<div className="container">
								<div className="nk-info-box bg-main-4 text-center">
									<div className="nk-gap" />
									Link has expired!
									<div className="nk-gap" />
								</div>
							</div>
							<div className="nk-gap-4" />
						</>
					)
				}}
			/>
			<Route
				path={["/user/error"]}
				exact
				render={() => {
					return (
						<>
							<div className="nk-gap-4" />
							<div className="container">
								<div className="nk-info-box bg-main-4 text-center">
									<div className="nk-gap" />
									Something went wrong!
									<div className="nk-gap" />
								</div>
							</div>
							<div className="nk-gap-4" />
						</>
					)
				}}
			/>
			<Route
				path={["/user", "/user/*", "/user/*/*", "/user/*/*/*"]}
				exact
				component={Router}
			/>
			<Route path="*" component={Error} />
		</Switch>
	)
}

export default UserRouter

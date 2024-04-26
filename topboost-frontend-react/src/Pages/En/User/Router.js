import React, { useState, useCallback, useEffect } from "react"
import { useContexts } from "../../../Contexts"
import { Switch, Route } from "react-router-dom"
import Loading from "./Loading"
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import Setting from "./Setting"
import NotLogin from "./NotLogin"
import getCroppedImg from "../../../Components/ImageCrop/cropImage"

const Router = () => {
	const { isLogin, userData } = useContexts()
	const dogImg =
		"https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
	const [rotation, setRotation] = useState(0)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState({
		width: 133,
		height: 1000,
		x: 558,
		y: 0,
	})
	const test = async () => {
		const croppedImage = await getCroppedImg(
			dogImg,
			croppedAreaPixels,
			rotation
		)
		console.log(croppedImage)
	}
	test()
	return (
		<>
			{isLogin === undefined || userData === undefined ? (
				<Loading />
			) : isLogin && userData ? (
				<>
					<div className="nk-header-title nk-header-title-sm nk-header-title-parallax nk-header-title-parallax-opacity">
						<div className="bg-image op-5">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/images/user-header.jpg"
								}
								alt=""
								className="jarallax-img"
							/>
						</div>
						<div className="nk-header-table">
							<div className="nk-header-table-cell">
								<div className="container"></div>
							</div>
						</div>
					</div>
					{/* END: Header Title */}
					<div className="container">
						<div className="nk-social-profile nk-social-profile-container-offset">
							<div className="row">
								<div className="col-md-5 col-lg-3">
									<div className="nk-social-profile-avatar">
										<a href="#">
											<img
												src="assets/images/avatar-1.jpg"
												alt="Akse Madare Mamad"
											/>
										</a>
									</div>
								</div>
								<div className="col-md-7 col-lg-9">
									<div className="nk-social-profile-info">
										<div className="nk-gap-2" />
										<div className="nk-social-profile-info-last-seen">
											<strong>Balance : 100&euro;</strong>
										</div>
										<h1 className="nk-social-profile-info-name">
											Madare Mamad
										</h1>
										{/* <div className="nk-social-profile-info-actions">
											<a
												href="#"
												className="nk-btn link-effect-4"
											>
												Add Friend
											</a>
											<a
												href="#"
												className="nk-btn link-effect-4"
											>
												Leave Message
											</a>
										</div> */}
									</div>
								</div>
							</div>
						</div>

						<div className="row vertical-gap">
							<Nav />
							<Switch>
								<Route
									path={["/user"]}
									exact
									component={Dashboard}
								/>
								<Route
									path={[
										"/user/setting",
										"/user/setting/*",
										"/user/setting/*/*",
									]}
									exact
									component={Setting}
								/>
							</Switch>
						</div>
						<div className="nk-gap-4" />
						<div className="nk-gap-3" />
					</div>
				</>
			) : (
				<NotLogin />
			)}
		</>
	)
}

export default Router

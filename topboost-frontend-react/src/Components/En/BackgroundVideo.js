import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
const BackgroundVideo = () => {
	const location = useLocation()

	const [bgUrl, setBgUrl] = useState(
		process.env.PUBLIC_URL + "/assets/images/home-bg.jpg"
	)
	useEffect(() => {
		if (
			location.pathname === "/" &&
			bgUrl !== process.env.PUBLIC_URL + "/assets/images/home-bg.jpg"
		) {
			setBgUrl(process.env.PUBLIC_URL + "/assets/images/home-bg.jpg")
		}
		if (
			(location.pathname.indexOf("/Contact-Us") !== -1 ||
				location.pathname.indexOf("/Contact") !== -1) &&
			bgUrl !== process.env.PUBLIC_URL + "/assets/images/contact-bg.png"
		) {
			setBgUrl(process.env.PUBLIC_URL + "/assets/images/contact-bg.png")
		}
		if (
			location.pathname.indexOf("/FAQ") !== -1 &&
			bgUrl !== process.env.PUBLIC_URL + "/assets/images/faq-bg.png"
		) {
			setBgUrl(process.env.PUBLIC_URL + "/assets/images/faq-bg.png")
		}
		if (
			location.pathname.indexOf("/Work-With-Us") !== -1 &&
			bgUrl !==
				process.env.PUBLIC_URL + "/assets/images/WorkWithUs-bg.jpg"
		) {
			setBgUrl(
				process.env.PUBLIC_URL + "/assets/images/WorkWithUs-bg.jpg"
			)
		}
		if (
			location.pathname.indexOf("/Privacy-Policy") !== -1 &&
			bgUrl !==
				process.env.PUBLIC_URL + "/assets/images/PrivacyPolicy-bg.jpg"
		) {
			setBgUrl(
				process.env.PUBLIC_URL + "/assets/images/PrivacyPolicy-bg.jpg"
			)
		}
		if (
			location.pathname.indexOf("/Terms-of-Service") !== -1 &&
			bgUrl !==
				process.env.PUBLIC_URL + "/assets/images/TermsOfService-bg.jpg"
		) {
			setBgUrl(
				process.env.PUBLIC_URL + "/assets/images/TermsOfService-bg.jpg"
			)
		}
		if (
			location.pathname.indexOf("/lol-boost") !== -1 &&
			bgUrl !==
				process.env.PUBLIC_URL + "/assets/images/LeagueOfLegends-bg.jpg"
		) {
			setBgUrl(
				process.env.PUBLIC_URL + "/assets/images/LeagueOfLegends-bg.jpg"
			)
		}
		if (
			location.pathname.indexOf("/tft-boost") !== -1 &&
			bgUrl !==
				process.env.PUBLIC_URL +
					"/assets/images/TeamfightTactics-bg.jpg"
		) {
			setBgUrl(
				process.env.PUBLIC_URL +
					"/assets/images/TeamfightTactics-bg.jpg"
			)
		}
		if (
			location.pathname.indexOf("/valorant-boost") !== -1 &&
			bgUrl !== process.env.PUBLIC_URL + "/assets/images/valorant-bg.jpg"
		) {
			setBgUrl(process.env.PUBLIC_URL + "/assets/images/valorant-bg.jpg")
		}
		if (
			location.pathname.indexOf("/checkout") !== -1 &&
			bgUrl !== process.env.PUBLIC_URL + "/assets/images/checkout-bg.jpg"
		) {
			setBgUrl(process.env.PUBLIC_URL + "/assets/images/checkout-bg.jpg")
		}
		if (
			location.pathname.indexOf("/user") !== -1 &&
			bgUrl !== process.env.PUBLIC_URL + "/assets/images/user-bg.jpg"
		) {
			setBgUrl(process.env.PUBLIC_URL + "/assets/images/user-bg.jpg")
		}
	}, [location.pathname, bgUrl])
	// data-video="https://youtu.be/UkeDo1LhUqQ"
	return (
		<div
			className="nk-page-background op-5"
			data-video-loop="true"
			data-video-mute="true"
			data-video-volume={0}
			data-video-start-time={0}
			data-video-end-time={0}
			data-video-pause-on-page-leave="true"
			style={{ backgroundImage: `url("${bgUrl}")` }}
		></div>
	)
}

export default BackgroundVideo

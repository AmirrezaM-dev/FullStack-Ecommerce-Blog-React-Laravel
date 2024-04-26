import React, { useEffect } from "react"
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import EnRouter from "./En/EnRouter"

const Router = () => {
	const location = useLocation()
	useEffect(() => {
		switch (true) {
			case location.pathname.toString().toLowerCase() === "" ||
				location.pathname.toString().toLowerCase() === "/":
				document.title =
					"TopBoost.Net – Professional In LOL Boosting – Elo Boost"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("lol-boost") !== -1:
				document.title =
					"LOL Boost – Professional In LOL Boosting – Elo Boost"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("tft-boost") !== -1:
				document.title =
					"TFT Boost – Professional In LOL Boosting – Elo Boost"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("valorant-boost") !== -1:
				document.title =
					"Valorant Boost – Professional In LOL Boosting – Elo Boost"
				break
			case location.pathname.toString().toLowerCase().indexOf("faq") !==
				-1:
				document.title = "FAQ | TopBoost"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("contact") !== -1:
				document.title = "Contact US | TopBoost"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("work-with-us") !== -1:
				document.title = "Work-With-Us"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("privacy-policy") !== -1:
				document.title = "Privacy Policy | TopBoost"
				break
			case location.pathname
				.toString()
				.toLowerCase()
				.indexOf("terms-of-service") !== -1:
				document.title = "Term of Service | TopBoost"
				break
			default:
				document.title =
					"TopBoost.Net – Professional In LOL Boosting – Elo Boost"
				break
		}
	}, [location.pathname])
	return (
		<Switch>
			<Route
				path="/en"
				render={() => (
					<Redirect
						to={location.pathname
							.replace("/en", "")
							.replace("/EN", "")
							.replace("/En", "")
							.replace("/eN", "")}
					/>
				)}
			/>
			<Route path="/" component={EnRouter} />
		</Switch>
	)
}

export default Router

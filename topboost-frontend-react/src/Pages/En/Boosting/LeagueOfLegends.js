import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Solo from "./LeagueOfLegends/Solo"
import Duo from "./LeagueOfLegends/Duo"
import Win from "./LeagueOfLegends/Win"
import PlacementMatches from "./LeagueOfLegends/PlacementMatches"
import Coaching from "./LeagueOfLegends/Coaching"
import Clash from "./LeagueOfLegends/Clash"
import NormalMatches from "./LeagueOfLegends/NormalMatches"
import ChampionMastery from "./LeagueOfLegends/ChampionMastery"
import Leveling from "./LeagueOfLegends/Leveling"
import { useContexts } from "../../../Contexts"
import Loader from "react-loader-spinner"

const LeagueOfLegends = () => {
	const { api, LeagueOfLegendsApi, setLeagueOfLegendsApi } = useContexts()
	let { service_name } = useParams()
	const [breadcrumbs, setBreadcrumbs] = useState("")
	const [isOpen, setIsOpen] = useState(true)
	const [isScroll, setIsScroll] = useState(false)
	useEffect(() => {
		switch (service_name) {
			case "solo":
				setBreadcrumbs("Solo Boosting")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-solo-heading")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "duo":
				setBreadcrumbs("Duo Boosting")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-duo-heading")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "win":
				setBreadcrumbs("Win Boosting")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-win-heading")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "placement-matches":
				setBreadcrumbs("Placement Matches")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById(
								"accordion-1-placement-matches-heading"
							)
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "coaching":
				setBreadcrumbs("Coaching")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-coaching-heading")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "clash":
				setBreadcrumbs("Clash")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-clash-heading")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "normal-matches":
				setBreadcrumbs("Normal Matches")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById(
								"accordion-1-normal-matches-heading"
							)
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "champion-mastery":
				setBreadcrumbs("Champion Mastery")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById(
								"accordion-1-champion-mastery-heading"
							)
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			case "leveling":
				setBreadcrumbs("Leveling")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-leveling-heading")
							.scrollIntoView({
								behavior: "smooth",
								block: "start",
								inline: "start",
							})
					}, 300)
				}
				break
			default:
				// eslint-disable-next-line react-hooks/exhaustive-deps
				service_name = undefined
				setBreadcrumbs("")
				break
		}
		if (service_name && service_name.length > 0) {
			document
				.getElementsByClassName(service_name + "_collapser")[0]
				.click()
			setIsOpen(service_name)
		} else {
			document.getElementsByClassName("uncollapser")[0].click()
			window.scrollTo(0, 0)
			setIsOpen(false)
		}
	}, [service_name, isScroll])
	useEffect(() => {
		if (!LeagueOfLegendsApi) {
			api()
				.post("/LeagueOfLegends/firstData")
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setLeagueOfLegendsApi(data)
						setIsScroll(true)
					}
				})
		} else {
			setIsScroll(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<label className="uncollapser hide" />
			<label className="solo_collapser hide" />
			<label className="duo_collapser hide" />
			<label className="win_collapser hide" />
			<label className="placement-matches_collapser hide" />
			<label className="coaching_collapser hide" />
			<label className="clash_collapser hide" />
			<label className="normal-matches_collapser hide" />
			<label className="champion-mastery_collapser hide" />
			<label className="leveling_collapser hide" />
			<div className="nk-header-title nk-header-title-sm nk-header-title-parallax nk-header-title-parallax-opacity">
				<div className="bg-image">
					<img
						src={
							process.env.PUBLIC_URL +
							"/assets/images/LeagueOfLegends-header.png"
						}
						alt=""
						className="jarallax-img"
					/>
				</div>
				<div className="nk-header-table">
					<div className="nk-header-table-cell">
						<div className="container">
							<h1 className="nk-title">League Of Legends</h1>
							<h2 className="nk-sub-title">Boosting</h2>
						</div>
					</div>
				</div>
				<div className="nk-header-text-bottom">
					<div className="nk-breadcrumbs text-center">
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/lol-boost">League Of Legends</Link>
							</li>
							{service_name ? (
								<li>
									<span>{breadcrumbs}</span>
								</li>
							) : (
								""
							)}
						</ul>
					</div>
				</div>
			</div>
			<div className="nk-gap" />
			<div className="container">
				<div className="discounter d-flex justify-content-center align-items-center container">
					<div className="d-flex card text-center">
						<div className="image">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/images/lol-dis-left.jpg"
								}
								width={150}
							/>
						</div>
						<div className="image2">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/images/lol-dis-right.jpg"
								}
								width={150}
							/>
						</div>
						<h1>-20% discount</h1>
						<span className="d-block" style={{ fontSize: "20px" }}>
							Spend 50 EUR and get one hour free coach
						</span>
						<span className="d-block" style={{ fontSize: "20px" }}>
							Spend 70 EUR and get a free account
						</span>
						<div className="mt-4">
							<small style={{ fontSize: "18px" }}>
								Use code: TB20
							</small>
						</div>
					</div>
				</div>
				<div className="nk-gap" />
				<div className="row vertical-gap">
					<div className="col-12">
						<div
							className="nk-accordion accordion-custom"
							id="accordion-1"
							role="tablist"
							aria-multiselectable="false"
						>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-solo-heading"
								>
									<Link
										className={
											(service_name === "solo" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "solo"
													? "solo"
													: false
											)
										}}
										to={"/lol-boost/solo"}
										aria-expanded={
											service_name === "solo" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-solo"
									>
										Solo Boosting&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/league.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-solo"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-solo-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<Solo />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-duo-heading"
								>
									<Link
										className={
											(service_name === "duo" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "duo" ? "duo" : false
											)
										}}
										to={"/lol-boost/duo"}
										aria-expanded={
											service_name === "duo" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-duo"
									>
										Duo Boosting&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/duo.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-duo"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-duo-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<Duo />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-win-heading"
								>
									<Link
										className={
											(service_name === "win" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "win" ? "win" : false
											)
										}}
										to={"/lol-boost/win"}
										aria-expanded={
											service_name === "win" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-win"
									>
										Win Boosting&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/win.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-win"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-win-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<Win />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-placement-matches-heading"
								>
									<Link
										className={
											(service_name ===
												"placement-matches" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "placement-matches"
													? "placement-matches"
													: false
											)
										}}
										to={"/lol-boost/placement-matches"}
										aria-expanded={
											service_name ===
												"placement-matches" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-placement-matches"
									>
										Placement Matches&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/placement-matches.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-placement-matches"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-placement-matches-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<PlacementMatches />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-coaching-heading"
								>
									<Link
										className={
											(service_name === "coaching" &&
											isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "coaching"
													? "coaching"
													: false
											)
										}}
										to={"/lol-boost/coaching"}
										aria-expanded={
											service_name === "coaching" &&
											isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-coaching"
									>
										Coaching&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/coaching.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-coaching"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-coaching-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<Coaching />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-clash-heading"
								>
									<Link
										className={
											(service_name === "clash" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "clash"
													? "clash"
													: false
											)
										}}
										to={"/lol-boost/clash"}
										aria-expanded={
											service_name === "clash" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-clash"
									>
										Clash&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/clash.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-clash"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-clash-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<Clash />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-normal-matches-heading"
								>
									<Link
										className={
											(service_name ===
												"normal-matches" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "normal-matches"
													? "normal-matches"
													: false
											)
										}}
										to={"/lol-boost/normal-matches"}
										aria-expanded={
											service_name === "normal-matches" &&
											isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-normal-matches"
									>
										Normal Matches&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/normal-matches.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-normal-matches"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-normal-matches-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<NormalMatches />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-champion-mastery-heading"
								>
									<Link
										className={
											(service_name ===
												"champion-mastery" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "champion-mastery"
													? "champion-mastery"
													: false
											)
										}}
										to={"/lol-boost/champion-mastery"}
										aria-expanded={
											service_name ===
												"champion-mastery" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-champion-mastery"
									>
										Champion Mastery&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/champion-mastery.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-champion-mastery"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-champion-mastery-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<ChampionMastery />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="panel panel-default">
								<div
									className="panel-heading"
									role="tab"
									id="accordion-1-leveling-heading"
								>
									<Link
										className={
											(service_name === "leveling" &&
											isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "leveling"
													? "leveling"
													: false
											)
										}}
										to={"/lol-boost/leveling"}
										aria-expanded={
											service_name === "leveling" &&
											isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-leveling"
									>
										Leveling&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/LeagueOfLegends/leveling.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-leveling"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-leveling-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{LeagueOfLegendsApi ? (
												<Leveling />
											) : (
												<Loader
													type="Circles"
													color="#FFF"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="nk-gap-4" />
			</div>
			<div className="nk-gap-4" />
		</>
	)
}

export default LeagueOfLegends

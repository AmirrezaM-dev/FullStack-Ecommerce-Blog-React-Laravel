import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useContexts } from "../../../Contexts"
import Loader from "react-loader-spinner"
import Rank from "./Valorant/Rank"
import Win from "./Valorant/Win"
import PlacementMatches from "./Valorant/PlacementMatches"
import UnratedMatches from "./Valorant/UnratedMatches"
import Coaching from "./Valorant/Coaching"
const Valorant = () => {
	const { api, ValorantApi, setValorantApi } = useContexts()
	let { service_name } = useParams()
	const [breadcrumbs, setBreadcrumbs] = useState("")
	const [isOpen, setIsOpen] = useState(true)
	const [isScroll, setIsScroll] = useState(false)
	useEffect(() => {
		switch (service_name) {
			case "rank":
				setBreadcrumbs("Rank Boosting")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById("accordion-1-rank-heading")
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
			case "unrated-matches":
				setBreadcrumbs("Ulacement Matches")
				if (isScroll) {
					setTimeout(() => {
						document
							.getElementById(
								"accordion-1-unrated-matches-heading"
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
		// }
	}, [service_name, isScroll])
	useEffect(() => {
		if (!ValorantApi) {
			api()
				.post("/Valorant/firstData")
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setValorantApi(data)
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
			<label className="rank_collapser hide" />
			<label className="duo_collapser hide" />
			<label className="win_collapser hide" />
			<label className="placement-matches_collapser hide" />
			<label className="coaching_collapser hide" />
			<label className="unrated-matches_collapser hide" />
			<div className="nk-header-title nk-header-title-sm nk-header-title-parallax nk-header-title-parallax-opacity">
				<div className="bg-image">
					<img
						src={
							process.env.PUBLIC_URL +
							"/assets/images/valorant-header.jpg"
						}
						alt=""
						className="jarallax-img"
					/>
				</div>
				<div className="nk-header-table">
					<div className="nk-header-table-cell">
						<div className="container">
							<h1 className="nk-title">Valorant</h1>
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
								<Link to="/valorant-boost">Valorant</Link>
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
			<div className="nk-gap-4" />
			<div className="container">
				<div className="discounter d-flex justify-content-center align-items-center container">
					<div className="d-flex card text-center">
						<div className="image">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/images/val-dis-left.jpg"
								}
								width={150}
							/>
						</div>
						<div className="image2">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/images/val-dis-right.png"
								}
								width={150}
							/>
						</div>
						<h1>-10% discount</h1>
						<span className="d-block" style={{ fontSize: "20px" }}>
							Spend 50 EUR and get one hour free coach
						</span>
						<div className="mt-4">
							<small style={{ fontSize: "18px" }}>
								Use code: valor10
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
									id="accordion-1-rank-heading"
								>
									<Link
										className={
											(service_name === "rank" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "rank"
													? "rank"
													: false
											)
										}}
										to={"/valorant-boost/rank"}
										aria-expanded={
											service_name === "rank" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-rank"
									>
										Rank Boosting&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/Valorant/v-rank.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-rank"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-rank-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{ValorantApi ? (
												<Rank />
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
										to={"/valorant-boost/placement-matches"}
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
												"/assets/images/Valorant/v-placement-matches.png"
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
											{ValorantApi ? (
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
										to={"/valorant-boost/win"}
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
												"/assets/images/Valorant/v-winboost.png"
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
											{ValorantApi ? (
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
									id="accordion-1-unrated-matches-heading"
								>
									<Link
										className={
											(service_name ===
												"unrated-matches" && isOpen
												? ""
												: "collapsed") + " collapser"
										}
										data-toggle="collapse"
										data-parent="#accordion-1"
										onClick={() => {
											setIsOpen(
												isOpen !== "unrated-matches"
													? "unrated-matches"
													: false
											)
										}}
										to={"/valorant-boost/unrated-matches"}
										aria-expanded={
											service_name ===
												"unrated-matches" && isOpen
												? "true"
												: "false"
										}
										aria-controls="accordion-1-unrated-matches"
									>
										Unrated Matches&nbsp;
										<img
											alt=""
											src={
												process.env.PUBLIC_URL +
												"/assets/images/Valorant/v-normal.png"
											}
											width="30px"
										></img>
									</Link>
								</div>
								<div
									id="accordion-1-unrated-matches"
									className="panel-collapse collapse"
									role="tabpanel"
									aria-labelledby="accordion-1-unrated-matches-heading"
								>
									<div className="col-md-12">
										<div className="nk-box-3 text-center">
											{ValorantApi ? (
												<UnratedMatches />
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
										to={"/valorant-boost/coaching"}
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
											{ValorantApi ? (
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
						</div>
					</div>
				</div>
				<div className="nk-gap-4" />
			</div>
			<div className="nk-gap-4" />
		</>
	)
}

export default Valorant

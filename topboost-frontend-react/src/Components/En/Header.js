/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTeamspeak } from "@fortawesome/free-brands-svg-icons"
import { useContexts } from "../../Contexts"
const Header = () => {
	const location = useLocation()
	const [isLoaded, setIsLoaded] = useState(false)
	const { isLogin, setMakeLogout, loginButton, logoutButton, username } =
		useContexts()
	useEffect(() => {
		if (isLoaded) {
			const signToggle = document.querySelector(".nk-sign-toggle.active")
			if (signToggle) {
				signToggle.click()
			}
		} else {
			setIsLoaded(true)
		}
	}, [location.pathname])
	return (
		<header className="nk-header nk-header-opaque">
			<div className="nk-contacts-top">
				<div className="container">
					<div className="nk-contacts-left">
						<div className="nk-navbar">
							<ul className="nk-nav">
								<li className="nk-drop-item">
									<Link to="/">Eng</Link>
									<ul className="dropdown">
										{/* <li><Link to="/">USA</Link></li>
										<li><Link to="/ru">Russia</Link></li>
										<li><Link to="/fr">France</Link></li>
										<li><Link to="/es">Spain</Link></li>
										<li><Link to="/de">Germany</Link></li> */}
										{/* <li>
											<Link to="">Comming Soon</Link>
										</li> */}
									</ul>
								</li>
								<li
									className={
										location.pathname
											.toLowerCase()
											.indexOf("privacy-policy") !== -1
											? "active"
											: "not-active"
									}
								>
									<Link to="/Privacy-Policy">Privacy</Link>
								</li>
								<li
									className={
										location.pathname
											.toLowerCase()
											.indexOf("contact-us") !== -1
											? "active"
											: "not-active"
									}
								>
									<Link to="/Contact-Us">Contact</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="nk-contacts-right">
						<div className="nk-navbar">
							<ul className="nk-nav">
								<li>
									<a
										rel="noreferrer"
										target="_blank"
										href="https://twitter.com/TopboostN"
									>
										<span className="ion-social-twitter" />
									</a>
								</li>
								<li>
									<a
										rel="noreferrer"
										target="_blank"
										href="https://www.instagram.com/topboost_n1/"
									>
										<span className="ion-social-instagram-outline" />
									</a>
								</li>
								<li>
									<a
										rel="noreferrer"
										target="_blank"
										href="ts3server://youts.ir/"
									>
										<FontAwesomeIcon icon={faTeamspeak} />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<nav
				className={
					"nk-navbar nk-navbar-top nk-navbar-transparent nk-navbar-sticky"
				}
			>
				<div className="container">
					<div className="nk-nav-table">
						<Link to="/" className="nk-nav-logo">
							<img
								src={
									process.env.PUBLIC_URL +
									"/assets/images/tb.png"
								}
								alt=""
								width={90}
							/>
						</Link>
						<ul
							className="nk-nav nk-nav-center d-none d-lg-block"
							data-nav-mobile="#nk-nav-mobile"
						>
							<li
								className={
									location.pathname === "/"
										? "active"
										: "not-active"
								}
							>
								<Link to="/">Home</Link>
							</li>
							<li
								className={
									"nk-drop-item" +
									(location.pathname.indexOf("boost") !== -1
										? " active"
										: " not-active")
								}
							>
								<Link
									to={location.pathname}
									className="cursor-pointer"
								>
									Boosting
								</Link>
								<ul className="dropdown">
									<li
										className={
											"nk-drop-item" +
											(location.pathname.indexOf(
												"lol-boost"
											) !== -1
												? " active"
												: "")
										}
									>
										<Link to="/lol-boost">
											League of legend
										</Link>
										<ul className="dropdown">
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/solo"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/solo">
													Solo
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/duo"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/duo">
													Duo
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/win"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/win">
													Win
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/placement-matches"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/placement-matches">
													Placement Matches
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/coaching"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/coaching">
													Coaching
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/clash"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/clash">
													Clash
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/normal-matches"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/normal-matches">
													Normal Matches
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/champion-mastery"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/champion-mastery">
													Champion Mastery
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"lol-boost/leveling"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/lol-boost/leveling">
													Leveling
												</Link>
											</li>
										</ul>
									</li>
									<li
										className={
											"nk-drop-item" +
											(location.pathname.indexOf(
												"tft-boost"
											) !== -1
												? " active"
												: "")
										}
									>
										<Link to="/tft-boost">
											Teamfight Tactics
										</Link>
										<ul className="dropdown">
											<li
												className={
													location.pathname.indexOf(
														"tft-boost/solo"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/tft-boost/solo">
													Solo
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"tft-boost/duo"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/tft-boost/duo">
													Duo
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"tft-boost/win"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/tft-boost/win">
													Win
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"tft-boost/placement-matches"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/tft-boost/placement-matches">
													Placement Matches
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"tft-boost/coaching"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/tft-boost/coaching">
													Coaching
												</Link>
											</li>
										</ul>
									</li>
									<li
										className={
											"nk-drop-item" +
											(location.pathname.indexOf(
												"valorant-boost"
											) !== -1
												? " active"
												: "")
										}
									>
										<Link to="/valorant-boost">
											Valorant
										</Link>
										<ul className="dropdown">
											<li
												className={
													location.pathname.indexOf(
														"valorant-boost/rank"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/valorant-boost/rank">
													Rank
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"valorant-boost/placement-matches"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/valorant-boost/placement-matches">
													Placement Matches
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"valorant-boost/win"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/valorant-boost/win">
													Win
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"valorant-boost/unrated-matches"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/valorant-boost/unrated-matches">
													Unrated Matches
												</Link>
											</li>
											<li
												className={
													location.pathname.indexOf(
														"valorant-boost/coaching"
													) !== -1
														? " active"
														: ""
												}
											>
												<Link to="/valorant-boost/coaching">
													Coaching
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li
								className={
									location.pathname
										.toLowerCase()
										.indexOf("faq") !== -1
										? "active"
										: "not-active"
								}
							>
								<Link to="/FAQ">FAQ</Link>
							</li>
							{/* <li
								className={
									location.pathname
										.toLowerCase()
										.indexOf("blog") !== -1
										? "active"
										: "not-active"
								}
							>
								<Link to="/Blog">Blog</Link>
							</li> */}
							<li
								className={
									location.pathname
										.toLowerCase()
										.indexOf("contact-us") !== -1
										? "active"
										: "not-active"
								}
							>
								<Link to="/Contact-Us">Contact Us</Link>
							</li>
							<li
								className={
									location.pathname
										.toLowerCase()
										.indexOf("work-with-us") !== -1
										? "active"
										: "not-active"
								}
							>
								<Link to="/Work-With-Us">Work With Us</Link>
							</li>
							{/* <li
								className={
									location.pathname
										.toLowerCase()
										.indexOf("store") !== -1
										? "active"
										: "not-active"
								}
							>
								<Link to="/Store">Store</Link>
							</li> */}
						</ul>
						<ul className="nk-nav nk-nav-right nk-nav-icons">
							<li className="single-icon d-lg-none">
								<a
									href="javascript:void(none)"
									className="no-link-effect"
									data-nav-toggle="#nk-nav-mobile"
								>
									<span className="nk-icon-burger">
										<span className="nk-t-1" />
										<span className="nk-t-2" />
										<span className="nk-t-3" />
									</span>
								</a>
							</li>
							{/* <li className="single-icon">
								<a href="javascript:void(none)" className="nk-search-toggle no-link-effect">
									<span className="nk-icon-search" />
								</a>
							</li> */}
							{/* <li className="single-icon">
								<a href="javascript:void(none)" className="nk-cart-toggle no-link-effect">
									<span className="nk-icon-toggle">
										<span className="nk-icon-toggle-front">
											<span className="ion-android-cart" />
											<span className="nk-badge">8</span>
										</span>
										<span className="nk-icon-toggle-back">
											<span className="nk-icon-close" />
										</span>
									</span>
								</a>
							</li> */}
							{/* {isLogin ? (
								<li
									className={
										location.pathname
											.toLowerCase()
											.indexOf("user") !== -1
											? "active"
											: "not-active"
									}
								>
									<Link to="/user">{username}</Link>
								</li>
							) : (
								<></>
							)}
							<li className="single-icon">
								{isLogin ? (
									<a
										href="javascript:void(none)"
										className="nk-signout-toggle no-link-effect"
										onClick={(e) => {
											e.preventDefault()
											setMakeLogout(true)
										}}
									>
										{logoutButton}
									</a>
								) : (
									<a
										href="javascript:void(none)"
										className="nk-sign-toggle no-link-effect"
										onClick={(e) => e.preventDefault()}
									>
										<span className="nk-icon-toggle">
											{loginButton}
										</span>
									</a>
								)}
							</li> */}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header

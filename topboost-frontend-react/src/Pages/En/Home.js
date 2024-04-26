import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faShieldAlt,
	faTicketAlt,
	faEyeSlash,
	faClock,
	faCalendarCheck,
	faCloudMoon,
	faTrophy,
	faComments,
	faFingerprint,
	faMoneyCheckAlt,
	faMailBulk,
	faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons"
const Home = () => {
	return (
		<>
			<div className="nk-header-title nk-header-title-lg nk-header-title-parallax nk-header-title-parallax-opacity">
				<div className="bg-image bg-image-1">
					<img
						src={
							process.env.PUBLIC_URL +
							"/assets/images/syndra_magiia_devushka_sfera_art_vzgliad_crop.png"
						}
						alt=""
						className="jarallax-img"
					/>
				</div>
				<div className="bg-image bg-image-2">
					<img
						src={
							process.env.PUBLIC_URL +
							"/assets/images/syndra_magiia_devushka_sfera_art_vzgliad_crop2.png"
						}
						alt=""
						className="jarallax-img"
					/>
				</div>
				<div className="nk-header-table">
					<div className="nk-header-table-cell pt-0">
						<div className="container custom-container">
							<div className="nk-header-text">
								<h1
									className="nk-title display-4"
									style={{
										textAlign: "center",
										textShadow: "2px 2px 5px #555",
										fontSize: "50px",
									}}
								>
									LEADING LOL ELO
									<br />
									BOOST PLATFORM
								</h1>
								<div className="nk-gap" />
								<h1
									className="nk-title"
									style={{
										color: "#5bc0de",
										textAlign: "center",
										textShadow: "2px 2px 5px #222",
										fontSize: "20px",
									}}
								>
									Safe and reliable LoL Boosting, Coaching
									&amp; Account Buying Services.
								</h1>
								<div className="nk-gap-2" />
								<Link
									style={{ fontSize: "20px" }}
									to="/lol-boost"
									className="nk-btn nk-btn-circle nk-btn-color-success link-effect-2 ml-3 mr-3"
								>
									<span>Buy LOL boost</span>
								</Link>
								<Link
									style={{ fontSize: "20px" }}
									to="/tft-boost"
									className="nk-btn nk-btn-circle nk-btn-color-success link-effect-2 ml-3 mr-3"
								>
									<span
										style={{ color: "#39a228 !important" }}
									>
										Buy TFT boost
									</span>
								</Link>
								<Link
									style={{ fontSize: "20px" }}
									to="/valorant-boost"
									className="nk-btn nk-btn-circle nk-btn-color-success link-effect-2 ml-3 mr-3"
								>
									<span
										style={{ color: "#1f4088 !important" }}
									>
										Buy Valorant boost
									</span>
								</Link>
								<div className="nk-gap-4" />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* END: Header Title */}
			{/* START: Features */}
			<div className="container">
				<div className="nk-gap-6" />
				<div className="nk-gap-2" />
				<div className="row vertical-gap lg-gap">
					<div className="col-md-3">
						<div className="row">
							<div className="col-12">
								<div className="nk-ibox">
									<div className="nk-ibox-icon nk-ibox-icon-circle mb-5">
										<FontAwesomeIcon
											icon={faShieldAlt}
											className="cicon-c4"
										/>
									</div>
									<div className="nk-ibox-cont">
										<h2 className="nk-ibox-title mb-15">
											VPN Protection
										</h2>
										&nbsp; We use VPN protection on every
										order as a standard. The VPN management
										system hides the IP of the booster,
										making the service undetectable.
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="nk-ibox">
									<div className="nk-ibox-icon nk-ibox-icon-circle mb-5">
										<FontAwesomeIcon
											icon={faTicketAlt}
											className="cicon-c4"
										/>
									</div>
									<div className="nk-ibox-cont">
										<h2 className="nk-ibox-title mb-15">
											Order Tracking
										</h2>
										&nbsp; in TopBoost after your payment is
										done, you will be added to our Discord
										server, a group will be created with you
										and the booster, and you can follow up
										every step and chat with the booster or
										see the livestream of your games.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<img
							src={
								process.env.PUBLIC_URL +
								"/assets/images/large-logo.png"
							}
							alt=""
							width="60%"
							className="ml-auto mr-auto d-block"
						/>
					</div>
					<div className="col-md-3">
						<div className="row">
							<div className="col-12">
								<div className="nk-ibox">
									<div className="nk-ibox-icon nk-ibox-icon-circle mb-5">
										<FontAwesomeIcon
											icon={faEyeSlash}
											className="cicon-c4"
										/>
									</div>
									<div className="nk-ibox-cont">
										<h2 className="nk-ibox-title mb-15">
											Privacy &amp; Appear Offline
										</h2>
										&nbsp; All services available on
										Topboost remain 100% private. To
										increase privacy, we offer an appear
										offline feature on LoL boost services.
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="nk-ibox">
									<div className="nk-ibox-icon nk-ibox-icon-circle mb-5">
										<FontAwesomeIcon
											icon={faClock}
											className="cicon-c4"
										/>
									</div>
									<div className="nk-ibox-cont">
										<h2 className="nk-ibox-title mb-15">
											Time Guarantee
										</h2>
										&nbsp; Topboost provides a finish in
										time guarantee on all ELO boost orders.
										An approximate finish timer is available
										on each solo order after logging in.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="nk-gap-6" />
				<div className="nk-gap-2" />
				<div className="row">
					<div className="col-1" />
					<div className="col-10 row vertical-gap">
						<div className="col-md-4 col-sm-6">
							{/* START: Counter 4 */}
							<div className="nk-ibox">
								<div className="nk-ibox-icon nk-ibox-icon-circle mb-10">
									<FontAwesomeIcon
										icon={faCalendarCheck}
										className="cicon-c1"
									/>
								</div>
								<div className="nk-ibox-cont">
									<h2 className="nk-ibox-title mb-10">
										4 Years Of Expertise
									</h2>
									&nbsp; Since season eight, we have been
									offering professional ELO Boost services and
									gathering experience to perfect our LoL
									Boost quality.
								</div>
							</div>
							{/* END: Counter 4 */}
						</div>
						<div className="col-md-4 col-sm-6">
							{/* START: Counter 4 */}
							<div className="nk-ibox">
								<div className="nk-ibox-icon nk-ibox-icon-circle mb-10">
									<FontAwesomeIcon
										icon={faCloudMoon}
										className="cicon-c2"
									/>
								</div>
								<div className="nk-ibox-cont">
									<h2 className="nk-ibox-title mb-10">
										24/7 Availability
									</h2>
									&nbsp; Our expert LoL boost team is always
									available. To provide a high-quality service
									globally, we employ the best boosters from
									all regions.
								</div>
							</div>
							{/* END: Counter 4 */}
						</div>
						<div className="col-md-4 col-sm-6">
							{/* START: Counter 4 */}
							<div className="nk-ibox">
								<div className="nk-ibox-icon nk-ibox-icon-circle mb-10">
									<FontAwesomeIcon
										icon={faTrophy}
										className="cicon-c3"
									/>
								</div>
								<div className="nk-ibox-cont">
									<h2 className="nk-ibox-title mb-10">
										Professional Boosters
									</h2>
									&nbsp; Our team includes the top challenger
									LoL boosters. We hand-select &amp; screen
									our employees, who provide professional
									performance &amp; attitude.
								</div>
							</div>
							{/* END: Counter 4 */}
						</div>
						<div className="col-md-4 col-sm-6">
							{/* START: Counter 4 */}
							<div className="nk-ibox">
								<div className="nk-ibox-icon nk-ibox-icon-circle mb-10">
									<FontAwesomeIcon
										icon={faComments}
										className="cicon-c3"
									/>
								</div>
								<div className="nk-ibox-cont">
									<h2 className="nk-ibox-title mb-10">
										Premium Support
									</h2>
									&nbsp; Topboost's help center includes 24/7
									live chat support and phone assistance,
									offering any help related to your ELO boost.
								</div>
							</div>
							{/* END: Counter 4 */}
						</div>
						<div className="col-md-4 col-sm-6">
							{/* START: Counter 4 */}
							<div className="nk-ibox">
								<div className="nk-ibox-icon nk-ibox-icon-circle mb-10">
									<FontAwesomeIcon
										icon={faFingerprint}
										className="cicon-c2"
									/>
								</div>
								<div className="nk-ibox-cont">
									<h2 className="nk-ibox-title mb-10">
										Secured Private Data
									</h2>
									&nbsp; We use VPN protection to maximize LoL
									boost safety and 256 bit SSL encryption to
									maximize client data security.
								</div>
							</div>
							{/* END: Counter 4 */}
						</div>
						<div className="col-md-4 col-sm-6">
							{/* START: Counter 4 */}
							<div className="nk-ibox">
								<div className="nk-ibox-icon nk-ibox-icon-circle mb-10">
									<FontAwesomeIcon
										icon={faMoneyCheckAlt}
										className="cicon-c1"
									/>
								</div>
								<div className="nk-ibox-cont">
									<h2 className="nk-ibox-title mb-10">
										Refund Policy
									</h2>
									&nbsp; Our refund policy gives more
									flexibility for clients. Buyers are eligible
									to receive full or partial refunds according
									to the progress of the ELO boost.
								</div>
							</div>
							{/* END: Counter 4 */}
						</div>
					</div>
					<div className="col-1" />
				</div>
				<div className="nk-gap-4" />
			</div>
			{/* END: Features */}
			{/* START: About */}
			<div className="nk-box">
				<div className="container text-center">
					<div className="nk-gap-6" />
					<div className="nk-gap-2" />
					<h2 className="nk-title h1">About TopBoost</h2>
					<div className="nk-gap-3" />
					<p className="lead">
						TopBoost provides coaching and boosting services for the
						most popular online games, including League of Legends,
						Valorant , Teamfight Tactics , World of Warcraft. With a
						certified team of over&nbsp;
						{/*?php print_r($numbers['pb']); ?*/} experienced
						Boosters, we provide the best boosting experience to
						online gaming community.
					</p>
					<p className="lead">
						<FontAwesomeIcon icon={faMailBulk} className="mr-5" />
						support@topboost.net&nbsp;&nbsp;&nbsp;
						<FontAwesomeIcon
							icon={faPhoneAlt}
							className="ml-5 mr-5"
						/>
						+1 210 591 8468
					</p>
					<div className="nk-gap-2" />
					{/* <div className="row no-gutters">
						<div className="col-md-4">
							<div className="nk-box-2 nk-box-line">
								<div className="nk-counter-3">
									<div className="nk-count">{53}</div>
									<h3 className="nk-counter-title h4">
										Pro Boosters
									</h3>
									<div className="nk-gap-1" />
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="nk-box-2 nk-box-line">
								<div className="nk-counter-3">
									<div className="nk-count">{830}</div>
									<h3 className="nk-counter-title h4">
										Successful Deals
									</h3>
									<div className="nk-gap-1" />
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="nk-box-2 nk-box-line">
								<div className="nk-counter-3">
									<div className="nk-count">{798}</div>
									<h3 className="nk-counter-title h4">
										Happy Clients
									</h3>
									<div className="nk-gap-1" />
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
			{/* END: About */}
			{/* START: Testimonials */}
			<div className="nk-gap-2" />
		</>
	)
}

export default Home

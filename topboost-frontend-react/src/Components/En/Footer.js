import React from "react"
import { Link } from "react-router-dom"
const Footer = () => {
	return (
		<footer className="nk-footer nk-footer-parallax nk-footer-parallax-opacity">
			{/* <img className="nk-footer-top-corner" src={process.env.PUBLIC_URL + "/assets/images/footer-corner.png"} alt="" /> */}
			<div className="container">
				<div className="nk-gap-2" />
				<div className="container">
					<div className="row text-center mb-30">
						<div className="col-12 col-md">
							<img
								className="mb-10"
								src={
									process.env.PUBLIC_URL +
									"/assets/images/large-logo.png"
								}
								alt=""
								width={50}
							/>
							<p className="d-block mb-3">
								&copy; 2021 TopBoost Group LTD. All rights
								reserved.
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6 col-md">
							<h5>Boosting</h5>
							<ul className="list-unstyled text-small">
								<li>
									<Link className="text-info" to="/lol-boost">
										League Of Legends
									</Link>
								</li>
								<li>
									<Link
										className="text-info"
										to="/valorant-boost"
									>
										Valorant
									</Link>
								</li>
								<li>
									<Link className="text-info" to="/tft-boost">
										Teamfight Tactics
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-6 col-md">
							<h5>Last Posts</h5>
							<ul className="list-unstyled text-small">
								<li>
									<Link className="text-info" to="#">
										Comming Soon
									</Link>
								</li>
								<li>
									<Link className="text-info" to="#">
										Comming Soon
									</Link>
								</li>
								<li>
									<Link className="text-info" to="#">
										Comming Soon
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-6 col-md">
							<h5>Links</h5>
							<ul className="list-unstyled text-small">
								<li>
									<Link className="text-info" to="/FAQ">
										FAQ
									</Link>
								</li>
								<li>
									<Link
										className="text-info"
										to="/Contact-Us"
									>
										Contact Us
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="nk-gap border-top pt-10" />
				<p>
					League of Legends, Valorant, Teamfight Tactics are
					registered trademarks of Riot Games, Inc. We are in no way
					affiliated with, associated with or endorsed by Riot Games,
					Inc.
					<br />
					By using this website you constitute acceptance Terms of
					Service and Privacy Policy. All copyrights, trade marks,
					service marks belong to the corresponding owners.
				</p>
				<div className="nk-footer-links text-center">
					<Link to="/Terms-of-Service" className="link-effect">
						Terms of Service
					</Link>
					<span>|</span>
					<Link to="/Privacy-Policy" className="link-effect">
						Privacy Policy
					</Link>
				</div>
				<div className="nk-gap-2" />
			</div>
		</footer>
	)
}

export default Footer

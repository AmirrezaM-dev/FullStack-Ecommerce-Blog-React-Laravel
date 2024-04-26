import React from "react"
import { Link } from "react-router-dom"
const Nav = () => {
	return (
		<nav
			className="nk-navbar nk-navbar-side nk-navbar-right-side nk-navbar-lg nk-navbar-align-center nk-navbar-overlay-content"
			id="nk-side"
		>
			<div className="nk-navbar-bg">
				<div className="bg-image">
					<img
						src={
							process.env.PUBLIC_URL +
							"/assets/images/bg-nav-side.jpg"
						}
						alt=""
						className="jarallax-img"
					/>
				</div>
			</div>
			<div className="nano">
				<div className="nano-content">
					<div className="nk-nav-table">
						<div className="nk-nav-row">
							<Link to="/" className="nk-nav-logo">
								<img
									src={
										process.env.PUBLIC_URL +
										"/assets/images/tb.png"
									}
									alt=""
									width={150}
								/>
							</Link>
						</div>
						<div className="nk-nav-row nk-nav-row-full nk-nav-row-center">
							<ul className="nk-nav">
								<li className=" ">
									<a href="page-contact.html"> Contact</a>
								</li>
								<li className=" ">
									<a href="page-coming-soon.html">
										&nbsp; Coming Soon
									</a>
								</li>
								<li className=" ">
									<a href="page-404.html"> 404</a>
								</li>
								<li className=" ">
									<a href="page-age-check.html"> Age Check</a>
								</li>
								<li className=" nk-drop-item">
									<a href="javascript:void(none)">
										Sub Menu Example
									</a>
									<ul className="dropdown">
										<li className=" ">
											<a href="#1"> Sub Item 1</a>
										</li>
										<li className=" nk-drop-item">
											<a href="#2"> Sub Item 2</a>
											<ul className="dropdown">
												<li className=" ">
													<a href="#1"> Sub Item 1</a>
												</li>
												<li className=" ">
													<a href="#2"> Sub Item 2</a>
												</li>
											</ul>
										</li>
										<li className=" nk-drop-item">
											<a href="#3"> Sub Item 3</a>
											<ul className="dropdown">
												<li className=" ">
													<a href="javascript:void(none)">
														Sub Item
													</a>
												</li>
											</ul>
										</li>
										<li className=" nk-drop-item">
											<a href="#4"> Sub Item 4</a>
											<ul className="dropdown">
												<li className=" ">
													<a href="javascript:void(none)">
														Sub Item
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div className="nk-nav-row">
							<div className="nk-nav-footer">
								&nbsp; © 2020 nK Group Inc. Developed in
								association with LoremInc. IpsumCompany,
								SitAmmetGroup, CumSit and related logos are
								registered trademarks. All Rights
								Reserved.&nbsp;
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Nav

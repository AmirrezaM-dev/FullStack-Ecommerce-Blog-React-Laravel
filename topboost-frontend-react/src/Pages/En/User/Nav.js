import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Nav = () => {
	const location = useLocation()
	return (
		<div className="col-lg-3">
			<aside className="nk-sidebar nk-sidebar-left nk-sidebar-sticky">
				<div className="nk-gap-2" />
				<div className="nk-social-menu d-none d-lg-block">
					<ul>
						<li
							className={
								location.pathname.toLowerCase() === "/user" ||
								location.pathname.toLowerCase() === "/user/"
									? "active"
									: ""
							}
						>
							<Link to="/user">Dashboard</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("orders") !== -1 &&
								location.pathname
									.toLowerCase()
									.indexOf("my/orders") === -1
									? "active"
									: ""
							}
						>
							<Link to="/user/orders">
								Available Orders
								<span className="nk-badge">10</span>
							</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("my/orders") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/my/orders">
								Current Orders
								<span className="nk-badge">1</span>
							</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("chat") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/chat">
								Messages
								<span className="nk-badge">192</span>
							</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("friends") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/friends">
								Friends
								<span className="nk-badge">19</span>
							</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("transactions") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/transactions">Transactions</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("market") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/market">Market</Link>
						</li>
						<li
							className={
								location.pathname
									.toLowerCase()
									.indexOf("setting") !== -1
									? "active"
									: ""
							}
						>
							<Link to="/user/setting">Settings</Link>
						</li>
					</ul>
				</div>
				<div
					className="nk-accordion d-lg-none"
					id="nk-social-menu-mobile"
					role="tablist"
					aria-multiselectable="true"
				>
					<div className="panel panel-default">
						<div
							className="panel-heading"
							role="tab"
							id="nk-social-menu-mobile-1-heading"
						>
							<a
								data-toggle="collapse"
								data-parent="#nk-social-menu-mobile"
								href="#nk-social-menu-mobile-1"
								aria-expanded="true"
								aria-controls="nk-social-menu-mobile-1"
								className="collapsed"
							>
								Menu
							</a>
						</div>
						<div
							id="nk-social-menu-mobile-1"
							className="panel-collapse collapse"
							role="tabpanel"
							aria-labelledby="nk-social-menu-mobile-1-heading"
						>
							<div className="nk-social-menu">
								<ul>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user">Dashboard</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/orders">
											Available Orders
											<span className="nk-badge">10</span>
										</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/my/orders">
											Current Orders
											<span className="nk-badge">1</span>
										</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/chat">
											Messages
											<span className="nk-badge">
												192
											</span>
										</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/friends">
											Friends
											<span className="nk-badge">19</span>
										</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/transactions">
											Transactions
										</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("asd") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/market">Market</Link>
									</li>
									<li
										className={
											location.pathname
												.toLowerCase()
												.indexOf("setting") !== -1
												? "active"
												: ""
										}
									>
										<Link to="/user/setting">Settings</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="nk-gap-4 d-none d-lg-block" />
			</aside>
			{/* END: Sidebar */}
		</div>
	)
}

export default Nav

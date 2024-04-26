import React from 'react'
import { Link } from 'react-router-dom'
const MobileNav = () => {
	return (
		<div id="nk-nav-mobile" className="nk-navbar nk-navbar-side nk-navbar-left-side nk-navbar-overlay-content d-lg-none">
			<div className="nano">
				<div className="nano-content">
					<Link to="/" className="nk-nav-logo">
						<img src={process.env.PUBLIC_URL + "/assets/images/tb.png"} alt="" width={90} />
					</Link>
					<div className="nk-navbar-mobile-content">
						<ul className="nk-nav">
							{/* Here will be inserted menu from [data-mobile-menu="#nk-nav-mobile"] */}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MobileNav

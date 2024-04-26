import React from "react"
import { Link } from "react-router-dom"
const Error = () => {
	return (
		<div className="nk-header-title nk-header-title-full nk-header-title-parallax nk-header-title-parallax-opacity">
			<div className="bg-image op-8">
				<img
					src={process.env.PUBLIC_URL + "/assets/images/404-bg.png"}
					alt=""
					className="jarallax-img"
				/>
			</div>
			<div className="nk-header-table">
				<div className="nk-header-table-cell">
					<div className="container">
						<div className="nk-header-text">
							<div className="nk-gap-4" />
							<div className="container">
								<div className="text-center">
									<h2 className="nk-title display-4">
										Page Not Found
									</h2>
									<div className="nk-gap-2" />
									<div className="row">
										<div className="col-md-8 offset-md-2">
											<p className="lead">
												The page you are looking for no
												longer exists. Perhaps you can
												return back to the site’s
												homepage and see if you can find
												what you are looking for.
											</p>
											<div className="nk-gap-2" />
											<Link
												to="/"
												className="nk-btn nk-btn-lg nk-btn-bg-main-2 link-effect-4"
											>
												Go to Homepage
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="nk-gap-4" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Error

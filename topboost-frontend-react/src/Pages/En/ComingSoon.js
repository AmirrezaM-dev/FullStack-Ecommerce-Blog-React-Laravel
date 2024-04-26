import React from 'react'

const ComingSoon = () => {
	return (
		<div className="nk-header-title nk-header-title-full nk-header-title-parallax nk-header-title-parallax-opacity">
			<div className="bg-image op-4">
				<img src={process.env.PUBLIC_URL + "/assets/images/soon-bg.jpg"} alt="" className="jarallax-img" />
			</div>
			<div className="nk-header-table">
				<div className="nk-header-table-cell">
					<div className="container">
						<div className="nk-header-text">
							<div className="nk-gap-4" />
							<div className="container">
								<div className="text-center">
									<h2 className="nk-title display-4">Topboost</h2>
									<div className="nk-title-sep-icon">
										<span className="icon"><span className="ion-clock" /></span>
									</div>
									<div className="nk-gap-2" />
									<div className="row">
										<div className="col-md-8 offset-md-2">
											<p className="lead">You don't get to be great without a victory...</p>
											<div className="nk-gap-2" />
											<div className="nk-countdown" data-end="2021-11-26 14:30" data-timezone="EST" />
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

export default ComingSoon

import React from "react"

const ProfileSetting = () => {
	return (
		<div className="nk-social-container accordion-custom">
			{/* START: Settings */}
			<form action="#">
				<div className="row vertical-gap">
					<div className="col-md-3 col-12 text-md-right text-center pt-40">
						<h6>Your avatar: </h6>
					</div>
					<div className="col-md-9 col-12">
						<input
							type="file"
							accept=".gif,.jpg,.jpeg,.png"
							className="form-control"
						/>
						<div className="mt-5">
							<em>maximum allowed size is 5 mb</em>
						</div>
					</div>
				</div>
				<div className="nk-gap-2" />
				<div className="row vertical-gap">
					<div className="col-md-3 col-12 text-md-right text-center pt-40">
						<h6>Your header image: </h6>
					</div>
					<div className="col-md-9 col-12">
						<input
							type="file"
							accept=".gif,.jpg,.jpeg,.png"
							className="form-control"
						/>
						<div className="mt-5">
							<em>maximum allowed size is 5 mb</em>
						</div>
					</div>
				</div>
				<div className="nk-gap-2" />
				<button className="nk-btn link-effect-4 nk-btn-bg-main-custom float-right">
					Save Changes
				</button>
			</form>
			{/* END: Settings */}
		</div>
	)
}

export default ProfileSetting

import React from "react"

const SideButtons = () => {
	return (
		<div className="nk-side-buttons nk-side-buttons-visible">
			<ul>
				{/* <li>
					<button className="nk-btn nk-btn-lg nk-btn-bg-main-4 nk-btn-bg-main-custom link-effect-4 cursor-pointer">
						Keep in Touch
					</button>
				</li> */}
				<li>
					<span className="nk-btn nk-btn-lg nk-btn-icon nk-bg-audio-toggle nk-btn-bg-main-3">
						<span className="icon">
							<span className="ion-android-volume-up nk-bg-audio-pause-icon" />
							<span className="ion-android-volume-off nk-bg-audio-play-icon" />
						</span>
					</span>
				</li>
				<li className="nk-scroll-top">
					<span className="nk-btn nk-btn-lg nk-btn-icon nk-btn-bg-primary nk-btn-bg-main-4">
						<span className="icon ion-ios-arrow-up" />
					</span>
				</li>
			</ul>
		</div>
	)
}

export default SideButtons

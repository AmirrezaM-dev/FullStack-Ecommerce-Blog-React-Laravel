import React from "react"
import Loader from "react-loader-spinner"

const Loading = () => {
	return (
		<>
			<div className="nk-gap-4" />
			<div className="container">
				<div className="nk-info-box bg-main-4 text-center">
					<div className="nk-gap" />
					<Loader
						className="ml-auto mr-auto"
						type="Oval"
						color="#FFF"
						height="50"
					/>
					<div className="nk-gap" />
				</div>
			</div>
			<div className="nk-gap-4" />
		</>
	)
}

export default Loading

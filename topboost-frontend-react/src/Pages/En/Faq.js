import React from "react"

const Faq = () => {
	return (
		<>
			{/* START: Header Title */}
			<div className="nk-box">
				<div className="container">
					<div className="nk-gap-5" />
					<h1 className="nk-title">FAQ</h1>
					<div className="nk-gap-4" />
				</div>
			</div>
			{/* END: Header Title */}
			<div className="nk-box bg-image-1 text-white">
				<div className="nk-gap-4" />
				<div className="container">
					<div className="row">
						<div className="col-md-8 offset-md-2">
							{/* START: Accordion 3 */}
							<div
								className="nk-accordion"
								id="accordion-3"
								role="tablist"
								aria-multiselectable="true"
							>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-1-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-1"
											aria-expanded="true"
											aria-controls="accordion-3-1"
										>
											{" "}
											Can you do something that not on the
											list?{" "}
										</a>
									</div>
									<div
										id="accordion-3-1"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-1-heading"
									>
										<div className="nk-gap-1" />
										<p>
											We can do almost anything, contact
											our operator.
										</p>
									</div>
								</div>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-2-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-2"
											aria-expanded="false"
											aria-controls="accordion-3-2"
										>
											{" "}
											How does the payment work?{" "}
										</a>
									</div>
									<div
										id="accordion-3-2"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-2-heading"
									>
										<div className="nk-gap-1" />
										<p>
											You make a pre-paid payment of 100%,
											but that sum is held by us and
											transferred to the booster only
											after all the work is done. This is
											guarantee of quality and safety for
											both sides.
										</p>
									</div>
								</div>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-3-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-3"
											aria-expanded="false"
											aria-controls="accordion-3-3"
										>
											{" "}
											Can I watch games booster perform
											from my account?{" "}
										</a>
									</div>
									<div
										id="accordion-3-3"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-3-heading"
									>
										<div className="nk-gap-1" />
										<p>
											Of course! Our booster can make a
											stream for you. Contact our operator
											for details.
										</p>
									</div>
								</div>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-4-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-4"
											aria-expanded="false"
											aria-controls="accordion-3-4"
										>
											Will boosters use RP?
										</a>
									</div>
									<div
										id="accordion-3-4"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-4-heading"
									>
										<div className="nk-gap-1" />
										<p>
											No. Boosters is prohibited from
											using your RP without your
											permission.
										</p>
									</div>
								</div>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-5-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-5"
											aria-expanded="false"
											aria-controls="accordion-3-5"
										>
											Can I get banned for boosting?
										</a>
									</div>
									<div
										id="accordion-3-5"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-5-heading"
									>
										<div className="nk-gap-1" />
										<p>
											We are making all protective
											measures we can to prevent that, but
											there is always a small chance that
											this will happen. In that case we
											wont take responsibility for that.
										</p>
									</div>
								</div>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-6-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-6"
											aria-expanded="false"
											aria-controls="accordion-3-6"
										>
											My booster isn’t doing as well as im
											expected. Can I get a new one?
										</a>
									</div>
									<div
										id="accordion-3-6"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-6-heading"
									>
										<div className="nk-gap-1" />
										<p>Sure. Contact our operator .</p>
									</div>
								</div>
								<div className="panel panel-default">
									<div
										className="panel-heading"
										role="tab"
										id="accordion-3-7-heading"
									>
										<a
											className="collapsed"
											data-toggle="collapse"
											data-parent="#accordion-3"
											href="#accordion-3-7"
											aria-expanded="false"
											aria-controls="accordion-3-7"
										>
											How long will you work on moving my
											account into desired devision?
										</a>
									</div>
									<div
										id="accordion-3-7"
										className="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="accordion-3-7-heading"
									>
										<div className="nk-gap-1" />
										<p>
											We cant say for sure since its quite
											unique job every time – but most of
											the times you can expect one day per
											division for devisions before
											platinum and two days per devision
											after.
										</p>
									</div>
								</div>
							</div>
							{/* END: Accordion 3 */}
						</div>
					</div>
				</div>
				<div className="nk-gap-4" />
				<div className="nk-gap-4" />
			</div>
			<div className="nk-gap-2" />
			<div className="nk-gap-4" />
			<div className="nk-gap-6" />
		</>
	)
}

export default Faq

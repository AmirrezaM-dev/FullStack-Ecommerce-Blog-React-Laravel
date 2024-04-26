import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Loader from "react-loader-spinner"
import { useContexts } from "../../Contexts"
import Error from "./Error"

const Order = () => {
	const history = useHistory()
	const { api } = useContexts()
	const { purchase_code, pwd } = useParams()
	const [isLoaded, setIsLoaded] = useState(false)
	const [is404, setIs404] = useState(false)
	const [checkoutData, setCheckoutData] = useState(false)
	useEffect(() => {
		if (!isLoaded) {
			api()
				.post("/checkout", {
					code: purchase_code,
					pwd: pwd,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success" && data.data[0].paid === 1) {
						setCheckoutData(data.data[0])
						setIsLoaded(true)
					} else {
						history.push("/checkout/" + purchase_code)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setIs404(true)
				})
				.finally(() => {})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return !is404 ? (
		<>
			{checkoutData ? (
				<div className="container">
					<div className="nk-gap-2" />
					<div className="row">
						<div className="col-lg-12">
							<div className="">
								<div className="nk-blog-post nk-blog-post-single">
									<div className="nk-post-text mt-0 custom-order p-20 text-center text-success">
										Your payment has been successfully
										accepted. Thanks for your purchase, we
										will start our job as soon as possible!
									</div>
								</div>
								<div className="nk-gap-1" />
							</div>
						</div>
						{/* <div className="col-lg-4">
								<div className="card custom-order2">
									<div className="card-body msg_card_body">
										<div className="d-flex justify-content-start mb-20">
											<div className="img_cont_msg">
												<img src={process.env.PUBLIC_URL + "/assets/images/large-logo.png"} className="user_img_msg" />
											</div>
											<div className="msg_cotainer pt-0">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
												<span className="msg_time">8:40 AM, Today</span>
											</div>
										</div>
										<div className="d-flex justify-content-end mb-20">
											<div className="msg_cotainer_send pt-0">
												Hi Khalid i am good tnx how about you?
												<span className="msg_time_send">8:55 AM, Today</span>
											</div>
											<div className="img_cont_msg">
												<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
											</div>
										</div>
										<div className="d-flex justify-content-start mb-20">
											<div className="img_cont_msg">
												<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
											</div>
											<div className="msg_cotainer pt-0">
												Hi, how are you samim?
												<span className="msg_time">8:40 AM, Today</span>
											</div>
										</div>
										<div className="d-flex justify-content-end mb-20">
											<div className="msg_cotainer_send pt-0">
												Hi Khalid i am good tnx how about you?
												<span className="msg_time_send">8:55 AM, Today</span>
											</div>
											<div className="img_cont_msg">
												<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
											</div>
										</div>
										<div className="d-flex justify-content-start mb-20">
											<div className="img_cont_msg">
												<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
											</div>
											<div className="msg_cotainer pt-0">
												Hi, how are you samim?
												<span className="msg_time">8:40 AM, Today</span>
											</div>
										</div>
										<div className="d-flex justify-content-end mb-20">
											<div className="msg_cotainer_send pt-0">
												Hi Khalid i am good tnx how about you?
												<span className="msg_time_send">8:55 AM, Today</span>
											</div>
											<div className="img_cont_msg">
												<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
											</div>
										</div>
									</div>
									<div className="card-footer">
										<div className="input-group">
											<div className="input-group-append">
												<span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
											</div>
											<textarea name className="form-control type_msg" placeholder="Type your message..." defaultValue={""} />
											<div className="input-group-append">
												<span className="input-group-text send_btn"><i className="fas fa-location-arrow" /></span>
											</div>
										</div>
									</div>
								</div>
							</div> */}
						<div className="col-lg-12">
							<div className="nk-blog-post nk-blog-post-single">
								<div className="nk-post-text mt-0 custom-order pt-25 pb-25">
									<p className="text-center">
										{checkoutData.title}
									</p>
									<aside className="nk-sidebar">
										<table className="ml-auto mr-auto">
											<tbody>
												<tr>
													<td>
														<strong>
															Ordered at:
														</strong>
														&nbsp;
														&nbsp;&nbsp;&nbsp;
													</td>
													<td>
														{new Date(
															checkoutData.created_at
														).getDay()}
														/
														{new Date(
															checkoutData.created_at
														).getMonth()}
														/
														{new Date(
															checkoutData.created_at
														).getFullYear()}
														&nbsp;
														{new Date(
															checkoutData.created_at
														).getHours()}
														:
														{new Date(
															checkoutData.created_at
														).getMinutes()}
														:
														{new Date(
															checkoutData.created_at
														).getSeconds()}
													</td>
												</tr>
												{JSON.parse(checkoutData.cart)
													.filter(
														(item) =>
															item[2] === false ||
															item[2] === "false"
													)
													.map((item, key) => {
														return (
															<tr key={key}>
																<td>
																	<strong>
																		{
																			item[0]
																		}
																		:
																	</strong>
																	&nbsp;
																	&nbsp;&nbsp;&nbsp;
																</td>
																<td>
																	{item[1].indexOf(
																		'[{"value":"'
																	) === -1
																		? item[1]
																		: JSON.parse(
																				item[1]
																		  ).map(
																				(
																					items,
																					key
																				) => {
																					return (
																						items.value +
																						(JSON.parse(
																							item[1]
																						)
																							.length -
																							1 !==
																						key
																							? ", "
																							: "")
																					)
																				}
																		  )}
																</td>
															</tr>
														)
													})}
											</tbody>
										</table>
										<div className="nk-gap-5 d-lg-none" />
									</aside>
								</div>
							</div>
							<div className="nk-gap-1" />
						</div>
						<div className="col-lg-12">
							<div className="">
								<div className="nk-blog-post nk-blog-post-single">
									<div className="nk-post-text mt-0 custom-order p-20 text-center text-success">
										Our chat is currently in maintenance we
										will call you in discord as soon as
										possible
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="nk-gap-4" />
				</div>
			) : (
				<div className="container">
					<div className="nk-gap-2" />
					<div className="row">
						<div className="col-lg-12">
							<div className="nk-blog-post nk-blog-post-single">
								<div className="nk-post-text mt-0 custom-order p-20 text-center text-success">
									<div className="btn col ml-auto mr-auto">
										<Loader
											className="ml-auto mr-auto"
											type="Circles"
											color="#FFF"
											height={20}
										/>
									</div>
								</div>
								<div className="nk-gap-1" />
							</div>
						</div>
						<div className="col-lg-12">
							<div className="nk-blog-post nk-blog-post-single">
								<div className="nk-post-text mt-0 custom-order pt-25 pb-25">
									<div className="btn col ml-auto mr-auto">
										<Loader
											className="ml-auto mr-auto"
											type="Circles"
											color="#FFF"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="nk-gap-4" />
				</div>
			)}
		</>
	) : (
		<Error />
	)
}

export default Order

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import Modal from "react-modal"
import { useHistory } from "react-router-dom"

const Leveling = () => {
	const lCode = 9
	let history = useHistory()

	const {
		Toast,
		objSearch,
		customStyles,
		api,
		LeagueOfLegendsApi,
		LoadingSelect,
		LoadingCheckbox,
	} = useContexts()

	const [lCodeFirstLoaded, setLCodeFirstLoaded] = useState(false)
	const [lCodeFirstData, setLCodeFirstData] = useState()

	const [leveler, setLeveler] = useState()
	const [levelPricing, setLevelPricing] = useState()

	const [lCodeCurrentLevel, setLCodeCurrentLevel] = useState()
	const [lCodeCurrentLevels, setLCodeCurrentLevels] = useState()
	const lCodeCurrentLevelRef = useRef()
	const [lCodeCurrentLevelForce, setLCodeCurrentLevelForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [lCodeDesiredLevel, setLCodeDesiredLevel] = useState()
	const [lCodeDesiredLevels, setLCodeDesiredLevels] = useState()
	const lCodeDesiredLevelRef = useRef()
	const [lCodeDesiredLevelForce, setLCodeDesiredLevelForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [lCodeGameRegion, setLCodeGameRegion] = useState()
	const [lCodeGameRegions, setLCodeGameRegions] = useState()
	const lCodeGameRegionRef = useRef()
	const [lCodeGameRegionForce, setLCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [lCodePriceBeforePromoCode, setLCodePriceBeforePromoCode] = useState()

	const [lCodeVipPercentage, setLCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [lCodeVipOptions, setLCodeVipOptions] = useState([])

	const [lCodeFlashLocationIsOpen, setLCodeFlashLocationIsOpen] =
		useState(false)
	const [lCodeFlashLocation, setLCodeFlashLocation] = useState("")
	const [lCodeFlashLocationActive, setLCodeFlashLocationActive] =
		useState(false)
	const lCodeResetFlashLocation = () => {}
	const lCodeCancelFlashLocation = (item) => {
		setLCodeFlashLocationIsOpen(false)
		setLCodeFlashLocationActive(false)
		document.body.style.overflow = "auto"
		document.getElementsByClassName("flash_ref_" + lCode)[0].checked = false
	}
	const lCodeApplyFlashLocation = () => {
		if (lCodeFlashLocation && lCodeFlashLocation !== "") {
			setLCodeFlashLocationIsOpen(false)
			setLCodeFlashLocationActive(true)
			document.body.style.overflow = "auto"
		} else {
			Toast.fire({
				icon: "error",
				title: "Please select flash location.",
			})
		}
	}

	const [lCodePromoCode, setLCodePromoCode] = useState("")
	const [lCodePromoCodePercentage, setLCodePromoCodePercentage] = useState()
	const [lCodePromoCodeClass, setLCodePromoCodeClass] = useState("")
	const [lCodeApplyButton, setLCodeApplyButton] = useState("Apply")
	const [lCodeApplyButtonClass, setLCodeApplyButtonClass] = useState()
	const lCodePromoCodeRef = useRef()
	const lCodeApplyPromoCode = () => {
		setLCodePromoCodePercentage(0)
		if (
			lCodePromoCode &&
			lCodePromoCode.length &&
			lCodeApplyButton === "Apply"
		) {
			setLCodePromoCodeClass(" forced")
			setLCodeApplyButtonClass(" loading")
			setLCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/LeagueOfLegends/promocode", {
					promocode: lCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setLCodePromoCodePercentage(data.percentage)
						setLCodePromoCodeClass(" success")
					} else {
						setLCodePromoCodeClass(" error")
						setLCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setLCodePromoCodeClass(" error")
					setLCodePromoCodePercentage(0)
				})
				.finally(() => {
					setLCodeApplyButtonClass("")
					setLCodeApplyButton("Apply")
				})
		} else {
			lCodePromoCodeRef.current.focus()
			setLCodePromoCodeClass(" forced")
		}
	}
	const lCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			lCodeApplyPromoCode()
		}
	}

	const [lCodeRequestToPay, setLCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [lCodePrice, setLCodePrice] = useState(0)

	const lCodeCustomFunctions = {
		flash: (e) => {
			if (e.target.checked) {
				setLCodeFlashLocationIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				lCodeCancelFlashLocation(
					lCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "flash"
					)[0]
				)
			}
		},
	}

	useEffect(() => {
		if (lCodeCurrentLevel) {
			setLCodeDesiredLevels(
				leveler.filter((item) => item.value > lCodeCurrentLevel.value)
			)
			if (
				lCodeDesiredLevel &&
				lCodeDesiredLevel.value <= lCodeCurrentLevel.value
			) {
				setLCodeDesiredLevel(
					leveler.filter(
						(item) => item.value > lCodeCurrentLevel.value
					)[0]
				)
			}
		}
	}, [lCodeCurrentLevel, lCodeDesiredLevel])

	useEffect(() => {
		if (lCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (
				lCodeCurrentLevel &&
				lCodeDesiredLevel &&
				levelPricing.length &&
				lCodeDesiredLevel.value - lCodeCurrentLevel.value > 0
			) {
				for (
					let i = lCodeCurrentLevel.value;
					i < lCodeDesiredLevel.value;
					i++
				) {
					const cp = levelPricing.filter(
						(item) => item.min <= i && item.max >= i
					)
					if (cp.length) price += cp[0].price
				}
			}

			if (lCodeVipPercentage) {
				add_price = add_price + (price / 100) * lCodeVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			if (lCodeFlashLocationActive) {
				add_price =
					add_price +
					(price / 100) *
						lCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0].percentage
			}

			price = price + add_price

			if (lCodePromoCodePercentage) {
				setLCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * lCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setLCodePrice(price)
		}
	}, [
		lCodeVipPercentage,
		lCodePromoCodePercentage,
		lCodeFlashLocationActive,
		lCodeCurrentLevel,
		lCodeDesiredLevel,
		vipPercentage,
	])

	useEffect(() => {
		if (lCodeRequestToPay) {
			let error = 0
			if (lCodeCurrentLevel && lCodeCurrentLevel.length !== 0) {
				setLCodeCurrentLevelForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setLCodeCurrentLevelForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (lCodeDesiredLevel && lCodeDesiredLevel.length !== 0) {
				setLCodeDesiredLevelForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setLCodeDesiredLevelForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (lCodeGameRegion && lCodeGameRegion.length !== 0) {
				setLCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setLCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [lCodeGameRegion, lCodeCurrentLevel, lCodeDesiredLevel])

	useEffect(() => {
		if (!lCodeFirstLoaded) {
			let data = LeagueOfLegendsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.normal_matches === 1),
			}
			setLCodeFirstData(data)

			setLCodeGameRegions(data.regions)

			setLevelPricing(data.level_pricing)

			let levelers = []
			for (let x = data.levels[0]; x <= data.levels[1]; x++) {
				levelers.push({ value: x, label: x })
			}
			setLeveler(levelers)
			setLCodeCurrentLevels(levelers)
			setLCodeDesiredLevels(
				levelers.filter((item) => item.value !== levelers[0].value)
			)
			setLCodeCurrentLevel(null)
			setLCodeDesiredLevel(null)

			setLCodePrice((0).toFixed(2))

			setLCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const lCodeCheckPurchase = () => {
		setLCodeRequestToPay(true)
		let error = 0
		if (!lCodeCurrentLevel) {
			if (!error) {
				lCodeCurrentLevelRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setLCodeCurrentLevelForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!lCodeDesiredLevel) {
			if (!error) {
				lCodeDesiredLevelRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setLCodeDesiredLevelForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (lCodeGameRegion === undefined || lCodeGameRegion.length === 0) {
			if (!error) {
				lCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setLCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setLCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const lCodePurchase = () => {
		if (lCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/LeagueOfLegends/lCode/makePurchase", {
					code: lCode,
					currentLevel: lCodeCurrentLevel.value,
					desiredLevel: lCodeDesiredLevel.value,
					gameRegion: lCodeGameRegion.value,
					flashLocation: lCodeFlashLocation
						? lCodeFlashLocation
						: null,
					vipOptions: lCodeVipOptions,
					promoCode: lCodePromoCode ? lCodePromoCode : null,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						history.push("/checkout/" + data.checkout)
					} else {
						Toast.fire({
							icon: "warning",
							title: "Something went wrong please try again later!",
						})
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					Toast.fire({
						icon: "warning",
						title: "Something went wrong please try again later!",
					})
				})
				.finally(() => {
					setPayText("Purchase")
					setPaying(false)
				})
		}
	}

	return (
		<>
			<Modal
				isOpen={lCodeFlashLocationIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={lCodeResetFlashLocation}
				onRequestClose={() =>
					lCodeCancelFlashLocation(
						lCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{lCodeFirstLoaded ? (
					<div className="vip-modal">
						<h2 className="col-12 vip-modal-header">
							Choose summoner spells&nbsp;
							<span className="free-label">(+5%)</span>
						</h2>
						<div className="row vertical-gap pl-10 pr-10 flash-vip">
							<div className="col-12 row ml-auto mr-auto">
								<div
									className={
										"cursor-pointer col-xl-4 p-5 mb-5 mt-5 ml-auto mr-auto"
									}
								>
									<div
										className={
											"vip-role card-body p-10 pb-0 pt-0 ml-10 mr-10  row " +
											(lCodeFlashLocation === "D"
												? "selected"
												: "")
										}
										onClick={() => {
											setLCodeFlashLocation("D")
										}}
									>
										<div className="col-lg-6 col-md-12 text-left pl-1 pr-1">
											<img
												className="flashlocation p-5"
												src={
													"/assets/images/LeagueOfLegends/flash.png"
												}
												alt="Flash"
											/>
											<span>D(Flash)</span>
										</div>
										<div className="col-lg-6 col-sm-12 text-lg-right text-sm-left pl-1 pr-1">
											<img
												className="flashlocation p-5"
												src={
													"/assets/images/LeagueOfLegends/ignite.png"
												}
												alt="Ignite"
											/>
											<span>F</span>
										</div>
									</div>
								</div>
								<div
									className={
										"cursor-pointer col-xl-4 p-5 mb-5 mt-5 ml-auto mr-auto"
									}
								>
									<div
										className={
											"vip-role card-body p-10 pb-0 pt-0 ml-10 mr-10  row " +
											(lCodeFlashLocation === "F"
												? "selected"
												: "")
										}
										onClick={() => {
											setLCodeFlashLocation("F")
										}}
									>
										<div className="col-lg-6 col-md-12 text-left pl-1 pr-1">
											<img
												className="flashlocation p-5"
												src={
													"/assets/images/LeagueOfLegends/ignite.png"
												}
												alt="Ignite"
											/>
											<span>D</span>
										</div>
										<div className="col-lg-6 col-sm-12 text-lg-right text-sm-left pl-1 pr-1">
											<img
												className="flashlocation p-5"
												src={
													"/assets/images/LeagueOfLegends/flash.png"
												}
												alt="Flash"
											/>
											<span>F(Flash)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="nk-gap-2" />
						<div className="row vertical-gap pl-10 pr-10">
							<div className="col-4 ml-auto">
								<button
									className="save-btn cancel"
									onClick={() =>
										lCodeCancelFlashLocation(
											lCodeFirstData.vip.filter(
												(item) =>
													item.custom.toLowerCase() ===
													"flash"
											)[0]
										)
									}
								>
									Cancel
								</button>
							</div>
							<div className="col-4 mr-auto">
								<button
									className="save-btn save"
									onClick={lCodeApplyFlashLocation}
								>
									Save
								</button>
							</div>
						</div>
						<div className="nk-gap-2" />
					</div>
				) : (
					<LoadingSelect />
				)}
			</Modal>
			<div className="col-md-12">
				<div className="row vertical-gap">
					<div className="col-lg-4 col-md-6 col-12">
						{lCodeFirstLoaded ? (
							<Select
								ref={lCodeCurrentLevelRef}
								menuIsOpen={lCodeCurrentLevelForce.menuIsOpen}
								onMenuOpen={() =>
									setLCodeCurrentLevelForce(
										(prevLCodeCurrentLevelForce) => {
											return {
												...prevLCodeCurrentLevelForce,
												menuIsOpen:
													!prevLCodeCurrentLevelForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setLCodeCurrentLevelForce(
										(prevLCodeCurrentLevelForce) => {
											return {
												...prevLCodeCurrentLevelForce,
												menuIsOpen: false,
											}
										}
									)
								}
								placeholder="Current Level"
								onChange={(e) => {
									setLCodeCurrentLevel(e)
								}}
								className={
									lCodeCurrentLevelForce.forced
										? "custom-forced"
										: ""
								}
								options={lCodeCurrentLevels}
								value={lCodeCurrentLevel}
								closeMenuOnSelect={true}
								isSearchable={true}
								styles={customStyles}
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary25: "#0275d8 ",
										primary: "#2953b1",
										primary50: "none",
									},
								})}
							/>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-lg-4 col-md-6 col-12">
						{lCodeFirstLoaded ? (
							<Select
								ref={lCodeDesiredLevelRef}
								menuIsOpen={lCodeDesiredLevelForce.menuIsOpen}
								onMenuOpen={() =>
									setLCodeDesiredLevelForce(
										(prevLCodeDesiredLevelForce) => {
											return {
												...prevLCodeDesiredLevelForce,
												menuIsOpen:
													!prevLCodeDesiredLevelForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setLCodeDesiredLevelForce(
										(prevLCodeDesiredLevelForce) => {
											return {
												...prevLCodeDesiredLevelForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									lCodeDesiredLevelForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Desired Level"
								onChange={(e) => {
									setLCodeDesiredLevel(
										lCodeDesiredLevels[
											objSearch(
												lCodeDesiredLevels,
												"value",
												e.value
											)
										]
									)
								}}
								options={lCodeDesiredLevels}
								value={lCodeDesiredLevel}
								isSearchable={true}
								styles={customStyles}
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary25: "#0275d8 ",
										primary: "#2953b1",
										primary50: "none",
									},
								})}
							/>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-lg-4 col-md-6 col-12">
						{lCodeFirstLoaded ? (
							<Select
								ref={lCodeGameRegionRef}
								menuIsOpen={lCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setLCodeGameRegionForce(
										(prevLCodeGameRegionForce) => {
											return {
												...prevLCodeGameRegionForce,
												menuIsOpen:
													!prevLCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setLCodeGameRegionForce(
										(prevLCodeGameRegionForce) => {
											return {
												...prevLCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									lCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setLCodeGameRegion(
										lCodeGameRegions[
											objSearch(
												lCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={lCodeGameRegions}
								value={lCodeGameRegion}
								isSearchable={false}
								styles={customStyles}
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary25: "#0275d8 ",
										primary: "#2953b1",
										primary50: "none",
									},
								})}
							/>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={lCodePromoCodeRef}
							className={
								"form-control text-center" + lCodePromoCodeClass
							}
							onChange={(e) => setLCodePromoCode(e.target.value)}
							value={lCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={lCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={lCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								lCodeApplyButtonClass
							}
						>
							<span>{lCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{lCodeFirstLoaded &&
			lCodeFirstData.vip &&
			lCodeFirstData.vip &&
			lCodeFirstData.vip.filter(
				(item) => item.boost_id === lCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{lCodeFirstLoaded ? (
							lCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === lCode ||
										item.boost_id === null
								)
								.map((item, key) => {
									return (
										<div
											key={key}
											className="col-md-4 pt-10 pb-10"
										>
											<div className="custom-control custom-checkbox">
												<input
													onChange={(e) => {
														if (e.target.checked) {
															setLCodeVipOptions(
																(
																	prevLCodeVipOptions
																) => {
																	return [
																		...prevLCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setLCodeVipOptions(
																lCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setLCodeVipPercentage(
																(
																	prevLCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevLCodeVipPercentage +
																				item.percentage
																		: prevLCodeVipPercentage -
																				item.percentage
																}
															)
														} else if (
															item.custom === "-"
														) {
															setVipPercentage(
																(
																	prevVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevVipPercentage +
																				item.percentage
																		: prevVipPercentage -
																				item.percentage
																}
															)
														}
														if (
															lCodeCustomFunctions[
																item.custom
															]
														) {
															lCodeCustomFunctions[
																item.custom
															](e, item)
														}
													}}
													type="checkbox"
													className={
														"custom-control-input " +
														(item.custom.length
															? item.custom +
															  "_ref_" +
															  lCode
															: "")
													}
													id={
														item.value +
														"-lCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-lCode-checkbox-id"
													}
												>
													{item.label}
												</label>
											</div>
										</div>
									)
								})
						) : (
							<LoadingCheckbox />
						)}
					</div>
					<div className="nk-gap-2" />
				</div>
			) : (
				<></>
			)}
			<div className="col-md-12">
				<div className="nk-gap-2" />
				<div
					className="nk-cart-total text-center"
					style={{
						opacity: 1,
						transform: "translate3d(0px, 0px, 0px)",
						fontSize: "50px",
					}}
				>
					&nbsp; Total Cost&nbsp;
					<span
						className="nk-product-price"
						style={{ color: "#48ac55", fontSize: "50px" }}
					>
						<label>
							{lCodePrice} &euro;
							{lCodePromoCodePercentage &&
							lCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{lCodePriceBeforePromoCode} &euro;
								</del>
							) : (
								<></>
							)}
						</label>
						<i className="fas fa-euro-sign ml-5" />
					</span>
				</div>
				<div className="nk-gap-2" />
				<div className="nk-cart-total text-center">
					<div className="pay-boost d-inline">
						<button
							className="button ml-5 mr-5"
							onClick={lCodePurchase}
						>
							<span className="button__text">{payText}</span>
							<svg
								className="button__svg"
								role="presentational"
								viewBox="0 0 600 600"
							>
								<defs>
									<clipPath id="myClip">
										<rect
											x={0}
											y={0}
											width="100%"
											height="50%"
										/>
									</clipPath>
								</defs>
								<g clipPath="url(#myClip)">
									<g id="money">
										<path
											d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z"
											fill="#699e64"
											stroke="#323c44"
											strokeMiterlimit={10}
											strokeWidth={14}
										/>
										<path
											d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z"
											fill="#699e64"
											stroke="#323c44"
											strokeMiterlimit={10}
											strokeWidth={14}
										/>
									</g>
									<g id="creditcard">
										<path
											d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z"
											fill="#a76fe2"
											stroke="#323c44"
											strokeMiterlimit={10}
											strokeWidth={14}
										/>
										<path
											d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z"
											fill="#ffdc67"
										/>
										<path
											d="M249.73,183.76h28.85v274.8H249.73Z"
											fill="#323c44"
										/>
									</g>
								</g>
								<g id="wallet">
									<path
										d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z"
										fill="#a4bdc1"
										stroke="#323c44"
										strokeMiterlimit={10}
										strokeWidth={14}
									/>
									<path
										d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z"
										fill="#a4bdc1"
										stroke="#323c44"
										strokeMiterlimit={10}
										strokeWidth={14}
									/>
									<path
										d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z"
										fill="#a4bdc1"
										stroke="#323c44"
										strokeMiterlimit={10}
										strokeWidth={14}
									/>
									<path
										d="M147.87,541.93V320.84c-.05-13.2,8.25-21.51,21.62-24.27a42.71,42.71,0,0,1,7.14-1.32l-29.36-.63a67.77,67.77,0,0,0-9.13.45c-13.37,2.75-20.32,12.57-20.27,25.77l.38,221.24c-1.57,15.44,8.15,27.08,25.34,26.1l33-.19c-15.9,0-28.78-10.58-28.76-25.93Z"
										fill="#7b8f91"
									/>
									<path
										d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z"
										fill="#323c44"
									/>
								</g>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Leveling

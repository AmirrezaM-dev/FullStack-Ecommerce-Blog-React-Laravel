import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import { useHistory } from "react-router-dom"
const Clash = () => {
	const clashCode = 6
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

	const [clashCodeFirstLoaded, setClashCodeFirstLoaded] = useState(false)
	const [clashCodeFirstData, setClashCodeFirstData] = useState()

	const [clashCodeGameRegion, setClashCodeGameRegion] = useState()
	const [clashCodeGameRegions, setClashCodeGameRegions] = useState()
	const clashCodeGameRegionRef = useRef()
	const [clashCodeGameRegionForce, setClashCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [clashCodeTeamTire, setClashCodeTeamTire] = useState()
	const [clashCodeTeamTires, setClashCodeTeamTires] = useState()
	const clashCodeTeamTireRef = useRef()
	const [clashCodeTeamTireForce, setClashCodeTeamTireForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [clashCodeNumberOfGame, setClashCodeNumberOfGame] = useState()
	const clashCodeNumberOfGames = [
		{ value: 1, label: 1 },
		{ value: 2, label: 2 },
		{ value: 3, label: 3 },
		{ value: 4, label: 4 },
		{ value: 5, label: 5 },
		{ value: 6, label: 6 },
		{ value: 7, label: 7 },
		{ value: 8, label: 8 },
		{ value: 9, label: 9 },
		{ value: 10, label: 10 },
	]
	const clashCodeNumberOfGameRef = useRef()
	const [clashCodeNumberOfGameForce, setClashCodeNumberOfGameForce] =
		useState({ menuIsOpen: false, forced: false })

	const [clashCodeNumberOfBooster, setClashCodeNumberOfBooster] = useState()
	const clashCodeNumberOfBoosters = [
		{ value: 1, label: 1 },
		{ value: 2, label: 2 },
		{ value: 3, label: 3 },
		{ value: 4, label: 4 },
		{ value: 5, label: 5 },
	]
	const clashCodeNumberOfBoosterRef = useRef()
	const [clashCodeNumberOfBoosterForce, setClashCodeNumberOfBoosterForce] =
		useState({ menuIsOpen: false, forced: false })

	const [clashCodePriceBeforePromoCode, setClashCodePriceBeforePromoCode] =
		useState()

	const [clashCodeVipPercentage, setClashCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [clashCodeVipOptions, setClashCodeVipOptions] = useState([])

	const [clashCodePromoCode, setClashCodePromoCode] = useState("")
	const [clashCodePromoCodePercentage, setClashCodePromoCodePercentage] =
		useState()
	const [clashCodePromoCodeClass, setClashCodePromoCodeClass] = useState("")
	const [clashCodeApplyButton, setClashCodeApplyButton] = useState("Apply")
	const [clashCodeApplyButtonClass, setClashCodeApplyButtonClass] = useState()
	const clashCodePromoCodeRef = useRef()
	const clashCodeApplyPromoCode = () => {
		setClashCodePromoCodePercentage(0)
		if (
			clashCodePromoCode &&
			clashCodePromoCode.length &&
			clashCodeApplyButton === "Apply"
		) {
			setClashCodePromoCodeClass(" forced")
			setClashCodeApplyButtonClass(" loading")
			setClashCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/LeagueOfLegends/promocode", {
					promocode: clashCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setClashCodePromoCodePercentage(data.percentage)
						setClashCodePromoCodeClass(" success")
					} else {
						setClashCodePromoCodeClass(" error")
						setClashCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setClashCodePromoCodeClass(" error")
					setClashCodePromoCodePercentage(0)
				})
				.finally(() => {
					setClashCodeApplyButtonClass("")
					setClashCodeApplyButton("Apply")
				})
		} else {
			clashCodePromoCodeRef.current.focus()
			setClashCodePromoCodeClass(" forced")
		}
	}
	const clashCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			clashCodeApplyPromoCode()
		}
	}

	const [clashCodeRequestToPay, setClashCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [clashCodePrice, setClashCodePrice] = useState(0)

	useEffect(() => {
		if (clashCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (clashCodeTeamTire && clashCodeNumberOfGame) {
				price = clashCodeTeamTire.price * clashCodeNumberOfGame.value
			}

			if (clashCodeNumberOfBooster) {
				price = price * clashCodeNumberOfBooster.value
			}

			if (clashCodeVipPercentage) {
				add_price = add_price + (price / 100) * clashCodeVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			price = price + add_price

			if (clashCodePromoCodePercentage) {
				setClashCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * clashCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setClashCodePrice(price)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		clashCodeNumberOfGame,
		clashCodeVipPercentage,
		clashCodePromoCodePercentage,
		clashCodeNumberOfBooster,
		clashCodeTeamTire,
		vipPercentage,
	])

	useEffect(() => {
		if (clashCodeRequestToPay) {
			let error = 0
			if (clashCodeNumberOfGame && clashCodeNumberOfGame.length !== 0) {
				setClashCodeNumberOfGameForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setClashCodeNumberOfGameForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (clashCodeTeamTire && clashCodeTeamTire.length !== 0) {
				setClashCodeTeamTireForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setClashCodeTeamTireForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				clashCodeNumberOfBooster &&
				clashCodeNumberOfBooster.length !== 0
			) {
				setClashCodeNumberOfBoosterForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setClashCodeNumberOfBoosterForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (clashCodeGameRegion && clashCodeGameRegion.length !== 0) {
				setClashCodeGameRegionForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setClashCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		clashCodeGameRegion,
		clashCodeNumberOfGame,
		clashCodeNumberOfBooster,
		clashCodeTeamTire,
	])

	useEffect(() => {
		if (!clashCodeFirstLoaded) {
			let data = LeagueOfLegendsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.clash === 1),
			}

			setClashCodeFirstData(data)

			setClashCodeGameRegions(data.regions)

			setClashCodeTeamTires(data.teamtires)

			setClashCodePrice((0).toFixed(2))

			setClashCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [0])

	const clashCodeCheckPurchase = () => {
		setClashCodeRequestToPay(true)
		let error = 0
		if (
			clashCodeNumberOfGame === undefined ||
			clashCodeNumberOfGame.length === 0
		) {
			if (!error) {
				clashCodeNumberOfGameRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setClashCodeNumberOfGameForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (clashCodeTeamTire === undefined || clashCodeTeamTire.length === 0) {
			if (!error) {
				clashCodeTeamTireRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setClashCodeTeamTireForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			clashCodeNumberOfBooster === undefined ||
			clashCodeNumberOfBooster.length === 0
		) {
			if (!error) {
				clashCodeNumberOfBoosterRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setClashCodeNumberOfBoosterForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			clashCodeGameRegion === undefined ||
			clashCodeGameRegion.length === 0
		) {
			if (!error) {
				clashCodeGameRegionRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setClashCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setClashCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const clashCodePurchase = () => {
		if (clashCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/LeagueOfLegends/clashCode/makePurchase", {
					code: clashCode,
					numberOfGames: clashCodeNumberOfGame.value,
					numberOfBooster: clashCodeNumberOfBooster.value,
					teamtire: clashCodeTeamTire.value,
					gameRegion: clashCodeGameRegion.value,
					vipOptions: clashCodeVipOptions,
					promoCode: clashCodePromoCode ? clashCodePromoCode : null,
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
			<div className="col-md-12">
				<div className="row vertical-gap">
					<div className="col-md-3">
						{clashCodeFirstLoaded ? (
							<Select
								ref={clashCodeNumberOfGameRef}
								menuIsOpen={
									clashCodeNumberOfGameForce.menuIsOpen
								}
								onMenuOpen={() =>
									setClashCodeNumberOfGameForce(
										(prevClashCodeNumberOfGameForce) => {
											return {
												...prevClashCodeNumberOfGameForce,
												menuIsOpen:
													!prevClashCodeNumberOfGameForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setClashCodeNumberOfGameForce(
										(prevClashCodeNumberOfGameForce) => {
											return {
												...prevClashCodeNumberOfGameForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									clashCodeNumberOfGameForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Number of games"
								onChange={(e) => {
									setClashCodeNumberOfGame(
										clashCodeNumberOfGames[
											objSearch(
												clashCodeNumberOfGames,
												"value",
												e.value
											)
										]
									)
								}}
								options={clashCodeNumberOfGames}
								value={clashCodeNumberOfGame}
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
					<div className="col-md-3">
						{clashCodeFirstLoaded ? (
							<Select
								ref={clashCodeTeamTireRef}
								menuIsOpen={clashCodeTeamTireForce.menuIsOpen}
								onMenuOpen={() =>
									setClashCodeTeamTireForce(
										(prevClashCodeTeamTireForce) => {
											return {
												...prevClashCodeTeamTireForce,
												menuIsOpen:
													!prevClashCodeTeamTireForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setClashCodeTeamTireForce(
										(prevClashCodeTeamTireForce) => {
											return {
												...prevClashCodeTeamTireForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									clashCodeTeamTireForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Team Tire"
								onChange={(e) => {
									setClashCodeTeamTire(
										clashCodeTeamTires[
											objSearch(
												clashCodeTeamTires,
												"value",
												e.value
											)
										]
									)
								}}
								options={clashCodeTeamTires}
								value={clashCodeTeamTire}
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
					<div className="col-md-3">
						{clashCodeFirstLoaded ? (
							<Select
								ref={clashCodeNumberOfBoosterRef}
								menuIsOpen={
									clashCodeNumberOfBoosterForce.menuIsOpen
								}
								onMenuOpen={() =>
									setClashCodeNumberOfBoosterForce(
										(prevClashCodeNumberOfBoosterForce) => {
											return {
												...prevClashCodeNumberOfBoosterForce,
												menuIsOpen:
													!prevClashCodeNumberOfBoosterForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setClashCodeNumberOfBoosterForce(
										(prevClashCodeNumberOfBoosterForce) => {
											return {
												...prevClashCodeNumberOfBoosterForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									clashCodeNumberOfBoosterForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Number of boosters"
								onChange={(e) => {
									setClashCodeNumberOfBooster(
										clashCodeNumberOfBoosters[
											objSearch(
												clashCodeNumberOfBoosters,
												"value",
												e.value
											)
										]
									)
								}}
								options={clashCodeNumberOfBoosters}
								value={clashCodeNumberOfBooster}
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
					<div className="col-md-3">
						{clashCodeFirstLoaded ? (
							<Select
								ref={clashCodeGameRegionRef}
								menuIsOpen={clashCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setClashCodeGameRegionForce(
										(prevClashCodeGameRegionForce) => {
											return {
												...prevClashCodeGameRegionForce,
												menuIsOpen:
													!prevClashCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setClashCodeGameRegionForce(
										(prevClashCodeGameRegionForce) => {
											return {
												...prevClashCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									clashCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setClashCodeGameRegion(
										clashCodeGameRegions[
											objSearch(
												clashCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={clashCodeGameRegions}
								value={clashCodeGameRegion}
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
				</div>
				<div className="nk-gap-2" />
			</div>
			<div className="col-md-12">
				<div className="row vertical-gap">
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={clashCodePromoCodeRef}
							className={
								"form-control text-center" +
								clashCodePromoCodeClass
							}
							onChange={(e) =>
								setClashCodePromoCode(e.target.value)
							}
							value={clashCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={clashCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={clashCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								clashCodeApplyButtonClass
							}
						>
							<span>{clashCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{clashCodeFirstLoaded &&
			clashCodeFirstData.vip &&
			clashCodeFirstData.vip &&
			clashCodeFirstData.vip.filter(
				(item) => item.boost_id === clashCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{clashCodeFirstLoaded ? (
							clashCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === clashCode ||
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
															setClashCodeVipOptions(
																(
																	prevClashCodeVipOptions
																) => {
																	return [
																		...prevClashCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setClashCodeVipOptions(
																clashCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setClashCodeVipPercentage(
																(
																	prevClashCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevClashCodeVipPercentage +
																				item.percentage
																		: prevClashCodeVipPercentage -
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
													}}
													type="checkbox"
													className={
														"custom-control-input " +
														(item.custom.length
															? item.custom +
															  "_ref_" +
															  clashCode
															: "")
													}
													id={
														item.value +
														"-clashCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-clashCode-checkbox-id"
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
							{clashCodePrice} &euro;
							{clashCodePromoCodePercentage &&
							clashCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{clashCodePriceBeforePromoCode} &euro;
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
							onClick={clashCodePurchase}
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

export default Clash

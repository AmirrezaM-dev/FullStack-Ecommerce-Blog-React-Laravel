import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import Modal from "react-modal"
import { useHistory } from "react-router-dom"

const ChampionMastery = () => {
	const cMCode = 8
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

	const [cMCodeFirstLoaded, setCMCodeFirstLoaded] = useState(false)
	const [cMCodeFirstData, setCMCodeFirstData] = useState()

	const [cMCodeChampion, setCMCodeChampion] = useState()
	const [cMCodeChampions, setCMCodeChampions] = useState()
	const cMCodeChampionRef = useRef()
	const [cMCodeChampionForce, setCMCodeChampionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [cMCodeCurrentMasteryLevel, setCMCodeCurrentMasteryLevel] = useState()
	const [cMCodeCurrentMasteryLevels, setCMCodeCurrentMasteryLevels] =
		useState()
	const cMCodeCurrentMasteryLevelRef = useRef()
	const [cMCodeCurrentMasteryLevelForce, setCMCodeCurrentMasteryLevelForce] =
		useState({
			menuIsOpen: false,
			forced: false,
		})

	const [cMCodeDesiredMasteryLevel, setCMCodeDesiredMasteryLevel] = useState()
	const [cMCodeDesiredMasteryLevels, setCMCodeDesiredMasteryLevels] =
		useState()
	const cMCodeDesiredMasteryLevelRef = useRef()
	const [cMCodeDesiredMasteryLevelForce, setCMCodeDesiredMasteryLevelForce] =
		useState({
			menuIsOpen: false,
			forced: false,
		})

	const [cMCodeToken, setCMCodeToken] = useState()
	const [cMCodeTokens, setCMCodeTokens] = useState()
	const cMCodeTokenRef = useRef()
	const [cMCodeTokenForce, setCMCodeTokenForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [cMCodeGameRegion, setCMCodeGameRegion] = useState()
	const [cMCodeGameRegions, setCMCodeGameRegions] = useState()
	const cMCodeGameRegionRef = useRef()
	const [cMCodeGameRegionForce, setCMCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [cMCodePriceBeforePromoCode, setCMCodePriceBeforePromoCode] =
		useState()

	const [cMCodeVipPercentage, setCMCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [cMCodeVipOptions, setCMCodeVipOptions] = useState([])

	const [cMCodeFlashLocationIsOpen, setCMCodeFlashLocationIsOpen] =
		useState(false)
	const [cMCodeFlashLocation, setCMCodeFlashLocation] = useState("")
	const [cMCodeFlashLocationActive, setCMCodeFlashLocationActive] =
		useState(false)
	const cMCodeResetFlashLocation = () => {}
	const cMCodeCancelFlashLocation = (item) => {
		setCMCodeFlashLocationIsOpen(false)
		setCMCodeFlashLocationActive(false)
		document.body.style.overflow = "auto"
		document.getElementsByClassName(
			"flash_ref_" + cMCode
		)[0].checked = false
	}
	const cMCodeApplyFlashLocation = () => {
		if (cMCodeFlashLocation && cMCodeFlashLocation !== "") {
			setCMCodeFlashLocationIsOpen(false)
			setCMCodeFlashLocationActive(true)
			document.body.style.overflow = "auto"
		} else {
			Toast.fire({
				icon: "error",
				title: "Please select flash location.",
			})
		}
	}

	const [cMCodePromoCode, setCMCodePromoCode] = useState("")
	const [cMCodePromoCodePercentage, setCMCodePromoCodePercentage] = useState()
	const [cMCodePromoCodeClass, setCMCodePromoCodeClass] = useState("")
	const [cMCodeApplyButton, setCMCodeApplyButton] = useState("Apply")
	const [cMCodeApplyButtonClass, setCMCodeApplyButtonClass] = useState()
	const cMCodePromoCodeRef = useRef()
	const cMCodeApplyPromoCode = () => {
		setCMCodePromoCodePercentage(0)
		if (
			cMCodePromoCode &&
			cMCodePromoCode.length &&
			cMCodeApplyButton === "Apply"
		) {
			setCMCodePromoCodeClass(" forced")
			setCMCodeApplyButtonClass(" loading")
			setCMCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/LeagueOfLegends/promocode", {
					promocode: cMCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setCMCodePromoCodePercentage(data.percentage)
						setCMCodePromoCodeClass(" success")
					} else {
						setCMCodePromoCodeClass(" error")
						setCMCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setCMCodePromoCodeClass(" error")
					setCMCodePromoCodePercentage(0)
				})
				.finally(() => {
					setCMCodeApplyButtonClass("")
					setCMCodeApplyButton("Apply")
				})
		} else {
			cMCodePromoCodeRef.current.focus()
			setCMCodePromoCodeClass(" forced")
		}
	}
	const cMCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			cMCodeApplyPromoCode()
		}
	}

	const [cMCodeRequestToPay, setCMCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [cMCodePrice, setCMCodePrice] = useState(0)

	const cMCodeCustomFunctions = {
		flash: (e) => {
			if (e.target.checked) {
				setCMCodeFlashLocationIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				cMCodeCancelFlashLocation(
					cMCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "flash"
					)[0]
				)
			}
		},
	}

	useEffect(() => {
		if (cMCodeFirstLoaded) {
			setCMCodeDesiredMasteryLevels(
				cMCodeFirstData.champions_level.filter(
					(item) => item.level > cMCodeCurrentMasteryLevel.level
				)
			)
			if (
				cMCodeCurrentMasteryLevel &&
				cMCodeDesiredMasteryLevel &&
				cMCodeDesiredMasteryLevel.level <=
					cMCodeCurrentMasteryLevel.level
			) {
				let oldDesired = cMCodeDesiredMasteryLevel
				setCMCodeDesiredMasteryLevel(null)
				if (
					cMCodeFirstData.champions_level
						.filter(
							(item) =>
								item.level > cMCodeCurrentMasteryLevel.level
						)
						.filter((item) => item.level === oldDesired.level)
						.length
				) {
					setCMCodeDesiredMasteryLevel(oldDesired)
				} else {
					setCMCodeDesiredMasteryLevel(
						cMCodeFirstData.champions_level.filter(
							(item) =>
								item.level > cMCodeCurrentMasteryLevel.level
						)[0]
					)
				}
			}
			if (
				cMCodeCurrentMasteryLevel &&
				cMCodeDesiredMasteryLevel &&
				cMCodeDesiredMasteryLevel.level >=
					cMCodeCurrentMasteryLevel.level
			) {
				const tokens = LeagueOfLegendsApi.champions_level
					.filter(
						(item) => item.value === cMCodeCurrentMasteryLevel.value
					)[0]
					.tokens.filter((item) => item.label.toString() !== "0")
					.map((item) => {
						if (
							cMCodeCurrentMasteryLevel.level.toString() ===
								"5" &&
							cMCodeDesiredMasteryLevel.level.toString() === "7"
						) {
							if (item.label.toString() === "1") {
								return { label: 4, value: item.value }
							} else if (item.label.toString() === "2") {
								return { label: 5, value: item.value }
							}
						} else {
							return item
						}
					})
				setCMCodeTokens(tokens)
				tokens.length ? setCMCodeToken(tokens[0]) : setCMCodeToken(null)
			}
		}
	}, [
		cMCodeCurrentMasteryLevel,
		cMCodeDesiredMasteryLevel,
		cMCodeFirstLoaded,
	])

	useEffect(() => {
		if (cMCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (cMCodeCurrentMasteryLevel && cMCodeDesiredMasteryLevel) {
				cMCodeFirstData.champions_level
					.filter(
						(item) =>
							item.value >= cMCodeCurrentMasteryLevel.value &&
							item.value < cMCodeDesiredMasteryLevel.value
					)
					.map((item) => {
						item.tokens.map((items) => {
							if (items.label.toString() === "0") {
								price += items.price
							} else if (
								parseInt(cMCodeCurrentMasteryLevel.level) >=
									5 &&
								parseInt(cMCodeDesiredMasteryLevel.level) <= 7
							) {
								if (
									parseInt(
										cMCodeCurrentMasteryLevel.level
									) === 5 &&
									parseInt(
										cMCodeDesiredMasteryLevel.level
									) === 6 &&
									item.level === 5 &&
									parseInt(items.label) <=
										parseInt(cMCodeToken.label)
								) {
									price += items.price
								} else if (
									parseInt(
										cMCodeCurrentMasteryLevel.level
									) === 6 &&
									parseInt(
										cMCodeDesiredMasteryLevel.level
									) === 7 &&
									item.level === 6 &&
									cMCodeToken &&
									parseInt(items.label) <=
										parseInt(cMCodeToken.label)
								) {
									price += items.price
								} else if (
									parseInt(
										cMCodeCurrentMasteryLevel.level
									) === 5 &&
									parseInt(
										cMCodeDesiredMasteryLevel.level
									) === 7 &&
									cMCodeToken &&
									((item.level === 5 &&
										parseInt(items.label) + 3 <=
											parseInt(cMCodeToken.label)) ||
										item.level === 6)
								) {
									price += items.price
								}
							} else {
								price += items.price
							}
						})
					})
			}

			if (cMCodeVipPercentage) {
				add_price = add_price + (price / 100) * cMCodeVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			if (cMCodeFlashLocationActive) {
				add_price =
					add_price +
					(price / 100) *
						cMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0].percentage
			}

			price = price + add_price

			if (cMCodePromoCodePercentage) {
				setCMCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * cMCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setCMCodePrice(price)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		cMCodeVipPercentage,
		cMCodePromoCodePercentage,
		cMCodeFlashLocationActive,
		cMCodeCurrentMasteryLevel,
		cMCodeDesiredMasteryLevel,
		cMCodeToken,
		cMCodeFirstLoaded,
		vipPercentage,
	])

	useEffect(() => {
		if (cMCodeRequestToPay) {
			let error = 0
			if (cMCodeChampion && cMCodeChampion.length !== 0) {
				setCMCodeChampionForce({ menuIsOpen: false, forced: false })
			} else {
				setCMCodeChampionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (cMCodeGameRegion && cMCodeGameRegion.length !== 0) {
				setCMCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setCMCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				cMCodeCurrentMasteryLevel &&
				cMCodeCurrentMasteryLevel.length !== 0
			) {
				setCMCodeCurrentMasteryLevelForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setCMCodeCurrentMasteryLevelForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				cMCodeDesiredMasteryLevel &&
				cMCodeDesiredMasteryLevel.length !== 0
			) {
				setCMCodeDesiredMasteryLevelForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setCMCodeDesiredMasteryLevelForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				(cMCodeToken && cMCodeToken.length !== 0) ||
				cMCodeCurrentMasteryLevel.level < 5
			) {
				setCMCodeTokenForce({ menuIsOpen: false, forced: false })
			} else {
				setCMCodeTokenForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [
		cMCodeChampion,
		cMCodeGameRegion,
		cMCodeCurrentMasteryLevel,
		cMCodeDesiredMasteryLevel,
		cMCodeToken,
		cMCodeRequestToPay,
	])

	useEffect(() => {
		if (!cMCodeFirstLoaded) {
			let data = LeagueOfLegendsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.normal_matches === 1),
			}
			setCMCodeFirstData(data)

			setCMCodeGameRegions(data.regions)

			setCMCodeChampions(data.champions)

			setCMCodeCurrentMasteryLevels(
				data.champions_level.filter((item) => item.level < 7)
			)
			setCMCodeCurrentMasteryLevel(
				data.champions_level.filter((item) => item.level === 4)[0]
			)

			setCMCodeDesiredMasteryLevels(
				data.champions_level.filter((item) => item.level > 5)
			)
			setCMCodeDesiredMasteryLevel(
				data.champions_level.filter((item) => item.level === 7)[0]
			)

			setCMCodePrice((0).toFixed(2))

			setCMCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const cMCodeCheckPurchase = () => {
		setCMCodeRequestToPay(true)
		let error = 0
		if (cMCodeChampion === undefined || cMCodeChampion.length === 0) {
			if (!error) {
				cMCodeChampionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setCMCodeChampionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (cMCodeGameRegion === undefined || cMCodeGameRegion.length === 0) {
			if (!error) {
				cMCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setCMCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			cMCodeCurrentMasteryLevel === undefined ||
			cMCodeCurrentMasteryLevel.length === 0
		) {
			if (!error) {
				cMCodeCurrentMasteryLevelRef.current.select.controlRef.scrollIntoView(
					{
						behavior: "smooth",
						block: "center",
						inline: "nearest",
					}
				)
			}
			setCMCodeCurrentMasteryLevel({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			cMCodeDesiredMasteryLevel === undefined ||
			cMCodeDesiredMasteryLevel.length === 0
		) {
			if (!error) {
				cMCodeDesiredMasteryLevelRef.current.select.controlRef.scrollIntoView(
					{
						behavior: "smooth",
						block: "center",
						inline: "nearest",
					}
				)
			}
			setCMCodeDesiredMasteryLevel({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!cMCodeToken && cMCodeCurrentMasteryLevel.level > 5) {
			if (!error) {
				cMCodeTokenRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setCMCodeToken({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setCMCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const cMCodePurchase = () => {
		if (cMCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/LeagueOfLegends/cMCode/makePurchase", {
					code: cMCode,
					champion: cMCodeChampion.value,
					currentMastery: cMCodeCurrentMasteryLevel.value,
					desiredMastery: cMCodeDesiredMasteryLevel.value,
					token: cMCodeToken ? cMCodeToken.value : null,
					gameRegion: cMCodeGameRegion.value,
					flashLocation: cMCodeFlashLocation
						? cMCodeFlashLocation
						: null,
					vipOptions: cMCodeVipOptions,
					promoCode: cMCodePromoCode ? cMCodePromoCode : null,
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
				isOpen={cMCodeFlashLocationIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={cMCodeResetFlashLocation}
				onRequestClose={() =>
					cMCodeCancelFlashLocation(
						cMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{cMCodeFirstLoaded ? (
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
											(cMCodeFlashLocation === "D"
												? "selected"
												: "")
										}
										onClick={() => {
											setCMCodeFlashLocation("D")
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
											(cMCodeFlashLocation === "F"
												? "selected"
												: "")
										}
										onClick={() => {
											setCMCodeFlashLocation("F")
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
										cMCodeCancelFlashLocation(
											cMCodeFirstData.vip.filter(
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
									onClick={cMCodeApplyFlashLocation}
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
					<div className="col-lg-6 col-md-6 col-12">
						{cMCodeFirstLoaded ? (
							<Select
								ref={cMCodeChampionRef}
								menuIsOpen={cMCodeChampionForce.menuIsOpen}
								onMenuOpen={() =>
									setCMCodeChampionForce(
										(prevCMCodeChampionForce) => {
											return {
												...prevCMCodeChampionForce,
												menuIsOpen:
													!prevCMCodeChampionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCMCodeChampionForce(
										(prevCMCodeChampionForce) => {
											return {
												...prevCMCodeChampionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								placeholder="Champion"
								onChange={(e) => {
									setCMCodeChampion(e)
								}}
								options={cMCodeChampions}
								value={cMCodeChampion}
								closeMenuOnSelect={false}
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
					<div className="col-lg-6 col-md-6 col-12">
						{cMCodeFirstLoaded ? (
							<Select
								ref={cMCodeGameRegionRef}
								menuIsOpen={cMCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setCMCodeGameRegionForce(
										(prevCMCodeGameRegionForce) => {
											return {
												...prevCMCodeGameRegionForce,
												menuIsOpen:
													!prevCMCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCMCodeGameRegionForce(
										(prevCMCodeGameRegionForce) => {
											return {
												...prevCMCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									cMCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setCMCodeGameRegion(
										cMCodeGameRegions[
											objSearch(
												cMCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={cMCodeGameRegions}
								value={cMCodeGameRegion}
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
					<div className="col-lg-2 pt-md-30 col-md-12 col-12 pt-sm-10 text-lg-right">
						<label>Your Mastery:</label>
					</div>
					<div className="col-lg-3 col-md-4 col-12">
						{cMCodeFirstLoaded ? (
							<Select
								ref={cMCodeCurrentMasteryLevelRef}
								menuIsOpen={
									cMCodeCurrentMasteryLevelForce.menuIsOpen
								}
								onMenuOpen={() =>
									setCMCodeCurrentMasteryLevelForce(
										(
											prevcMCodeCurrentMasteryLevelForce
										) => {
											return {
												...prevcMCodeCurrentMasteryLevelForce,
												menuIsOpen:
													!prevcMCodeCurrentMasteryLevelForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCMCodeCurrentMasteryLevelForce(
										(
											prevcMCodeCurrentMasteryLevelForce
										) => {
											return {
												...prevcMCodeCurrentMasteryLevelForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									cMCodeCurrentMasteryLevelForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Current Mastery"
								onChange={(e) => {
									setCMCodeCurrentMasteryLevel(
										cMCodeCurrentMasteryLevels[
											objSearch(
												cMCodeCurrentMasteryLevels,
												"value",
												e.value
											)
										]
									)
								}}
								options={cMCodeCurrentMasteryLevels}
								value={cMCodeCurrentMasteryLevel}
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
					<div className="col-lg-3 col-md-4 col-12">
						{cMCodeFirstLoaded ? (
							<Select
								ref={cMCodeDesiredMasteryLevelRef}
								menuIsOpen={
									cMCodeDesiredMasteryLevelForce.menuIsOpen
								}
								onMenuOpen={() =>
									setCMCodeDesiredMasteryLevelForce(
										(
											prevcMCodeDesiredMasteryLevelForce
										) => {
											return {
												...prevcMCodeDesiredMasteryLevelForce,
												menuIsOpen:
													!prevcMCodeDesiredMasteryLevelForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCMCodeDesiredMasteryLevelForce(
										(
											prevcMCodeDesiredMasteryLevelForce
										) => {
											return {
												...prevcMCodeDesiredMasteryLevelForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									cMCodeDesiredMasteryLevelForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Desired Mastery"
								onChange={(e) => {
									setCMCodeDesiredMasteryLevel(
										cMCodeDesiredMasteryLevels[
											objSearch(
												cMCodeDesiredMasteryLevels,
												"value",
												e.value
											)
										]
									)
								}}
								options={cMCodeDesiredMasteryLevels}
								value={cMCodeDesiredMasteryLevel}
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
					<div className="col-lg-3 col-md-4 col-12">
						{cMCodeFirstLoaded ? (
							<Select
								isDisabled={cMCodeTokens === null}
								ref={cMCodeTokenRef}
								menuIsOpen={cMCodeTokenForce.menuIsOpen}
								onMenuOpen={() =>
									setCMCodeTokenForce(
										(prevcMCodeTokenForce) => {
											return {
												...prevcMCodeTokenForce,
												menuIsOpen:
													!prevcMCodeTokenForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCMCodeTokenForce(
										(prevcMCodeTokenForce) => {
											return {
												...prevcMCodeTokenForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									cMCodeTokenForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Tokens left"
								onChange={(e) => {
									setCMCodeToken(
										cMCodeTokens[
											objSearch(
												cMCodeTokens,
												"value",
												e.value
											)
										]
									)
								}}
								options={cMCodeTokens}
								value={cMCodeToken}
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
							ref={cMCodePromoCodeRef}
							className={
								"form-control text-center" +
								cMCodePromoCodeClass
							}
							onChange={(e) => setCMCodePromoCode(e.target.value)}
							value={cMCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={cMCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={cMCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								cMCodeApplyButtonClass
							}
						>
							<span>{cMCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{cMCodeFirstLoaded &&
			cMCodeFirstData.vip &&
			cMCodeFirstData.vip &&
			cMCodeFirstData.vip.filter(
				(item) => item.boost_id === cMCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{cMCodeFirstLoaded ? (
							cMCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === cMCode ||
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
															setCMCodeVipOptions(
																(
																	prevCMCodeVipOptions
																) => {
																	return [
																		...prevCMCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setCMCodeVipOptions(
																cMCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setCMCodeVipPercentage(
																(
																	prevCMCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevCMCodeVipPercentage +
																				item.percentage
																		: prevCMCodeVipPercentage -
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
															cMCodeCustomFunctions[
																item.custom
															]
														) {
															cMCodeCustomFunctions[
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
															  cMCode
															: "")
													}
													id={
														item.value +
														"-cMCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-cMCode-checkbox-id"
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
					{"Total Cost"}
					<span
						className="nk-product-price"
						style={{ color: "#48ac55", fontSize: "50px" }}
					>
						<label>
							{cMCodePrice} &euro;
							{cMCodePromoCodePercentage &&
							cMCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{cMCodePriceBeforePromoCode} &euro;
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
							onClick={cMCodePurchase}
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

export default ChampionMastery

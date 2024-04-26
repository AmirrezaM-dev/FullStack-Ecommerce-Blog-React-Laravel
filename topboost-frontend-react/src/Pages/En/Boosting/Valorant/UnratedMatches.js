/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import Modal from "react-modal"
import { useHistory } from "react-router-dom"
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Unrated = () => {
	const uMCode = 4
	let history = useHistory()

	const {
		Toast,
		objSearch,
		customStyles,
		api,
		ValorantApi,
		LoadingSelect,
		LoadingCheckbox,
	} = useContexts()

	const [uMCodeFirstLoaded, setUMCodeFirstLoaded] = useState(false)
	const [uMCodeFirstData, setUMCodeFirstData] = useState()

	const [uMCodeGameRegion, setUMCodeGameRegion] = useState()
	const [uMCodeGameRegions, setUMCodeGameRegions] = useState()
	const uMCodeGameRegionRef = useRef()
	const [uMCodeGameRegionForce, setUMCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [uMCodeNumberOfGame, setUMCodeNumberOfGame] = useState()
	const uMCodeNumberOfGames = [
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
	const uMCodeNumberOfGameRef = useRef()
	const [uMCodeNumberOfGameForce, setUMCodeNumberOfGameForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [uMCodeTypeOfService, setUMCodeTypeOfService] = useState()
	const [uMCodeTypeOfServices, setUMCodeTypeOfServices] = useState()
	const uMCodeTypeOfServiceRef = useRef()
	const [uMCodeTypeOfServiceForce, setUMCodeTypeOfServiceForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [uMCodeTypeOfServiceClassName, setUMCodeTypeOfServiceClassName] =
		useState("col-md-6")

	const [uMCodeAgents, setUMCodeAgents] = useState()
	const [uMCodeAgent, setUMCodeAgent] = useState([])
	const [uMCodeOnlyOneAgent, setUMCodeOnlyOneAgent] = useState(false)
	const [uMCodeSpecificIsOpen, setUMCodeSpecificIsOpen] = useState()
	const uMCodeResetSpecific = () => {}
	const uMCodeCancelSpecific = (item) => {
		setUMCodeSpecificIsOpen(false)
		setUMCodeAgent(null)
		document.body.style.overflow = "auto"
		document.getElementsByClassName("specific_" + uMCode)[0].checked = false
	}
	const uMCodeApplySpecific = () => {
		let error = 0
		if (
			(!uMCodeAgent ||
				uMCodeAgent === null ||
				uMCodeAgent.length < (uMCodeOnlyOneAgent ? 1 : 3)) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(uMCodeOnlyOneAgent ? 1 : 3) +
					" agent for the first role !",
			})
			error = 1
		}
		if (error === 0) {
			setUMCodeSpecificIsOpen(false)
			document.body.style.overflow = "auto"
			document.getElementsByClassName(
				"specific_" + uMCode
			)[0].checked = true
		}
	}
	const uMCodeCustomFunctions = {
		specific: (e) => {
			if (e.target.checked) {
				setUMCodeSpecificIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				uMCodeCancelSpecific(
					uMCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "specific"
					)[0]
				)
			}
		},
	}

	const [uMCodePopOverContent, setUMCodePopOverContent] = useState()
	const [uMCodeIsPopoverOpen, setUMCodeIsPopoverOpen] = useState(false)
	if (uMCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setUMCodeIsPopoverOpen(false)
		})
	}
	const [uMCodeTypeOfDuo, setUMCodeTypeOfDuo] = useState()
	const [uMCodeTypeOfDuos, setUMCodeTypeOfDuos] = useState()
	const uMCodeTypeOfDuoRef = useRef()
	const [uMCodeTypeOfDuoForce, setUMCodeTypeOfDuoForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [uMCodeTypeOfDuoClassName, setUMCodeTypeOfSDuolassName] =
		useState("d-none")
	useEffect(() => {
		if (uMCodeTypeOfService) {
			setUMCodeTypeOfServiceClassName(
				uMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "col-md-6"
			)
			setUMCodeTypeOfSDuolassName(
				uMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "d-none"
			)
		}
	}, [uMCodeTypeOfService])

	const [uMCodePriceBeforePromoCode, setUMCodePriceBeforePromoCode] =
		useState()

	const [uMCodeVipPercentage, setUMCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [uMCodeVipOptions, setUMCodeVipOptions] = useState([])

	const [uMCodePromoCode, setUMCodePromoCode] = useState("")
	const [uMCodePromoCodePercentage, setUMCodePromoCodePercentage] = useState()
	const [uMCodePromoCodeClass, setUMCodePromoCodeClass] = useState("")
	const [uMCodeApplyButton, setUMCodeApplyButton] = useState("Apply")
	const [uMCodeApplyButtonClass, setUMCodeApplyButtonClass] = useState()
	const uMCodePromoCodeRef = useRef()
	const uMCodeApplyPromoCode = () => {
		setUMCodePromoCodePercentage(0)
		if (
			uMCodePromoCode &&
			uMCodePromoCode.length &&
			uMCodeApplyButton === "Apply"
		) {
			setUMCodePromoCodeClass(" forced")
			setUMCodeApplyButtonClass(" loading")
			setUMCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/Valorant/promocode", {
					promocode: uMCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setUMCodePromoCodePercentage(data.percentage)
						setUMCodePromoCodeClass(" success")
					} else {
						setUMCodePromoCodeClass(" error")
						setUMCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setUMCodePromoCodeClass(" error")
					setUMCodePromoCodePercentage(0)
				})
				.finally(() => {
					setUMCodeApplyButtonClass("")
					setUMCodeApplyButton("Apply")
				})
		} else {
			uMCodePromoCodeRef.current.focus()
			setUMCodePromoCodeClass(" forced")
		}
	}
	const uMCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			uMCodeApplyPromoCode()
		}
	}

	const [uMCodeRequestToPay, setUMCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [uMCodePrice, setUMCodePrice] = useState(0)

	useEffect(() => {
		if (uMCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (uMCodeNumberOfGame) {
				price =
					uMCodeFirstData.ranks
						.filter((item) => item.level === 0)[0]
						.divisions.filter((item) => item.level === 4)[0]
						.unrated_price * uMCodeNumberOfGame.value
			}

			if (uMCodeTypeOfService) {
				add_price =
					add_price + (price / 100) * uMCodeTypeOfService.percentage
				if (
					uMCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
					-1
				) {
					if (vipPercentage) {
						add_price = add_price + (price / 100) * vipPercentage
					}
				}
			} else {
				if (vipPercentage) {
					add_price = add_price + (price / 100) * vipPercentage
				}
			}

			if (
				uMCodeTypeOfDuo &&
				uMCodeTypeOfService &&
				uMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
			) {
				add_price =
					add_price + (price / 100) * uMCodeTypeOfDuo.percentage
			}

			if (
				uMCodeAgent &&
				uMCodeAgent.length &&
				((uMCodeTypeOfService &&
					uMCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
						-1) ||
					!uMCodeTypeOfService)
			) {
				add_price =
					add_price +
					(price / 100) *
						(!uMCodeOnlyOneAgent
							? uMCodeFirstData.vip.filter(
									(item) =>
										item.custom.toLowerCase() === "specific"
							  )[0].percentage
							: uMCodeFirstData.vip.filter(
									(item) =>
										item.custom.toLowerCase() === "specific"
							  )[0].percentage * 2)
			}

			if (uMCodeVipPercentage) {
				add_price = add_price + (price / 100) * uMCodeVipPercentage
			}

			price = price + add_price

			if (uMCodePromoCodePercentage) {
				setUMCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * uMCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setUMCodePrice(price)
		}
	}, [
		uMCodeNumberOfGame,
		uMCodeVipPercentage,
		uMCodePromoCodePercentage,
		uMCodeTypeOfService,
		uMCodeTypeOfDuo,
		uMCodeAgent,
		uMCodeOnlyOneAgent,
		vipPercentage,
	])

	useEffect(() => {
		if (uMCodeTypeOfDuo) {
			setUMCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						uMCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === uMCode &&
								item.value === uMCodeTypeOfDuo.value
						)[0].contents
					).map((item) => {
						return (
							<li className="li-features">
								<FontAwesomeIcon
									icon={faCheck}
									className="text-success mr-5"
								/>
								{item}
							</li>
						)
					})}
				</ul>
			)
		}
	}, [uMCodeTypeOfDuo])

	useEffect(() => {
		if (uMCodeRequestToPay) {
			let error = 0
			if (uMCodeNumberOfGame && uMCodeNumberOfGame.length !== 0) {
				setUMCodeNumberOfGameForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setUMCodeNumberOfGameForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (uMCodeGameRegion && uMCodeGameRegion.length !== 0) {
				setUMCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setUMCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (uMCodeTypeOfService && uMCodeTypeOfService.length !== 0) {
				setUMCodeTypeOfServiceForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setUMCodeTypeOfServiceForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				uMCodeTypeOfService &&
				uMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1 &&
				uMCodeTypeOfDuo &&
				uMCodeTypeOfDuo.length !== 0
			) {
				setUMCodeTypeOfDuoForce({ menuIsOpen: false, forced: false })
			} else {
				setUMCodeTypeOfDuoForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [
		uMCodeGameRegion,
		uMCodeNumberOfGame,
		uMCodeTypeOfService,
		uMCodeTypeOfDuo,
	])

	useEffect(() => {
		if (!uMCodeFirstLoaded) {
			let data = ValorantApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.unrated_matches === 1),
			}

			setUMCodeFirstData(data)

			setUMCodeGameRegions(data.regions)

			setUMCodeAgents(data.agents)

			setUMCodeTypeOfServices(
				data.typeofservice.filter(
					(item) => item.boost_id === uMCode || item.boost_id === null
				)
			)

			setUMCodeTypeOfDuos(
				data.typeofcustom.filter(
					(item) => item.boost_id === uMCode || item.boost_id === null
				)
			)

			setUMCodePrice((0).toFixed(2))

			setUMCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const uMCodeCheckPurchase = () => {
		setUMCodeRequestToPay(true)
		let error = 0
		if (
			uMCodeNumberOfGame === undefined ||
			uMCodeNumberOfGame.length === 0
		) {
			if (!error) {
				uMCodeNumberOfGameRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setUMCodeNumberOfGameForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (uMCodeGameRegion === undefined || uMCodeGameRegion.length === 0) {
			if (!error) {
				uMCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setUMCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			uMCodeTypeOfService === undefined ||
			uMCodeTypeOfService.length === 0
		) {
			if (!error) {
				uMCodeTypeOfServiceRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setUMCodeTypeOfServiceForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			(uMCodeTypeOfService &&
				uMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1 &&
				!uMCodeTypeOfDuo) ||
			(uMCodeTypeOfDuo && uMCodeTypeOfDuo.length === 0)
		) {
			if (!error) {
				uMCodeTypeOfDuoRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setUMCodeTypeOfDuoForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setUMCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const uMCodePurchase = () => {
		if (uMCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/Valorant/uMCode/makePurchase", {
					code: uMCode,
					numberOfGames: uMCodeNumberOfGame.value,
					gameRegion: uMCodeGameRegion.value,
					typeOfService: uMCodeTypeOfService.value,
					agents: uMCodeAgent ? uMCodeAgent : null,
					onlyOneAgent: uMCodeOnlyOneAgent
						? uMCodeOnlyOneAgent
						: false,
					typeOfCustom: uMCodeTypeOfDuo
						? uMCodeTypeOfDuo.value
						: null,
					vipOptions: uMCodeVipOptions,
					promoCode: uMCodePromoCode ? uMCodePromoCode : null,
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
				isOpen={uMCodeSpecificIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={uMCodeResetSpecific}
				onRequestClose={() =>
					uMCodeCancelSpecific(
						uMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{uMCodeFirstLoaded ? (
					<>
						<div className="vip-modal">
							<h2 className="col-12 vip-modal-header">
								Select your agents (
								{
									uMCodeFirstData.vip.filter(
										(item) =>
											item.custom.toLowerCase() ===
											"specific"
									)[0].percentage
								}
								%) <span className="free-label">OPTIONAL</span>
							</h2>
							<div className="row vertical-gap pl-10 pr-10">
								<div className="col-12">
									<Select
										placeholder="Select Agent"
										onChange={(e) => {
											setUMCodeAgent(e)
										}}
										options={uMCodeAgents}
										value={uMCodeAgent}
										isMulti
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
								</div>
								<div className="col-12 pt-10 pb-10">
									<div className="custom-control custom-checkbox">
										<input
											onChange={(e) =>
												setUMCodeOnlyOneAgent(
													e.target.checked
												)
											}
											type="checkbox"
											className="custom-control-input"
											id={"onlyOneAgent-checkbox-id"}
											checked={uMCodeOnlyOneAgent}
										/>
										<label
											className="custom-control-label"
											htmlFor={"onlyOneAgent-checkbox-id"}
										>
											Select only 1 agent (+
											{
												uMCodeFirstData.vip.filter(
													(item) =>
														item.custom.toLowerCase() ===
														"specific"
												)[0].percentage
											}
											%)
										</label>
									</div>
								</div>
							</div>
							<div className="nk-gap-2" />
							<div className="row vertical-gap pl-10 pr-10">
								<div className="col-4 ml-auto">
									<button
										className="save-btn cancel"
										onClick={() =>
											uMCodeCancelSpecific(
												uMCodeFirstData.vip.filter(
													(item) =>
														item.custom.toLowerCase() ===
														"specific"
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
										onClick={uMCodeApplySpecific}
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</>
				) : (
					<></>
				)}
				<div className="nk-gap-2" />
			</Modal>
			<div className="col-md-12">
				<div className="row vertical-gap">
					<div className="col-md-6">
						{uMCodeFirstLoaded ? (
							<Select
								ref={uMCodeNumberOfGameRef}
								menuIsOpen={uMCodeNumberOfGameForce.menuIsOpen}
								onMenuOpen={() =>
									setUMCodeNumberOfGameForce(
										(prevUMCodeNumberOfGameForce) => {
											return {
												...prevUMCodeNumberOfGameForce,
												menuIsOpen:
													!prevUMCodeNumberOfGameForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setUMCodeNumberOfGameForce(
										(prevUMCodeNumberOfGameForce) => {
											return {
												...prevUMCodeNumberOfGameForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									uMCodeNumberOfGameForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Number of games"
								onChange={(e) => {
									setUMCodeNumberOfGame(
										uMCodeNumberOfGames[
											objSearch(
												uMCodeNumberOfGames,
												"value",
												e.value
											)
										]
									)
								}}
								options={uMCodeNumberOfGames}
								value={uMCodeNumberOfGame}
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
					<div className="col-md-6">
						{uMCodeFirstLoaded ? (
							<Select
								ref={uMCodeGameRegionRef}
								menuIsOpen={uMCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setUMCodeGameRegionForce(
										(prevUMCodeGameRegionForce) => {
											return {
												...prevUMCodeGameRegionForce,
												menuIsOpen:
													!prevUMCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setUMCodeGameRegionForce(
										(prevUMCodeGameRegionForce) => {
											return {
												...prevUMCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									uMCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setUMCodeGameRegion(
										uMCodeGameRegions[
											objSearch(
												uMCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={uMCodeGameRegions}
								value={uMCodeGameRegion}
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
					<div className={uMCodeTypeOfServiceClassName}>
						{uMCodeFirstLoaded ? (
							<Select
								ref={uMCodeTypeOfServiceRef}
								menuIsOpen={uMCodeTypeOfServiceForce.menuIsOpen}
								onMenuOpen={() =>
									setUMCodeTypeOfServiceForce(
										(prevUMCodeTypeOfServiceForce) => {
											return {
												...prevUMCodeTypeOfServiceForce,
												menuIsOpen:
													!prevUMCodeTypeOfServiceForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setUMCodeTypeOfServiceForce(
										(prevUMCodeTypeOfServiceForce) => {
											return {
												...prevUMCodeTypeOfServiceForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									uMCodeTypeOfServiceForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of service"
								onChange={(e) => {
									setUMCodeTypeOfService(
										uMCodeTypeOfServices[
											objSearch(
												uMCodeTypeOfServices,
												"value",
												e.value
											)
										]
									)
								}}
								options={uMCodeTypeOfServices}
								value={uMCodeTypeOfService}
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
					<div className={uMCodeTypeOfDuoClassName}>
						{uMCodeFirstLoaded ? (
							<>
								<Select
									id="uMCodePopoverTarget"
									ref={uMCodeTypeOfDuoRef}
									menuIsOpen={uMCodeTypeOfDuoForce.menuIsOpen}
									onMenuOpen={() =>
										setUMCodeTypeOfDuoForce(
											(prevUMCodeTypeOfDuoForce) => {
												return {
													...prevUMCodeTypeOfDuoForce,
													menuIsOpen:
														!prevUMCodeTypeOfDuoForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setUMCodeTypeOfDuoForce(
											(prevUMCodeTypeOfDuoForce) => {
												return {
													...prevUMCodeTypeOfDuoForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										uMCodeTypeOfDuoForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of duo"
									onChange={(e) => {
										setUMCodeTypeOfDuo(
											uMCodeTypeOfDuos[
												objSearch(
													uMCodeTypeOfDuos,
													"value",
													e.value
												)
											]
										)
										setUMCodeIsPopoverOpen(true)
									}}
									options={uMCodeTypeOfDuos}
									value={uMCodeTypeOfDuo}
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
								<UncontrolledPopover
									isOpen={uMCodeIsPopoverOpen}
									placement="right"
									target="uMCodePopoverTarget"
								>
									<PopoverHeader>
										{uMCodeTypeOfDuo
											? uMCodeTypeOfDuo.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{uMCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={uMCodePromoCodeRef}
							className={
								"form-control text-center" +
								uMCodePromoCodeClass
							}
							onChange={(e) => setUMCodePromoCode(e.target.value)}
							value={uMCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={uMCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={uMCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								uMCodeApplyButtonClass
							}
						>
							<span>{uMCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{uMCodeFirstLoaded &&
			uMCodeFirstData.vip &&
			uMCodeFirstData.vip &&
			uMCodeFirstData.vip.filter(
				(item) => item.boost_id === uMCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{uMCodeFirstLoaded ? (
							uMCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === uMCode ||
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
													disabled={
														uMCodeTypeOfService !==
															undefined &&
														uMCodeTypeOfService.label
															.toLowerCase()
															.indexOf("duo") !==
															-1 &&
														item.custom !== ""
													}
													onChange={(e) => {
														if (e.target.checked) {
															setUMCodeVipOptions(
																(
																	prevUMCodeVipOptions
																) => {
																	return [
																		...prevUMCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setUMCodeVipOptions(
																uMCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setUMCodeVipPercentage(
																(
																	prevUMCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevUMCodeVipPercentage +
																				item.percentage
																		: prevUMCodeVipPercentage -
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
															uMCodeCustomFunctions[
																item.custom
															]
														) {
															uMCodeCustomFunctions[
																item.custom
															](e, item)
														}
													}}
													type="checkbox"
													className={
														"custom-control-input " +
														" " +
														(item.custom.length
															? item.custom +
															  "_ref_" +
															  uMCode
															: "") +
														" " +
														(item.custom.length
															? item.custom +
															  "_" +
															  uMCode
															: "")
													}
													id={
														item.value +
														"-uMCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-uMCode-checkbox-id"
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
							{uMCodePrice} &euro;
							{uMCodePromoCodePercentage &&
							uMCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{uMCodePriceBeforePromoCode} &euro;
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
							onClick={uMCodePurchase}
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

export default Unrated

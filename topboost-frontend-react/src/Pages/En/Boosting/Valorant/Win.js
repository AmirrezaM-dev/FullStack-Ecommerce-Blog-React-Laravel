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
import { ThemeProvider } from "react-bootstrap"

const Win = () => {
	const winCode = 3
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

	const [winCodeFirstLoaded, setWinCodeFirstLoaded] = useState(false)
	const [winCodeFirstData, setWinCodeFirstData] = useState()

	const [winCodeCurrentRanks, setWinCodeCurrentRanks] = useState([])
	const [winCodeCurrentRank, setWinCodeCurrentRank] = useState()

	const [winCodeCurrentDivisions, setWinCodeCurrentDivisions] = useState([])
	const [winCodeCurrentDivision, setWinCodeCurrentDivision] = useState()

	const [winCodeCurrentIcon, setWinCodeCurrentIcon] = useState()

	const [winCodeGameRegion, setWinCodeGameRegion] = useState()
	const [winCodeGameRegions, setWinCodeGameRegions] = useState()
	const winCodeGameRegionRef = useRef()
	const [winCodeGameRegionForce, setWinCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [winCodeNumberOfGame, setWinCodeNumberOfGame] = useState()
	const winCodeNumberOfGames = [
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
	const winCodeNumberOfGameRef = useRef()
	const [winCodeNumberOfGameForce, setWinCodeNumberOfGameForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [winCodeTypeOfService, setWinCodeTypeOfService] = useState()
	const [winCodeTypeOfServices, setWinCodeTypeOfServices] = useState()
	const winCodeTypeOfServiceRef = useRef()
	const [winCodeTypeOfServiceForce, setWinCodeTypeOfServiceForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [winCodeTypeOfServiceClassName, setWinCodeTypeOfServiceClassName] =
		useState("col-md-6")

	const [winCodePopOverContent, setWinCodePopOverContent] = useState()
	const [winCodeIsPopoverOpen, setWinCodeIsPopoverOpen] = useState(false)
	if (winCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setWinCodeIsPopoverOpen(false)
		})
	}
	const [winCodeTypeOfDuo, setWinCodeTypeOfDuo] = useState()
	const [winCodeTypeOfDuos, setWinCodeTypeOfDuos] = useState()
	const winCodeTypeOfDuoRef = useRef()
	const [winCodeTypeOfDuoForce, setWinCodeTypeOfDuoForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [winCodeTypeOfDuoClassName, setWinCodeTypeOfSDuolassName] =
		useState("d-none")
	useEffect(() => {
		if (winCodeTypeOfService) {
			setWinCodeTypeOfServiceClassName(
				winCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "col-md-6"
			)
			setWinCodeTypeOfSDuolassName(
				winCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "d-none"
			)
		}
	}, [winCodeTypeOfService])

	const [winCodeAgents, setWinCodeAgents] = useState()
	const [winCodeAgent, setWinCodeAgent] = useState([])
	const [winCodeOnlyOneAgent, setWinCodeOnlyOneAgent] = useState(false)
	const [winCodeSpecificIsOpen, setWinCodeSpecificIsOpen] = useState()
	const winCodeResetSpecific = () => {}
	const winCodeCancelSpecific = (item) => {
		setWinCodeSpecificIsOpen(false)
		setWinCodeAgent(null)
		document.body.style.overflow = "auto"
		document.getElementsByClassName(
			"specific_" + winCode
		)[0].checked = false
	}
	const winCodeApplySpecific = () => {
		let error = 0
		if (
			(!winCodeAgent ||
				winCodeAgent === null ||
				winCodeAgent.length < (winCodeOnlyOneAgent ? 1 : 3)) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(winCodeOnlyOneAgent ? 1 : 3) +
					" agent for the first role !",
			})
			error = 1
		}
		if (error === 0) {
			setWinCodeSpecificIsOpen(false)
			document.body.style.overflow = "auto"
			document.getElementsByClassName(
				"specific_" + winCode
			)[0].checked = true
		}
	}
	const winCodeCustomFunctions = {
		specific: (e) => {
			if (e.target.checked) {
				setWinCodeSpecificIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				winCodeCancelSpecific(
					winCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "specific"
					)[0]
				)
			}
		},
	}

	useEffect(() => {
		if (winCodeTypeOfDuo) {
			setWinCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						winCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === winCode &&
								item.value === winCodeTypeOfDuo.value
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
	}, [winCodeTypeOfDuo])

	const [winCodePriceBeforePromoCode, setWinCodePriceBeforePromoCode] =
		useState()

	const [winCodeVipPercentage, setWinCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [winCodeVipOptions, setWinCodeVipOptions] = useState([])

	const [winCodePromoCode, setWinCodePromoCode] = useState("")
	const [winCodePromoCodePercentage, setWinCodePromoCodePercentage] =
		useState()
	const [winCodePromoCodeClass, setWinCodePromoCodeClass] = useState("")
	const [winCodeApplyButton, setWinCodeApplyButton] = useState("Apply")
	const [winCodeApplyButtonClass, setWinCodeApplyButtonClass] = useState()
	const winCodePromoCodeRef = useRef()
	const winCodeApplyPromoCode = () => {
		setWinCodePromoCodePercentage(0)
		if (
			winCodePromoCode &&
			winCodePromoCode.length &&
			winCodeApplyButton === "Apply"
		) {
			setWinCodePromoCodeClass(" forced")
			setWinCodeApplyButtonClass(" loading")
			setWinCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/Valorant/promocode", {
					promocode: winCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setWinCodePromoCodePercentage(data.percentage)
						setWinCodePromoCodeClass(" success")
					} else {
						setWinCodePromoCodeClass(" error")
						setWinCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setWinCodePromoCodeClass(" error")
					setWinCodePromoCodePercentage(0)
				})
				.finally(() => {
					setWinCodeApplyButtonClass("")
					setWinCodeApplyButton("Apply")
				})
		} else {
			winCodePromoCodeRef.current.focus()
			setWinCodePromoCodeClass(" forced")
		}
	}
	const winCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			winCodeApplyPromoCode()
		}
	}

	const [winCodeRequestToPay, setWinCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [winCodePrice, setWinCodePrice] = useState(0)

	useEffect(() => {
		if (winCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (winCodeCurrentDivision && winCodeNumberOfGame) {
				price =
					winCodeCurrentDivision.win_price * winCodeNumberOfGame.value
			}

			if (winCodeTypeOfService) {
				add_price =
					add_price + (price / 100) * winCodeTypeOfService.percentage
				if (
					winCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
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
				winCodeAgent &&
				winCodeAgent.length &&
				((winCodeTypeOfService &&
					winCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
						-1) ||
					!winCodeTypeOfService)
			) {
				add_price =
					add_price +
					(price / 100) *
						(!winCodeOnlyOneAgent
							? winCodeFirstData.vip.filter(
									(item) =>
										item.custom.toLowerCase() === "specific"
							  )[0].percentage
							: winCodeFirstData.vip.filter(
									(item) =>
										item.custom.toLowerCase() === "specific"
							  )[0].percentage * 2)
			}

			if (
				winCodeTypeOfDuo &&
				winCodeTypeOfService &&
				winCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
			) {
				add_price =
					add_price + (price / 100) * winCodeTypeOfDuo.percentage
			}

			if (winCodeVipPercentage) {
				add_price = add_price + (price / 100) * winCodeVipPercentage
			}

			price = price + add_price

			if (winCodePromoCodePercentage) {
				setWinCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * winCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setWinCodePrice(price)
		}
	}, [
		winCodeCurrentRank,
		winCodeCurrentDivision,
		winCodeNumberOfGame,
		winCodeVipPercentage,
		winCodePromoCodePercentage,
		winCodeTypeOfService,
		winCodeTypeOfDuo,
		winCodeAgent,
		winCodeOnlyOneAgent,
		vipPercentage,
	])

	useEffect(() => {
		if (winCodeRequestToPay) {
			let error = 0
			if (winCodeNumberOfGame && winCodeNumberOfGame.length !== 0) {
				setWinCodeNumberOfGameForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setWinCodeNumberOfGameForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (winCodeGameRegion && winCodeGameRegion.length !== 0) {
				setWinCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setWinCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (winCodeTypeOfService && winCodeTypeOfService.length !== 0) {
				setWinCodeTypeOfServiceForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setWinCodeTypeOfServiceForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				winCodeTypeOfService &&
				winCodeTypeOfService.label.toLowerCase().indexOf("duo") !==
					-1 &&
				winCodeTypeOfDuo &&
				winCodeTypeOfDuo.length !== 0
			) {
				setWinCodeTypeOfDuoForce({ menuIsOpen: false, forced: false })
			} else {
				setWinCodeTypeOfDuoForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [
		winCodeGameRegion,
		winCodeNumberOfGame,
		winCodeTypeOfService,
		winCodeTypeOfDuo,
	])

	useEffect(() => {
		if (winCodeFirstLoaded) {
			const divisions =
				winCodeFirstData.ranks[
					objSearch(
						winCodeCurrentRanks,
						"value",
						winCodeCurrentRank.value
					)
				].divisions
			const oldDivisionLevel = winCodeCurrentDivision.level
			setWinCodeCurrentDivision(null)
			setWinCodeCurrentDivisions(divisions)
			if (
				objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] !==
					null
			) {
				setWinCodeCurrentDivision(
					divisions[objSearch(divisions, "level", oldDivisionLevel)]
				)
			} else {
				setWinCodeCurrentDivision(divisions[0])
			}
		}
	}, [winCodeCurrentRank])

	useEffect(() => {
		if (winCodeFirstLoaded) {
			setWinCodeCurrentIcon(winCodeCurrentDivision.icon)
		}
	}, [winCodeCurrentDivision])

	useEffect(() => {
		if (!winCodeFirstLoaded) {
			let data = ValorantApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.win === 1),
			}
			setWinCodeFirstData(data)

			setWinCodeCurrentRanks(data.ranks)
			setWinCodeCurrentRank(data.ranks[0])
			setWinCodeCurrentDivisions(data.ranks[0].divisions)
			setWinCodeCurrentDivision(data.ranks[0].divisions[0])
			setWinCodeCurrentIcon(data.ranks[0].divisions[0].icon)

			setWinCodeGameRegions(data.regions)

			setWinCodeAgents(data.agents)

			setWinCodeTypeOfServices(
				data.typeofservice.filter(
					(item) =>
						item.boost_id === winCode || item.boost_id === null
				)
			)

			setWinCodeTypeOfDuos(
				data.typeofcustom.filter(
					(item) =>
						item.boost_id === winCode || item.boost_id === null
				)
			)

			setWinCodePrice(data.ranks[0].divisions[0].win_price.toFixed(2))

			setWinCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const winCodeCheckPurchase = () => {
		setWinCodeRequestToPay(true)
		let error = 0
		if (
			winCodeNumberOfGame === undefined ||
			winCodeNumberOfGame.length === 0
		) {
			if (!error) {
				winCodeNumberOfGameRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setWinCodeNumberOfGameForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (winCodeGameRegion === undefined || winCodeGameRegion.length === 0) {
			if (!error) {
				winCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setWinCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			winCodeTypeOfService === undefined ||
			winCodeTypeOfService.length === 0
		) {
			if (!error) {
				winCodeTypeOfServiceRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setWinCodeTypeOfServiceForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			(winCodeTypeOfService &&
				winCodeTypeOfService.label.toLowerCase().indexOf("duo") !==
					-1 &&
				!winCodeTypeOfDuo) ||
			(winCodeTypeOfDuo && winCodeTypeOfDuo.length === 0)
		) {
			if (!error) {
				winCodeTypeOfDuoRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setWinCodeTypeOfDuoForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setWinCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const winCodePurchase = () => {
		if (winCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/Valorant/winCode/makePurchase", {
					code: winCode,
					currentRank: winCodeCurrentRank.value,
					currentDivision: winCodeCurrentDivision.value,
					numberOfGames: winCodeNumberOfGame.value,
					gameRegion: winCodeGameRegion.value,
					typeOfService: winCodeTypeOfService.value,
					typeOfCustom: winCodeTypeOfDuo
						? winCodeTypeOfDuo.value
						: null,
					agents: winCodeAgent ? winCodeAgent : null,
					onlyOneAgent: winCodeOnlyOneAgent
						? winCodeOnlyOneAgent
						: false,
					vipOptions: winCodeVipOptions,
					promoCode: winCodePromoCode ? winCodePromoCode : null,
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
				isOpen={winCodeSpecificIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={winCodeResetSpecific}
				onRequestClose={() =>
					winCodeCancelSpecific(
						winCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{winCodeFirstLoaded ? (
					<>
						<div className="vip-modal">
							<h2 className="col-12 vip-modal-header">
								Select your agents (
								{
									winCodeFirstData.vip.filter(
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
											setWinCodeAgent(e)
										}}
										options={winCodeAgents}
										value={winCodeAgent}
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
												setWinCodeOnlyOneAgent(
													e.target.checked
												)
											}
											type="checkbox"
											className="custom-control-input"
											id={"onlyOneAgent-checkbox-id"}
											checked={winCodeOnlyOneAgent}
										/>
										<label
											className="custom-control-label"
											htmlFor={"onlyOneAgent-checkbox-id"}
										>
											Select only 1 agent (+
											{
												winCodeFirstData.vip.filter(
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
											winCodeCancelSpecific(
												winCodeFirstData.vip.filter(
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
										onClick={winCodeApplySpecific}
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
					<div className="col-md-2">
						<label
							htmlFor="activity-filter-by"
							style={{ marginBottom: "40px" }}
						>
							Current Rank:
						</label>
					</div>
					<div className="col-md-4">
						{winCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setWinCodeCurrentRank(
										winCodeCurrentRanks[
											objSearch(
												winCodeCurrentRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={winCodeCurrentRanks}
								value={winCodeCurrentRank}
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
					<div className="col-md-4">
						{winCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setWinCodeCurrentDivision(
										winCodeCurrentDivisions[
											objSearch(
												winCodeCurrentDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={winCodeCurrentDivisions}
								value={winCodeCurrentDivision}
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
					<div className="col-md-2">
						{winCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={winCodeCurrentIcon}
							/>
						) : (
							<Loader
								type="Puff"
								color="#FFF"
								height={45}
								width={45}
							/>
						)}
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			<div className="col-md-12">
				<div className="row vertical-gap">
					<div className="col-md-6">
						{winCodeFirstLoaded ? (
							<Select
								ref={winCodeNumberOfGameRef}
								menuIsOpen={winCodeNumberOfGameForce.menuIsOpen}
								onMenuOpen={() =>
									setWinCodeNumberOfGameForce(
										(prevWinCodeNumberOfGameForce) => {
											return {
												...prevWinCodeNumberOfGameForce,
												menuIsOpen:
													!prevWinCodeNumberOfGameForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setWinCodeNumberOfGameForce(
										(prevWinCodeNumberOfGameForce) => {
											return {
												...prevWinCodeNumberOfGameForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									winCodeNumberOfGameForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Number of games"
								onChange={(e) => {
									setWinCodeNumberOfGame(
										winCodeNumberOfGames[
											objSearch(
												winCodeNumberOfGames,
												"value",
												e.value
											)
										]
									)
								}}
								options={winCodeNumberOfGames}
								value={winCodeNumberOfGame}
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
						{winCodeFirstLoaded ? (
							<Select
								ref={winCodeGameRegionRef}
								menuIsOpen={winCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setWinCodeGameRegionForce(
										(prevWinCodeGameRegionForce) => {
											return {
												...prevWinCodeGameRegionForce,
												menuIsOpen:
													!prevWinCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setWinCodeGameRegionForce(
										(prevWinCodeGameRegionForce) => {
											return {
												...prevWinCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									winCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setWinCodeGameRegion(
										winCodeGameRegions[
											objSearch(
												winCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={winCodeGameRegions}
								value={winCodeGameRegion}
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
					<div className={winCodeTypeOfServiceClassName}>
						{winCodeFirstLoaded ? (
							<Select
								ref={winCodeTypeOfServiceRef}
								menuIsOpen={
									winCodeTypeOfServiceForce.menuIsOpen
								}
								onMenuOpen={() =>
									setWinCodeTypeOfServiceForce(
										(prevWinCodeTypeOfServiceForce) => {
											return {
												...prevWinCodeTypeOfServiceForce,
												menuIsOpen:
													!prevWinCodeTypeOfServiceForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setWinCodeTypeOfServiceForce(
										(prevWinCodeTypeOfServiceForce) => {
											return {
												...prevWinCodeTypeOfServiceForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									winCodeTypeOfServiceForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of service"
								onChange={(e) => {
									setWinCodeTypeOfService(
										winCodeTypeOfServices[
											objSearch(
												winCodeTypeOfServices,
												"value",
												e.value
											)
										]
									)
								}}
								options={winCodeTypeOfServices}
								value={winCodeTypeOfService}
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
					<div className={winCodeTypeOfDuoClassName}>
						{winCodeFirstLoaded ? (
							<>
								<Select
									id="winCodePopoverTarget"
									ref={winCodeTypeOfDuoRef}
									menuIsOpen={
										winCodeTypeOfDuoForce.menuIsOpen
									}
									onMenuOpen={() =>
										setWinCodeTypeOfDuoForce(
											(prevWinCodeTypeOfDuoForce) => {
												return {
													...prevWinCodeTypeOfDuoForce,
													menuIsOpen:
														!prevWinCodeTypeOfDuoForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setWinCodeTypeOfDuoForce(
											(prevWinCodeTypeOfDuoForce) => {
												return {
													...prevWinCodeTypeOfDuoForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										winCodeTypeOfDuoForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of duo"
									onChange={(e) => {
										setWinCodeTypeOfDuo(
											winCodeTypeOfDuos[
												objSearch(
													winCodeTypeOfDuos,
													"value",
													e.value
												)
											]
										)
										setWinCodeIsPopoverOpen(true)
									}}
									options={winCodeTypeOfDuos}
									value={winCodeTypeOfDuo}
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
									isOpen={winCodeIsPopoverOpen}
									placement="right"
									target="winCodePopoverTarget"
								>
									<PopoverHeader>
										{winCodeTypeOfDuo
											? winCodeTypeOfDuo.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{winCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={winCodePromoCodeRef}
							className={
								"form-control text-center" +
								winCodePromoCodeClass
							}
							onChange={(e) =>
								setWinCodePromoCode(e.target.value)
							}
							value={winCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={winCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={winCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								winCodeApplyButtonClass
							}
						>
							<span>{winCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{winCodeFirstLoaded &&
			winCodeFirstData.vip &&
			winCodeFirstData.vip &&
			winCodeFirstData.vip.filter(
				(item) => item.boost_id === winCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{winCodeFirstLoaded ? (
							winCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === winCode ||
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
														winCodeTypeOfService !==
															undefined &&
														winCodeTypeOfService.label
															.toLowerCase()
															.indexOf("duo") !==
															-1 &&
														item.custom !== ""
													}
													onChange={(e) => {
														if (e.target.checked) {
															setWinCodeVipOptions(
																(
																	prevWinCodeVipOptions
																) => {
																	return [
																		...prevWinCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setWinCodeVipOptions(
																winCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setWinCodeVipPercentage(
																(
																	prevWinCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevWinCodeVipPercentage +
																				item.percentage
																		: prevWinCodeVipPercentage -
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
															winCodeCustomFunctions[
																item.custom
															]
														) {
															winCodeCustomFunctions[
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
															  winCode
															: "") +
														" " +
														(item.custom.length
															? item.custom +
															  "_" +
															  winCode
															: "")
													}
													id={
														item.value +
														"-winCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-winCode-checkbox-id"
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
							{winCodePrice} &euro;
							{winCodePromoCodePercentage &&
							winCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{winCodePriceBeforePromoCode} &euro;
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
							onClick={winCodePurchase}
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

export default Win

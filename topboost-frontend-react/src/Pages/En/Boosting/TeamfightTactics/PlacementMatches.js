/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import { useHistory } from "react-router-dom"
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const PlacementMatches = () => {
	const placementMatchCode = 4
	let history = useHistory()

	const {
		Toast,
		objSearch,
		customStyles,
		api,
		TeamfightTacticsApi,
		LoadingSelect,
		LoadingCheckbox,
	} = useContexts()

	const [placementMatchCodeFirstLoaded, setPlacementMatchCodeFirstLoaded] =
		useState(false)
	const [placementMatchCodeFirstData, setPlacementMatchCodeFirstData] =
		useState()

	const [placementMatchCodeCurrentRanks, setPlacementMatchCodeCurrentRanks] =
		useState([])
	const [placementMatchCodeCurrentRank, setPlacementMatchCodeCurrentRank] =
		useState()

	const [
		placementMatchCodeCurrentDivision,
		setPlacementMatchCodeCurrentDivision,
	] = useState()

	const [placementMatchCodeCurrentIcon, setPlacementMatchCodeCurrentIcon] =
		useState()

	const [placementMatchCodeGameRegion, setPlacementMatchCodeGameRegion] =
		useState()
	const [placementMatchCodeGameRegions, setPlacementMatchCodeGameRegions] =
		useState()
	const placementMatchCodeGameRegionRef = useRef()
	const [
		placementMatchCodeGameRegionForce,
		setPlacementMatchCodeGameRegionForce,
	] = useState({ menuIsOpen: false, forced: false })

	const [placementMatchCodeNumberOfGame, setPlacementMatchCodeNumberOfGame] =
		useState()
	const placementMatchCodeNumberOfGames = [
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
	const placementMatchCodeNumberOfGameRef = useRef()
	const [
		placementMatchCodeNumberOfGameForce,
		setPlacementMatchCodeNumberOfGameForce,
	] = useState({ menuIsOpen: false, forced: false })

	const [
		placementMatchCodeTypeOfService,
		setPlacementMatchCodeTypeOfService,
	] = useState()
	const [
		placementMatchCodeTypeOfServices,
		setPlacementMatchCodeTypeOfServices,
	] = useState()
	const placementMatchCodeTypeOfServiceRef = useRef()
	const [
		placementMatchCodeTypeOfServiceForce,
		setPlacementMatchCodeTypeOfServiceForce,
	] = useState({ menuIsOpen: false, forced: false })

	const [
		placementMatchCodePriceBeforePromoCode,
		setPlacementMatchCodePriceBeforePromoCode,
	] = useState()
	const [
		placementMatchCodeTypeOfServiceClassName,
		setPlacementMatchCodeTypeOfServiceClassName,
	] = useState("col-md-6")

	const [
		placementMatchCodePopOverContent,
		setPlacementMatchCodePopOverContent,
	] = useState()
	const [
		placementMatchCodeIsPopoverOpen,
		setPlacementMatchCodeIsPopoverOpen,
	] = useState(false)
	if (placementMatchCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setPlacementMatchCodeIsPopoverOpen(false)
		})
	}
	const [placementMatchCodeTypeOfDuo, setPlacementMatchCodeTypeOfDuo] =
		useState()
	const [placementMatchCodeTypeOfDuos, setPlacementMatchCodeTypeOfDuos] =
		useState()
	const placementMatchCodeTypeOfDuoRef = useRef()
	const [
		placementMatchCodeTypeOfDuoForce,
		setPlacementMatchCodeTypeOfDuoForce,
	] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [
		placementMatchCodeTypeOfDuoClassName,
		setPlacementMatchCodeTypeOfSDuolassName,
	] = useState("d-none")
	useEffect(() => {
		if (placementMatchCodeTypeOfService) {
			setPlacementMatchCodeTypeOfServiceClassName(
				placementMatchCodeTypeOfService.label
					.toLowerCase()
					.indexOf("duo") !== -1
					? "col-md-3"
					: "col-md-6"
			)
			setPlacementMatchCodeTypeOfSDuolassName(
				placementMatchCodeTypeOfService.label
					.toLowerCase()
					.indexOf("duo") !== -1
					? "col-md-3"
					: "d-none"
			)
		}
	}, [placementMatchCodeTypeOfService])

	const [
		placementMatchCodeVipPercentage,
		setPlacementMatchCodeVipPercentage,
	] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [placementMatchCodeVipOptions, setPlacementMatchCodeVipOptions] =
		useState([])

	const [placementMatchCodePromoCode, setPlacementMatchCodePromoCode] =
		useState("")
	const [
		placementMatchCodePromoCodePercentage,
		setPlacementMatchCodePromoCodePercentage,
	] = useState()
	const [
		placementMatchCodePromoCodeClass,
		setPlacementMatchCodePromoCodeClass,
	] = useState("")
	const [placementMatchCodeApplyButton, setPlacementMatchCodeApplyButton] =
		useState("Apply")
	const [
		placementMatchCodeApplyButtonClass,
		setPlacementMatchCodeApplyButtonClass,
	] = useState()
	const placementMatchCodePromoCodeRef = useRef()
	const placementMatchCodeApplyPromoCode = () => {
		setPlacementMatchCodePromoCodePercentage(0)
		if (
			placementMatchCodePromoCode &&
			placementMatchCodePromoCode.length &&
			placementMatchCodeApplyButton === "Apply"
		) {
			setPlacementMatchCodePromoCodeClass(" forced")
			setPlacementMatchCodeApplyButtonClass(" loading")
			setPlacementMatchCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/TeamfightTactics/promocode", {
					promocode: placementMatchCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setPlacementMatchCodePromoCodePercentage(
							data.percentage
						)
						setPlacementMatchCodePromoCodeClass(" success")
					} else {
						setPlacementMatchCodePromoCodeClass(" error")
						setPlacementMatchCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setPlacementMatchCodePromoCodeClass(" error")
					setPlacementMatchCodePromoCodePercentage(0)
				})
				.finally(() => {
					setPlacementMatchCodeApplyButtonClass("")
					setPlacementMatchCodeApplyButton("Apply")
				})
		} else {
			placementMatchCodePromoCodeRef.current.focus()
			setPlacementMatchCodePromoCodeClass(" forced")
		}
	}
	const placementMatchCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			placementMatchCodeApplyPromoCode()
		}
	}

	const [placementMatchCodeRequestToPay, setPlacementMatchCodeRequestToPay] =
		useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [placementMatchCodePrice, setPlacementMatchCodePrice] = useState(0)

	useEffect(() => {
		if (placementMatchCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (
				placementMatchCodeCurrentDivision &&
				placementMatchCodeNumberOfGame
			) {
				price =
					placementMatchCodeCurrentDivision.placement_matches_price *
					placementMatchCodeNumberOfGame.value
			}

			if (placementMatchCodeTypeOfService) {
				add_price =
					add_price +
					(price / 100) * placementMatchCodeTypeOfService.percentage
				if (
					placementMatchCodeTypeOfService.label
						.toLowerCase()
						.indexOf("duo") === -1
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
				placementMatchCodeTypeOfDuo &&
				placementMatchCodeTypeOfService &&
				placementMatchCodeTypeOfService.label
					.toLowerCase()
					.indexOf("duo") !== -1
			) {
				add_price =
					add_price +
					(price / 100) * placementMatchCodeTypeOfDuo.percentage
			}

			if (placementMatchCodeVipPercentage) {
				add_price =
					add_price + (price / 100) * placementMatchCodeVipPercentage
			}

			price = price + add_price

			if (placementMatchCodePromoCodePercentage) {
				setPlacementMatchCodePriceBeforePromoCode(price.toFixed(2))
				price =
					price -
					(price / 100) * placementMatchCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setPlacementMatchCodePrice(price)
		}
	}, [
		placementMatchCodeCurrentRank,
		placementMatchCodeCurrentDivision,
		placementMatchCodeNumberOfGame,
		placementMatchCodeVipPercentage,
		placementMatchCodePromoCodePercentage,
		placementMatchCodeTypeOfService,
		placementMatchCodeTypeOfDuo,
		vipPercentage,
	])

	useEffect(() => {
		if (placementMatchCodeTypeOfDuo) {
			setPlacementMatchCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						placementMatchCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === placementMatchCode &&
								item.value === placementMatchCodeTypeOfDuo.value
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
	}, [placementMatchCodeTypeOfDuo])

	useEffect(() => {
		if (placementMatchCodeRequestToPay) {
			let error = 0
			if (
				placementMatchCodeNumberOfGame &&
				placementMatchCodeNumberOfGame.length !== 0
			) {
				setPlacementMatchCodeNumberOfGameForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setPlacementMatchCodeNumberOfGameForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				placementMatchCodeGameRegion &&
				placementMatchCodeGameRegion.length !== 0
			) {
				setPlacementMatchCodeGameRegionForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setPlacementMatchCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				placementMatchCodeTypeOfService &&
				placementMatchCodeTypeOfService.length !== 0
			) {
				setPlacementMatchCodeTypeOfServiceForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setPlacementMatchCodeTypeOfServiceForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				placementMatchCodeTypeOfService &&
				placementMatchCodeTypeOfService.label
					.toLowerCase()
					.indexOf("duo") !== -1 &&
				placementMatchCodeTypeOfDuo &&
				placementMatchCodeTypeOfDuo.length !== 0
			) {
				setPlacementMatchCodeTypeOfDuoForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setPlacementMatchCodeTypeOfDuoForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [
		placementMatchCodeGameRegion,
		placementMatchCodeNumberOfGame,
		placementMatchCodeTypeOfService,
		placementMatchCodeTypeOfDuo,
	])

	useEffect(() => {
		if (placementMatchCodeFirstLoaded) {
			const divisions = placementMatchCodeFirstData.ranks[
				objSearch(
					placementMatchCodeCurrentRanks,
					"value",
					placementMatchCodeCurrentRank.value
				)
			].divisions.filter((item) => item.level === 4)
			setPlacementMatchCodeCurrentDivision(divisions[0])
		}
	}, [placementMatchCodeCurrentRank])

	useEffect(() => {
		if (placementMatchCodeFirstLoaded) {
			setPlacementMatchCodeCurrentIcon(
				placementMatchCodeCurrentDivision.icon
			)
		}
	}, [placementMatchCodeCurrentDivision])

	useEffect(() => {
		if (!placementMatchCodeFirstLoaded) {
			let data = TeamfightTacticsApi
			data = {
				...data,
				ranks: data.ranks.filter(
					(item) => item.placement_matches === 1
				),
			}
			setPlacementMatchCodeFirstData(data)

			setPlacementMatchCodeCurrentRanks(data.ranks)
			setPlacementMatchCodeCurrentRank(data.ranks[0])
			setPlacementMatchCodeCurrentDivision(
				data.ranks[0].divisions.filter((item) => item.level === 4)[0]
			)
			setPlacementMatchCodeCurrentIcon(data.ranks[0].divisions[0].icon)

			setPlacementMatchCodeGameRegions(data.regions)

			setPlacementMatchCodeTypeOfServices(
				data.typeofservice.filter(
					(item) =>
						item.boost_id === placementMatchCode ||
						item.boost_id === null
				)
			)

			setPlacementMatchCodeTypeOfDuos(
				data.typeofcustom.filter(
					(item) =>
						item.boost_id === placementMatchCode ||
						item.boost_id === null
				)
			)

			setPlacementMatchCodePrice(
				data.ranks[0].divisions[0].win_price.toFixed(2)
			)

			setPlacementMatchCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const placementMatchCodeCheckPurchase = () => {
		setPlacementMatchCodeRequestToPay(true)
		let error = 0
		if (
			placementMatchCodeNumberOfGame === undefined ||
			placementMatchCodeNumberOfGame.length === 0
		) {
			if (!error) {
				placementMatchCodeNumberOfGameRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setPlacementMatchCodeNumberOfGameForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			placementMatchCodeGameRegion === undefined ||
			placementMatchCodeGameRegion.length === 0
		) {
			if (!error) {
				placementMatchCodeGameRegionRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setPlacementMatchCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			placementMatchCodeTypeOfService === undefined ||
			placementMatchCodeTypeOfService.length === 0
		) {
			if (!error) {
				placementMatchCodeTypeOfServiceRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setPlacementMatchCodeTypeOfServiceForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			(placementMatchCodeTypeOfService &&
				placementMatchCodeTypeOfService.label
					.toLowerCase()
					.indexOf("duo") !== -1 &&
				!placementMatchCodeTypeOfDuo) ||
			(placementMatchCodeTypeOfDuo &&
				placementMatchCodeTypeOfDuo.length === 0)
		) {
			if (!error) {
				placementMatchCodeTypeOfDuoRef.current.select.controlRef.scrollIntoView(
					{
						behavior: "smooth",
						block: "center",
						inline: "nearest",
					}
				)
			}
			setPlacementMatchCodeTypeOfDuoForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setPlacementMatchCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const placementMatchCodePurchase = () => {
		if (placementMatchCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/TeamfightTactics/placementMatchCode/makePurchase", {
					code: placementMatchCode,
					currentRank: placementMatchCodeCurrentRank.value,
					currentDivision: placementMatchCodeCurrentDivision.value,
					numberOfGames: placementMatchCodeNumberOfGame.value,
					gameRegion: placementMatchCodeGameRegion.value,
					typeOfService: placementMatchCodeTypeOfService.value,
					typeOfCustom: placementMatchCodeTypeOfDuo
						? placementMatchCodeTypeOfDuo.value
						: null,
					vipOptions: placementMatchCodeVipOptions,
					promoCode: placementMatchCodePromoCode
						? placementMatchCodePromoCode
						: null,
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
					<div className="col-md-4">
						<label
							htmlFor="activity-filter-by"
							style={{ marginBottom: "40px" }}
						>
							Last season standing:
						</label>
					</div>
					<div className="col-md-4">
						{placementMatchCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setPlacementMatchCodeCurrentRank(
										placementMatchCodeCurrentRanks[
											objSearch(
												placementMatchCodeCurrentRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={placementMatchCodeCurrentRanks}
								value={placementMatchCodeCurrentRank}
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
						{placementMatchCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={placementMatchCodeCurrentIcon}
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
						{placementMatchCodeFirstLoaded ? (
							<Select
								ref={placementMatchCodeNumberOfGameRef}
								menuIsOpen={
									placementMatchCodeNumberOfGameForce.menuIsOpen
								}
								onMenuOpen={() =>
									setPlacementMatchCodeNumberOfGameForce(
										(
											prevPlacementMatchCodeNumberOfGameForce
										) => {
											return {
												...prevPlacementMatchCodeNumberOfGameForce,
												menuIsOpen:
													!prevPlacementMatchCodeNumberOfGameForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setPlacementMatchCodeNumberOfGameForce(
										(
											prevPlacementMatchCodeNumberOfGameForce
										) => {
											return {
												...prevPlacementMatchCodeNumberOfGameForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									placementMatchCodeNumberOfGameForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Number of games"
								onChange={(e) => {
									setPlacementMatchCodeNumberOfGame(
										placementMatchCodeNumberOfGames[
											objSearch(
												placementMatchCodeNumberOfGames,
												"value",
												e.value
											)
										]
									)
								}}
								options={placementMatchCodeNumberOfGames}
								value={placementMatchCodeNumberOfGame}
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
						{placementMatchCodeFirstLoaded ? (
							<Select
								ref={placementMatchCodeGameRegionRef}
								menuIsOpen={
									placementMatchCodeGameRegionForce.menuIsOpen
								}
								onMenuOpen={() =>
									setPlacementMatchCodeGameRegionForce(
										(
											prevPlacementMatchCodeGameRegionForce
										) => {
											return {
												...prevPlacementMatchCodeGameRegionForce,
												menuIsOpen:
													!prevPlacementMatchCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setPlacementMatchCodeGameRegionForce(
										(
											prevPlacementMatchCodeGameRegionForce
										) => {
											return {
												...prevPlacementMatchCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									placementMatchCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setPlacementMatchCodeGameRegion(
										placementMatchCodeGameRegions[
											objSearch(
												placementMatchCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={placementMatchCodeGameRegions}
								value={placementMatchCodeGameRegion}
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
					<div className={placementMatchCodeTypeOfServiceClassName}>
						{placementMatchCodeFirstLoaded ? (
							<Select
								ref={placementMatchCodeTypeOfServiceRef}
								menuIsOpen={
									placementMatchCodeTypeOfServiceForce.menuIsOpen
								}
								onMenuOpen={() =>
									setPlacementMatchCodeTypeOfServiceForce(
										(
											prevPlacementMatchCodeTypeOfServiceForce
										) => {
											return {
												...prevPlacementMatchCodeTypeOfServiceForce,
												menuIsOpen:
													!prevPlacementMatchCodeTypeOfServiceForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setPlacementMatchCodeTypeOfServiceForce(
										(
											prevPlacementMatchCodeTypeOfServiceForce
										) => {
											return {
												...prevPlacementMatchCodeTypeOfServiceForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									placementMatchCodeTypeOfServiceForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of service"
								onChange={(e) => {
									setPlacementMatchCodeTypeOfService(
										placementMatchCodeTypeOfServices[
											objSearch(
												placementMatchCodeTypeOfServices,
												"value",
												e.value
											)
										]
									)
								}}
								options={placementMatchCodeTypeOfServices}
								value={placementMatchCodeTypeOfService}
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
					<div className={placementMatchCodeTypeOfDuoClassName}>
						{placementMatchCodeFirstLoaded ? (
							<>
								<Select
									id="placementMatchCodePopoverTarget"
									ref={placementMatchCodeTypeOfDuoRef}
									menuIsOpen={
										placementMatchCodeTypeOfDuoForce.menuIsOpen
									}
									onMenuOpen={() =>
										setPlacementMatchCodeTypeOfDuoForce(
											(
												prevPlacementMatchCodeTypeOfDuoForce
											) => {
												return {
													...prevPlacementMatchCodeTypeOfDuoForce,
													menuIsOpen:
														!prevPlacementMatchCodeTypeOfDuoForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setPlacementMatchCodeTypeOfDuoForce(
											(
												prevPlacementMatchCodeTypeOfDuoForce
											) => {
												return {
													...prevPlacementMatchCodeTypeOfDuoForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										placementMatchCodeTypeOfDuoForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of duo"
									onChange={(e) => {
										setPlacementMatchCodeTypeOfDuo(
											placementMatchCodeTypeOfDuos[
												objSearch(
													placementMatchCodeTypeOfDuos,
													"value",
													e.value
												)
											]
										)
										setPlacementMatchCodeIsPopoverOpen(true)
									}}
									options={placementMatchCodeTypeOfDuos}
									value={placementMatchCodeTypeOfDuo}
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
									isOpen={placementMatchCodeIsPopoverOpen}
									placement="right"
									target="placementMatchCodePopoverTarget"
								>
									<PopoverHeader>
										{placementMatchCodeTypeOfDuo
											? placementMatchCodeTypeOfDuo.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{placementMatchCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={placementMatchCodePromoCodeRef}
							className={
								"form-control text-center" +
								placementMatchCodePromoCodeClass
							}
							onChange={(e) =>
								setPlacementMatchCodePromoCode(e.target.value)
							}
							value={placementMatchCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={placementMatchCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={placementMatchCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								placementMatchCodeApplyButtonClass
							}
						>
							<span>{placementMatchCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{placementMatchCodeFirstLoaded &&
			placementMatchCodeFirstData.vip &&
			placementMatchCodeFirstData.vip &&
			placementMatchCodeFirstData.vip.filter(
				(item) =>
					item.boost_id === placementMatchCode ||
					item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{placementMatchCodeFirstLoaded ? (
							placementMatchCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === placementMatchCode ||
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
														placementMatchCodeTypeOfService !==
															undefined &&
														placementMatchCodeTypeOfService.label
															.toLowerCase()
															.indexOf("duo") !==
															-1 &&
														item.custom !== ""
													}
													onChange={(e) => {
														if (e.target.checked) {
															setPlacementMatchCodeVipOptions(
																(
																	prevPlacementMatchCodeVipOptions
																) => {
																	return [
																		...prevPlacementMatchCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setPlacementMatchCodeVipOptions(
																placementMatchCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setPlacementMatchCodeVipPercentage(
																(
																	prevPlacementMatchCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevPlacementMatchCodeVipPercentage +
																				item.percentage
																		: prevPlacementMatchCodeVipPercentage -
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
															  placementMatchCode
															: "")
													}
													id={
														item.value +
														"-placementMatchCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-placementMatchCode-checkbox-id"
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
							{placementMatchCodePrice} &euro;
							{placementMatchCodePromoCodePercentage &&
							placementMatchCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{placementMatchCodePriceBeforePromoCode}
									&nbsp; &euro;
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
							onClick={placementMatchCodePurchase}
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

export default PlacementMatches

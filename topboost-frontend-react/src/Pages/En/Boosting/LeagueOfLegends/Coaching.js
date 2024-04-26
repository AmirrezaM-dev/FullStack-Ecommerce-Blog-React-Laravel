import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import { useHistory } from "react-router-dom"
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
const Coaching = () => {
	const coachingCode = 5
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

	const [coachingCodeFirstLoaded, setCoachingCodeFirstLoaded] =
		useState(false)
	const [coachingCodeFirstData, setCoachingCodeFirstData] = useState()

	const [coachingCodeCurrentRanks, setCoachingCodeCurrentRanks] = useState([])
	const [coachingCodeCurrentRank, setCoachingCodeCurrentRank] = useState()

	const [coachingCodePopOverContent, setCoachingCodePopOverContent] =
		useState()
	const [coachingCodeIsPopoverOpen, setCoachingCodeIsPopoverOpen] =
		useState(false)
	if (coachingCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setCoachingCodeIsPopoverOpen(false)
		})
	}
	const [coachingCodeTypeOfCoaching, setCoachingCodeTypeOfCoaching] =
		useState()
	const [coachingCodeTypeOfCoachings, setCoachingCodeTypeOfCoachings] =
		useState()
	const coachingCodeTypeOfCoachingRef = useRef()
	const [
		coachingCodeTypeOfCoachingForce,
		setCoachingCodeTypeOfCoachingForce,
	] = useState({ menuIsOpen: false, forced: false })

	const [coachingCodeCurrentDivision, setCoachingCodeCurrentDivision] =
		useState()

	const [coachingCodeCurrentIcon, setCoachingCodeCurrentIcon] = useState()

	const [coachingCodeGameRegion, setCoachingCodeGameRegion] = useState()
	const [coachingCodeGameRegions, setCoachingCodeGameRegions] = useState()
	const coachingCodeGameRegionRef = useRef()
	const [coachingCodeGameRegionForce, setCoachingCodeGameRegionForce] =
		useState({ menuIsOpen: false, forced: false })

	const [coachingCodeLine, setCoachingCodeLine] = useState()
	const [coachingCodeLines, setCoachingCodeLines] = useState()
	const coachingCodeLineRef = useRef()
	const [coachingCodeLineForce, setCoachingCodeLineForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [coachingCodeLang, setCoachingCodeLang] = useState()
	const [coachingCodeLangs, setCoachingCodeLangs] = useState()
	const coachingCodeLangRef = useRef()
	const [coachingCodeLangForce, setCoachingCodeLangForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const coachingCodeDurations = [
		{ value: 1, label: "1 Hour" },
		{ value: 2, label: "2 Hour" },
		{ value: 3, label: "3 Hour" },
		{ value: 4, label: "4 Hour" },
		{ value: 5, label: "5 Hour" },
		{ value: 6, label: "6 Hour" },
		{ value: 7, label: "7 Hour" },
		{ value: 7, label: "7 Hour" },
		{ value: 8, label: "8 Hour" },
		{ value: 10, label: "10 Hour" },
	]
	const [coachingCodeDuration, setCoachingCodeDuration] = useState(
		coachingCodeDurations[4]
	)

	const [
		coachingCodePriceBeforePromoCode,
		setCoachingCodePriceBeforePromoCode,
	] = useState()

	const [coachingCodeVipPercentage, setCoachingCodeVipPercentage] =
		useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [coachingCodeVipOptions, setCoachingCodeVipOptions] = useState([])

	const [coachingCodePromoCode, setCoachingCodePromoCode] = useState("")
	const [
		coachingCodePromoCodePercentage,
		setCoachingCodePromoCodePercentage,
	] = useState()
	const [coachingCodePromoCodeClass, setCoachingCodePromoCodeClass] =
		useState("")
	const [coachingCodeApplyButton, setCoachingCodeApplyButton] =
		useState("Apply")
	const [coachingCodeApplyButtonClass, setCoachingCodeApplyButtonClass] =
		useState()
	const coachingCodePromoCodeRef = useRef()
	const coachingCodeApplyPromoCode = () => {
		setCoachingCodePromoCodePercentage(0)
		if (
			coachingCodePromoCode &&
			coachingCodePromoCode.length &&
			coachingCodeApplyButton === "Apply"
		) {
			setCoachingCodePromoCodeClass(" forced")
			setCoachingCodeApplyButtonClass(" loading")
			setCoachingCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/LeagueOfLegends/promocode", {
					promocode: coachingCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setCoachingCodePromoCodePercentage(data.percentage)
						setCoachingCodePromoCodeClass(" success")
					} else {
						setCoachingCodePromoCodeClass(" error")
						setCoachingCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setCoachingCodePromoCodeClass(" error")
					setCoachingCodePromoCodePercentage(0)
				})
				.finally(() => {
					setCoachingCodeApplyButtonClass("")
					setCoachingCodeApplyButton("Apply")
				})
		} else {
			coachingCodePromoCodeRef.current.focus()
			setCoachingCodePromoCodeClass(" forced")
		}
	}
	const coachingCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			coachingCodeApplyPromoCode()
		}
	}

	const [coachingCodeRequestToPay, setCoachingCodeRequestToPay] =
		useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [coachingCodePrice, setCoachingCodePrice] = useState(0)

	useEffect(() => {
		if (coachingCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (coachingCodeCurrentDivision && coachingCodeDuration) {
				price =
					coachingCodeCurrentDivision.coaching_price *
					coachingCodeDuration.value
			}

			if (coachingCodeVipPercentage) {
				add_price =
					add_price + (price / 100) * coachingCodeVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			if (coachingCodeTypeOfCoaching) {
				add_price =
					add_price +
					(price / 100) * coachingCodeTypeOfCoaching.percentage
			}

			price = price + add_price

			if (coachingCodePromoCodePercentage) {
				setCoachingCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * coachingCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setCoachingCodePrice(price)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		coachingCodeCurrentRank,
		coachingCodeCurrentDivision,
		coachingCodeDuration,
		coachingCodeVipPercentage,
		coachingCodePromoCodePercentage,
		coachingCodeTypeOfCoaching,
		vipPercentage,
	])

	useEffect(() => {
		if (coachingCodeTypeOfCoaching) {
			setCoachingCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						coachingCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === coachingCode &&
								item.value === coachingCodeTypeOfCoaching.value
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coachingCodeTypeOfCoaching])

	useEffect(() => {
		if (coachingCodeRequestToPay) {
			let error = 0
			if (coachingCodeGameRegion && coachingCodeGameRegion.length !== 0) {
				setCoachingCodeGameRegionForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setCoachingCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				coachingCodeTypeOfCoaching &&
				coachingCodeTypeOfCoaching.length !== 0
			) {
				setCoachingCodeTypeOfCoachingForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setCoachingCodeTypeOfCoachingForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (coachingCodeLine && coachingCodeLine.length !== 0) {
				setCoachingCodeLineForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setCoachingCodeLineForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (coachingCodeLang && coachingCodeLang.length !== 0) {
				setCoachingCodeLangForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setCoachingCodeLangForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		coachingCodeGameRegion,
		coachingCodeDuration,
		coachingCodeTypeOfCoaching,
		coachingCodeLine,
		coachingCodeLang,
	])

	useEffect(() => {
		if (coachingCodeFirstLoaded) {
			const divisions = coachingCodeFirstData.ranks[
				objSearch(
					coachingCodeCurrentRanks,
					"value",
					coachingCodeCurrentRank.value
				)
			].divisions.filter((item) => item.level === 4)
			setCoachingCodeCurrentDivision(divisions[0])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coachingCodeCurrentRank])

	useEffect(() => {
		if (coachingCodeFirstLoaded) {
			setCoachingCodeCurrentIcon(coachingCodeCurrentDivision.icon)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [coachingCodeCurrentDivision])

	useEffect(() => {
		if (!coachingCodeFirstLoaded) {
			let data = LeagueOfLegendsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.coaching === 1),
			}
			setCoachingCodeFirstData(data)

			setCoachingCodeCurrentRanks(data.ranks)
			setCoachingCodeCurrentRank(data.ranks[0])
			setCoachingCodeCurrentDivision(data.ranks[0].divisions[3])
			setCoachingCodeCurrentIcon(data.ranks[0].divisions[0].icon)

			setCoachingCodeGameRegions(data.regions)

			setCoachingCodeLines(
				data.roles.filter(
					(item) => item.label.toLowerCase().indexOf("fill") === -1
				)
			)

			setCoachingCodeLangs(data.langs)

			setCoachingCodeTypeOfCoachings(
				data.typeofcustom.filter(
					(item) =>
						item.boost_id === coachingCode || item.boost_id === null
				)
			)

			setCoachingCodePrice((0).toFixed(2))

			setCoachingCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const coachingCodeCheckPurchase = () => {
		setCoachingCodeRequestToPay(true)
		let error = 0
		if (
			coachingCodeGameRegion === undefined ||
			coachingCodeGameRegion.length === 0
		) {
			if (!error) {
				coachingCodeGameRegionRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setCoachingCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (coachingCodeLine === undefined || coachingCodeLine.length === 0) {
			if (!error) {
				coachingCodeLineRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setCoachingCodeLineForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (coachingCodeLang === undefined || coachingCodeLang.length === 0) {
			if (!error) {
				coachingCodeLangRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setCoachingCodeLangForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			coachingCodeTypeOfCoaching === undefined ||
			coachingCodeTypeOfCoaching.length === 0
		) {
			if (!error) {
				coachingCodeTypeOfCoachingRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setCoachingCodeTypeOfCoachingForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setCoachingCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const coachingCodePurchase = () => {
		if (coachingCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/LeagueOfLegends/coachingCode/makePurchase", {
					code: coachingCode,
					currentRank: coachingCodeCurrentRank.value,
					currentDivision: coachingCodeCurrentDivision.value,
					numberOfHours: coachingCodeDuration.value,
					lang: coachingCodeLang.value,
					line: coachingCodeLine ? coachingCodeLine : null,
					gameRegion: coachingCodeGameRegion.value,
					typeOfCustom: coachingCodeTypeOfCoaching.value,
					vipOptions: coachingCodeVipOptions,
					promoCode: coachingCodePromoCode
						? coachingCodePromoCode
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
					<div className="col-md-2">
						<label
							htmlFor="activity-filter-by"
							style={{ marginBottom: "40px" }}
						>
							Rank of coach:
						</label>
					</div>
					<div className="col-md-3">
						{coachingCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setCoachingCodeCurrentRank(
										coachingCodeCurrentRanks[
											objSearch(
												coachingCodeCurrentRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={coachingCodeCurrentRanks}
								value={coachingCodeCurrentRank}
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
						{coachingCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={coachingCodeCurrentIcon}
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
					<div className="col-md-2">
						<label
							htmlFor="activity-filter-by"
							style={{ marginBottom: "40px" }}
						>
							Duration:
						</label>
					</div>
					<div className="col-md-3">
						{coachingCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setCoachingCodeDuration(
										coachingCodeDurations[
											objSearch(
												coachingCodeDurations,
												"value",
												e.value
											)
										]
									)
								}}
								options={coachingCodeDurations}
								value={coachingCodeDuration}
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
					<div className="col-md-3">
						{coachingCodeFirstLoaded ? (
							<Select
								ref={coachingCodeGameRegionRef}
								menuIsOpen={
									coachingCodeGameRegionForce.menuIsOpen
								}
								onMenuOpen={() =>
									setCoachingCodeGameRegionForce(
										(prevCoachingCodeGameRegionForce) => {
											return {
												...prevCoachingCodeGameRegionForce,
												menuIsOpen:
													!prevCoachingCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCoachingCodeGameRegionForce(
										(prevCoachingCodeGameRegionForce) => {
											return {
												...prevCoachingCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									coachingCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setCoachingCodeGameRegion(
										coachingCodeGameRegions[
											objSearch(
												coachingCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={coachingCodeGameRegions}
								value={coachingCodeGameRegion}
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
						{coachingCodeFirstLoaded ? (
							<>
								<Select
									id="coachingCodePopoverTarget"
									ref={coachingCodeTypeOfCoachingRef}
									menuIsOpen={
										coachingCodeTypeOfCoachingForce.menuIsOpen
									}
									onMenuOpen={() =>
										setCoachingCodeTypeOfCoachingForce(
											(
												prevCoachingCodeTypeOfCoachingForce
											) => {
												return {
													...prevCoachingCodeTypeOfCoachingForce,
													menuIsOpen:
														!prevCoachingCodeTypeOfCoachingForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setCoachingCodeTypeOfCoachingForce(
											(
												prevCoachingCodeTypeOfCoachingForce
											) => {
												return {
													...prevCoachingCodeTypeOfCoachingForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										coachingCodeTypeOfCoachingForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of coaching"
									onChange={(e) => {
										setCoachingCodeTypeOfCoaching(
											coachingCodeTypeOfCoachings[
												objSearch(
													coachingCodeTypeOfCoachings,
													"value",
													e.value
												)
											]
										)
										setCoachingCodeIsPopoverOpen(true)
									}}
									options={coachingCodeTypeOfCoachings}
									value={coachingCodeTypeOfCoaching}
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
									isOpen={coachingCodeIsPopoverOpen}
									placement="right"
									target="coachingCodePopoverTarget"
								>
									<PopoverHeader>
										{coachingCodeTypeOfCoaching
											? coachingCodeTypeOfCoaching.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{coachingCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-3">
						{coachingCodeFirstLoaded ? (
							<Select
								isMulti
								ref={coachingCodeLineRef}
								menuIsOpen={coachingCodeLineForce.menuIsOpen}
								onMenuOpen={() =>
									setCoachingCodeLineForce(
										(prevCoachingCodeLineForce) => {
											return {
												...prevCoachingCodeLineForce,
												menuIsOpen:
													!prevCoachingCodeLineForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() => {
									setCoachingCodeLineForce(
										(prevCoachingCodeLineForce) => {
											return {
												...prevCoachingCodeLineForce,
												menuIsOpen: false,
											}
										}
									)
								}}
								className={
									coachingCodeLineForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Lane"
								onChange={(e) => {
									setCoachingCodeLine(e)
								}}
								closeMenuOnSelect={false}
								options={coachingCodeLines}
								value={coachingCodeLine}
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
						{coachingCodeFirstLoaded ? (
							<Select
								ref={coachingCodeLangRef}
								menuIsOpen={coachingCodeLangForce.menuIsOpen}
								onMenuOpen={() =>
									setCoachingCodeLangForce(
										(prevCoachingCodeLangForce) => {
											return {
												...prevCoachingCodeLangForce,
												menuIsOpen:
													!prevCoachingCodeLangForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setCoachingCodeLangForce(
										(prevCoachingCodeLangForce) => {
											return {
												...prevCoachingCodeLangForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									coachingCodeLangForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Language"
								onChange={(e) => {
									setCoachingCodeLang(
										coachingCodeLangs[
											objSearch(
												coachingCodeLangs,
												"value",
												e.value
											)
										]
									)
								}}
								options={coachingCodeLangs}
								value={coachingCodeLang}
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
							ref={coachingCodePromoCodeRef}
							className={
								"form-control text-center" +
								coachingCodePromoCodeClass
							}
							onChange={(e) =>
								setCoachingCodePromoCode(e.target.value)
							}
							value={coachingCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={coachingCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={coachingCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								coachingCodeApplyButtonClass
							}
						>
							<span>{coachingCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{coachingCodeFirstLoaded &&
			coachingCodeFirstData.vip &&
			coachingCodeFirstData.vip &&
			coachingCodeFirstData.vip.filter(
				(item) =>
					item.boost_id === coachingCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{coachingCodeFirstLoaded ? (
							coachingCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === coachingCode ||
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
															setCoachingCodeVipOptions(
																(
																	prevCoachingCodeVipOptions
																) => {
																	return [
																		...prevCoachingCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setCoachingCodeVipOptions(
																coachingCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setCoachingCodeVipPercentage(
																(
																	prevCoachingCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevCoachingCodeVipPercentage +
																				item.percentage
																		: prevCoachingCodeVipPercentage -
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
															  coachingCode
															: "")
													}
													id={
														item.value +
														"-coachingCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-coachingCode-checkbox-id"
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
							{coachingCodePrice} &euro;
							{coachingCodePromoCodePercentage &&
							coachingCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{coachingCodePriceBeforePromoCode} &euro;
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
							onClick={coachingCodePurchase}
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

export default Coaching

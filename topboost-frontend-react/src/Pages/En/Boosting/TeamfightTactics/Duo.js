/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import { useHistory } from "react-router-dom"
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Duo = () => {
	const duoCode = 2

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

	const [duoCodeFirstLoaded, setDuoCodeFirstLoaded] = useState(false)
	const [duoCodeFirstData, setDuoCodeFirstData] = useState()

	const [duoCodeCurrentRanks, setDuoCodeCurrentRanks] = useState([])
	const [duoCodeCurrentRank, setDuoCodeCurrentRank] = useState()

	const [duoCodeDesiredRanks, setDuoCodeDesiredRanks] = useState([])
	const [duoCodeDesiredRank, setDuoCodeDesiredRank] = useState()

	const [duoCodeCurrentDivisions, setDuoCodeCurrentDivisions] = useState([])
	const [duoCodeCurrentDivision, setDuoCodeCurrentDivision] = useState()

	const [duoCodeDesiredDivisions, setDuoCodeDesiredDivisions] = useState([])
	const [duoCodeDesiredDivision, setDuoCodeDesiredDivision] = useState()

	const [duoCodeCurrentIcon, setDuoCodeCurrentIcon] = useState()
	const [duoCodeDesiredIcon, setDuoCodeDesiredIcon] = useState()

	const [duoCodeGameRegion, setDuoCodeGameRegion] = useState()
	const [duoCodeGameRegions, setDuoCodeGameRegions] = useState()
	const duoCodeGameRegionRef = useRef()
	const [duoCodeGameRegionForce, setDuoCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [duoCodePopOverContent, setDuoCodePopOverContent] = useState()
	const [duoCodeIsPopoverOpen, setDuoCodeIsPopoverOpen] = useState(false)
	if (duoCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setDuoCodeIsPopoverOpen(false)
		})
	}
	const [duoCodeTypeOfDuo, setDuoCodeTypeOfDuo] = useState()
	const [duoCodeTypeOfDuos, setDuoCodeTypeOfDuos] = useState()
	const duoCodeTypeOfDuoRef = useRef()
	const [duoCodeTypeOfDuoForce, setDuoCodeTypeOfDuoForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [duoCodeCurrentLp, setDuoCodeCurrentLp] = useState()
	const [duoCodeCurrentLps, setDuoCodeCurrentLps] = useState()
	const duoCodeCurrentLpRef = useRef()
	const [duoCodeCurrentLpForce, setDuoCodeCurrentLpForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [duoCodePriceBeforePromoCode, setDuoCodePriceBeforePromoCode] =
		useState()

	const [duoCodeVipPercentage, setDuoCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [duoCodeVipOptions, setDuoCodeVipOptions] = useState([])

	const [duoCodePromoCode, setDuoCodePromoCode] = useState("")
	const [duoCodePromoCodePercentage, setDuoCodePromoCodePercentage] =
		useState()
	const [duoCodePromoCodeClass, setDuoCodePromoCodeClass] = useState("")
	const [duoCodeApplyButton, setDuoCodeApplyButton] = useState("Apply")
	const [duoCodeApplyButtonClass, setDuoCodeApplyButtonClass] = useState()
	const duoCodePromoCodeRef = useRef()
	const duoCodeApplyPromoCode = () => {
		setDuoCodePromoCodePercentage(0)
		if (
			duoCodePromoCode &&
			duoCodePromoCode.length &&
			duoCodeApplyButton === "Apply"
		) {
			setDuoCodePromoCodeClass(" forced")
			setDuoCodeApplyButtonClass(" loading")
			setDuoCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/TeamfightTactics/promocode", {
					promocode: duoCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setDuoCodePromoCodePercentage(data.percentage)
						setDuoCodePromoCodeClass(" success")
					} else {
						setDuoCodePromoCodeClass(" error")
						setDuoCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setDuoCodePromoCodeClass(" error")
					setDuoCodePromoCodePercentage(0)
				})
				.finally(() => {
					setDuoCodeApplyButtonClass("")
					setDuoCodeApplyButton("Apply")
				})
		} else {
			duoCodePromoCodeRef.current.focus()
			setDuoCodePromoCodeClass(" forced")
		}
	}
	const duoCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			duoCodeApplyPromoCode()
		}
	}

	const [duoCodeRequestToPay, setDuoCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [duoCodePrice, setDuoCodePrice] = useState(0)

	useEffect(() => {
		if (duoCodeFirstLoaded) {
			let price = 0
			let add_price = 0
			if (duoCodeCurrentRank.level === duoCodeDesiredRank.level) {
				duoCodeCurrentRank.divisions
					.filter(
						(item) =>
							item.level >= duoCodeCurrentDivision.level &&
							item.level < duoCodeDesiredDivision.level
					)
					.map((item) => {
						if (
							duoCodeCurrentLp &&
							item.value === duoCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * duoCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			} else if (
				duoCodeDesiredRank.level - duoCodeCurrentRank.level ===
				1
			) {
				duoCodeCurrentRank.divisions
					.filter(
						(item) => item.level >= duoCodeCurrentDivision.level
					)
					.map((item) => {
						if (
							duoCodeCurrentLp &&
							item.value === duoCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * duoCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
				if (duoCodeDesiredDivision) {
					duoCodeDesiredRank.divisions
						.filter(
							(item) => item.level < duoCodeDesiredDivision.level
						)
						.map((item) => {
							if (
								duoCodeCurrentLp &&
								item.value === duoCodeCurrentDivision.value
							) {
								price +=
									item.price -
									(item.price / 100) *
										duoCodeCurrentLp.percentage
							} else {
								price += item.price
							}
						})
				}
			} else {
				duoCodeCurrentRank.divisions
					.filter(
						(item) => item.level >= duoCodeCurrentDivision.level
					)
					.map((item) => {
						if (
							duoCodeCurrentLp &&
							item.value === duoCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * duoCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
				duoCodeFirstData.ranks
					.filter(
						(item) =>
							item.level > duoCodeCurrentRank.level &&
							item.level < duoCodeDesiredRank.level
					)
					.map((item) => {
						if (
							duoCodeCurrentLp &&
							item.value === duoCodeCurrentDivision.value
						) {
							price +=
								item.sumPrice -
								(item.sumPrice / 100) *
									duoCodeCurrentLp.percentage
						} else {
							price += item.sumPrice
						}
					})
				duoCodeDesiredRank.divisions
					.filter((item) => item.level < duoCodeDesiredDivision.level)
					.map((item) => {
						if (
							duoCodeCurrentLp &&
							item.value === duoCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * duoCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			}

			if (duoCodeTypeOfDuo) {
				add_price =
					add_price + (price / 100) * duoCodeTypeOfDuo.percentage
			}

			if (duoCodeVipPercentage) {
				add_price = add_price + (price / 100) * duoCodeVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			price = price + add_price

			price = price * 1.4285

			if (duoCodePromoCodePercentage) {
				setDuoCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * duoCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setDuoCodePrice(price)
		}
	}, [
		duoCodeCurrentRank,
		duoCodeCurrentDivision,
		duoCodeDesiredRank,
		duoCodeDesiredDivision,
		duoCodeTypeOfDuo,
		duoCodeCurrentLp,
		duoCodeVipPercentage,
		duoCodePromoCodePercentage,
	])

	useEffect(() => {
		if (duoCodeTypeOfDuo) {
			setDuoCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						duoCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === duoCode &&
								item.value === duoCodeTypeOfDuo.value
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
	}, [duoCodeTypeOfDuo])

	useEffect(() => {
		if (duoCodeRequestToPay) {
			let error = 0
			if (duoCodeGameRegion && duoCodeGameRegion.length !== 0) {
				setDuoCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setDuoCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (duoCodeCurrentLp && duoCodeCurrentLp.length !== 0) {
				setDuoCodeCurrentLpForce({ menuIsOpen: false, forced: false })
			} else {
				setDuoCodeCurrentLpForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (duoCodeTypeOfDuo && duoCodeTypeOfDuo.length !== 0) {
				setDuoCodeTypeOfDuoForce({ menuIsOpen: false, forced: false })
			} else {
				setDuoCodeTypeOfDuoForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [duoCodeGameRegion, duoCodeCurrentLp, duoCodeTypeOfDuo])

	useEffect(() => {
		if (duoCodeFirstLoaded) {
			const divisions =
				duoCodeFirstData.ranks[
					objSearch(
						duoCodeCurrentRanks,
						"value",
						duoCodeCurrentRank.value
					)
				].divisions
			const oldDivisionLevel = duoCodeCurrentDivision.level
			setDuoCodeCurrentDivision(null)
			setDuoCodeCurrentDivisions(divisions)
			if (
				objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] !==
					null
			) {
				setDuoCodeCurrentDivision(
					divisions[objSearch(divisions, "level", oldDivisionLevel)]
				)
			}

			const desiredRanks = duoCodeFirstData.ranks.filter((item) =>
				duoCodeCurrentDivision.level > 3
					? item.level > duoCodeCurrentRank.level
					: item.level >= duoCodeCurrentRank.level
			)
			const oldDesiredRankLevel =
				duoCodeDesiredRank !== null ? duoCodeDesiredRank.level : 0
			setDuoCodeDesiredRank(null)
			setDuoCodeDesiredRanks(desiredRanks)
			if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) !== -1 &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] !== null
			) {
				setDuoCodeDesiredRank(
					desiredRanks[
						objSearch(desiredRanks, "level", oldDesiredRankLevel)
					]
				)
			} else if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) === -1
			) {
				setDuoCodeDesiredRank(desiredRanks[0])
			}
		}
	}, [
		duoCodeCurrentRank,
		duoCodeDesiredRank,
		duoCodeCurrentDivision,
		duoCodeDesiredDivision,
	])

	useEffect(() => {
		if (duoCodeFirstLoaded) {
			if (duoCodeCurrentRank.level === duoCodeDesiredRank.level) {
				if (duoCodeCurrentDivision.level < 4) {
					const divisions = duoCodeFirstData.ranks[
						objSearch(
							duoCodeFirstData.ranks,
							"value",
							duoCodeDesiredRank.value
						)
					].divisions.filter(
						(item) =>
							item.level > duoCodeCurrentDivision.level &&
							item.level > 1
					)
					const oldDivisionLevel = duoCodeDesiredDivision.level
					setDuoCodeDesiredDivisions(divisions)
					if (
						objSearch(divisions, "level", oldDivisionLevel) !==
							-1 &&
						divisions[
							objSearch(divisions, "level", oldDivisionLevel)
						] &&
						divisions[
							objSearch(divisions, "level", oldDivisionLevel)
						] !== null
					) {
						setDuoCodeDesiredDivision(
							divisions[
								objSearch(divisions, "level", oldDivisionLevel)
							]
						)
					} else {
						setDuoCodeDesiredDivision(divisions[0])
					}
				}
			}

			const desiredRanks = duoCodeFirstData.ranks.filter((item) =>
				duoCodeCurrentDivision.level > 3
					? item.level > duoCodeCurrentRank.level
					: item.level >= duoCodeCurrentRank.level
			)
			const oldDesiredRankLevel =
				duoCodeDesiredRank !== null ? duoCodeDesiredRank.level : 0
			setDuoCodeDesiredRank(null)
			setDuoCodeDesiredRanks(desiredRanks)
			if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) !== -1 &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] !== null
			) {
				setDuoCodeDesiredRank(
					desiredRanks[
						objSearch(desiredRanks, "level", oldDesiredRankLevel)
					]
				)
			} else if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) === -1
			) {
				setDuoCodeDesiredRank(desiredRanks[0])
			}

			setDuoCodeCurrentIcon(duoCodeCurrentDivision.icon)
		}
	}, [
		duoCodeCurrentRank,
		duoCodeDesiredRank,
		duoCodeCurrentDivision,
		duoCodeDesiredDivision,
	])

	useEffect(() => {
		if (duoCodeFirstLoaded) {
			const divisions = duoCodeFirstData.ranks[
				objSearch(
					duoCodeFirstData.ranks,
					"value",
					duoCodeDesiredRank.value
				)
			].divisions.filter((item) =>
				duoCodeCurrentRank.level === duoCodeDesiredRank.level
					? item.level > duoCodeCurrentDivision.level
					: true
			)
			if (duoCodeDesiredDivision) {
				const oldDivisionLevel = duoCodeDesiredDivision.level
				setDuoCodeDesiredDivision(null)
				setDuoCodeDesiredDivisions(divisions)
				if (
					objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
					divisions[
						objSearch(divisions, "level", oldDivisionLevel)
					] &&
					divisions[
						objSearch(divisions, "level", oldDivisionLevel)
					] !== null
				) {
					setDuoCodeDesiredDivision(
						divisions[
							objSearch(divisions, "level", oldDivisionLevel)
						]
					)
				} else {
					setDuoCodeDesiredDivision(divisions[0])
				}
			} else {
				setDuoCodeDesiredDivision(divisions[0])
			}
		}
	}, [
		duoCodeCurrentRank,
		duoCodeDesiredRank,
		duoCodeCurrentDivision,
		duoCodeDesiredDivision,
	])

	useEffect(() => {
		if (duoCodeFirstLoaded && duoCodeDesiredDivision) {
			setDuoCodeDesiredIcon(duoCodeDesiredDivision.icon)
		}
	}, [
		duoCodeCurrentRank,
		duoCodeDesiredRank,
		duoCodeCurrentDivision,
		duoCodeDesiredDivision,
	])

	useEffect(() => {
		if (!duoCodeFirstLoaded) {
			let data = TeamfightTacticsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.duo === 1),
			}
			setDuoCodeFirstData(data)

			setDuoCodeCurrentRanks(
				data.ranks.filter((item) => item.desired === 0)
			)
			setDuoCodeCurrentRank(
				data.ranks.filter((item) => item.desired === 0)[0]
			)
			setDuoCodeCurrentDivisions(
				data.ranks.filter((item) => item.desired === 0)[0].divisions
			)
			setDuoCodeCurrentDivision(
				data.ranks.filter((item) => item.desired === 0)[0].divisions[0]
			)
			setDuoCodeCurrentIcon(
				data.ranks.filter((item) => item.desired === 0)[0].divisions[0]
					.icon
			)

			setDuoCodeDesiredRanks(data.ranks)
			setDuoCodeDesiredRank(data.ranks[0])
			setDuoCodeDesiredDivisions(
				data.ranks[0].divisions.filter((item) => item.level > 1)
			)
			setDuoCodeDesiredDivision(
				data.ranks[0].divisions.filter((item) => item.level > 1)[0]
			)
			setDuoCodeDesiredIcon(
				data.ranks[0].divisions.filter((item) => item.level > 1)[0].icon
			)

			setDuoCodeGameRegions(data.regions)

			setDuoCodeTypeOfDuos(
				data.typeofcustom.filter(
					(item) =>
						item.boost_id === duoCode || item.boost_id === null
				)
			)

			setDuoCodeCurrentLps(
				data.currentlp.filter(
					(item) =>
						item.boost_id === duoCode || item.boost_id === null
				)
			)

			setDuoCodePrice(data.ranks[0].divisions[0].price.toFixed(2))

			setDuoCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const duoCodeCheckPurchase = () => {
		setDuoCodeRequestToPay(true)
		let error = 0
		if (duoCodeGameRegion === undefined || duoCodeGameRegion.length === 0) {
			if (!error) {
				duoCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setDuoCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (duoCodeCurrentLp === undefined || duoCodeCurrentLp.length === 0) {
			if (!error) {
				duoCodeCurrentLpRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setDuoCodeCurrentLpForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (duoCodeTypeOfDuo === undefined || duoCodeTypeOfDuo.length === 0) {
			if (!error) {
				duoCodeTypeOfDuoRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setDuoCodeTypeOfDuoForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setDuoCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const duoCodePurchase = () => {
		if (duoCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/TeamfightTactics/duoCode/makePurchase", {
					code: duoCode,
					currentRank: duoCodeCurrentRank.value,
					currentDivision: duoCodeCurrentDivision.value,
					desiredRank: duoCodeDesiredRank.value,
					desiredDivision: duoCodeDesiredDivision.value,
					gameRegion: duoCodeGameRegion.value,
					typeOfCustom: duoCodeTypeOfDuo.value,
					currentLp: duoCodeCurrentLp.value,
					vipOptions: duoCodeVipOptions,
					promoCode: duoCodePromoCode ? duoCodePromoCode : null,
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
							Current Rank:
						</label>
					</div>
					<div className="col-md-4">
						{duoCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setDuoCodeCurrentRank(
										duoCodeCurrentRanks[
											objSearch(
												duoCodeCurrentRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={duoCodeCurrentRanks}
								value={duoCodeCurrentRank}
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
						{duoCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setDuoCodeCurrentDivision(
										duoCodeCurrentDivisions[
											objSearch(
												duoCodeCurrentDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={duoCodeCurrentDivisions}
								value={duoCodeCurrentDivision}
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
						{duoCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={duoCodeCurrentIcon}
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
					<div className="col-md-2">
						<label
							htmlFor="activity-filter-by"
							style={{ marginBottom: "40px" }}
						>
							Desired Rank:
						</label>
					</div>
					<div className="col-md-4">
						{duoCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setDuoCodeDesiredRank(
										duoCodeDesiredRanks[
											objSearch(
												duoCodeDesiredRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={duoCodeDesiredRanks}
								value={duoCodeDesiredRank}
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
						{duoCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setDuoCodeDesiredDivision(
										duoCodeDesiredDivisions[
											objSearch(
												duoCodeDesiredDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={duoCodeDesiredDivisions}
								value={duoCodeDesiredDivision}
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
						{duoCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={duoCodeDesiredIcon}
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
					<div className="col-md-4">
						{duoCodeFirstLoaded ? (
							<Select
								ref={duoCodeGameRegionRef}
								menuIsOpen={duoCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setDuoCodeGameRegionForce(
										(prevDuoCodeGameRegionForce) => {
											return {
												...prevDuoCodeGameRegionForce,
												menuIsOpen:
													!prevDuoCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setDuoCodeGameRegionForce(
										(prevDuoCodeGameRegionForce) => {
											return {
												...prevDuoCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									duoCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setDuoCodeGameRegion(
										duoCodeGameRegions[
											objSearch(
												duoCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={duoCodeGameRegions}
								value={duoCodeGameRegion}
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
						{duoCodeFirstLoaded ? (
							<Select
								ref={duoCodeCurrentLpRef}
								menuIsOpen={duoCodeCurrentLpForce.menuIsOpen}
								onMenuOpen={() =>
									setDuoCodeCurrentLpForce(
										(prevDuoCodeCurrentLpForce) => {
											return {
												...prevDuoCodeCurrentLpForce,
												menuIsOpen:
													!prevDuoCodeCurrentLpForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setDuoCodeCurrentLpForce(
										(prevDuoCodeCurrentLpForce) => {
											return {
												...prevDuoCodeCurrentLpForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									duoCodeCurrentLpForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Current LP"
								onChange={(e) => {
									setDuoCodeCurrentLp(
										duoCodeCurrentLps[
											objSearch(
												duoCodeCurrentLps,
												"value",
												e.value
											)
										]
									)
								}}
								options={duoCodeCurrentLps}
								value={duoCodeCurrentLp}
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
						{duoCodeFirstLoaded ? (
							<>
								<Select
									id="duoCodePopoverTarget"
									ref={duoCodeTypeOfDuoRef}
									menuIsOpen={
										duoCodeTypeOfDuoForce.menuIsOpen
									}
									onMenuOpen={() =>
										setDuoCodeTypeOfDuoForce(
											(prevDuoCodeTypeOfDuoForce) => {
												return {
													...prevDuoCodeTypeOfDuoForce,
													menuIsOpen:
														!prevDuoCodeTypeOfDuoForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setDuoCodeTypeOfDuoForce(
											(prevDuoCodeTypeOfDuoForce) => {
												return {
													...prevDuoCodeTypeOfDuoForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										duoCodeTypeOfDuoForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of duo"
									onChange={(e) => {
										setDuoCodeTypeOfDuo(
											duoCodeTypeOfDuos[
												objSearch(
													duoCodeTypeOfDuos,
													"value",
													e.value
												)
											]
										)
										setDuoCodeIsPopoverOpen(true)
									}}
									options={duoCodeTypeOfDuos}
									value={duoCodeTypeOfDuo}
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
									isOpen={duoCodeIsPopoverOpen}
									placement="right"
									target="duoCodePopoverTarget"
								>
									<PopoverHeader>
										{duoCodeTypeOfDuo
											? duoCodeTypeOfDuo.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{duoCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={duoCodePromoCodeRef}
							className={
								"form-control text-center" +
								duoCodePromoCodeClass
							}
							onChange={(e) =>
								setDuoCodePromoCode(e.target.value)
							}
							value={duoCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={duoCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={duoCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								duoCodeApplyButtonClass
							}
						>
							<span>{duoCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{duoCodeFirstLoaded &&
			duoCodeFirstData.vip &&
			duoCodeFirstData.vip &&
			duoCodeFirstData.vip.filter(
				(item) => item.boost_id === duoCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{duoCodeFirstLoaded ? (
							duoCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === duoCode ||
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
															setDuoCodeVipOptions(
																(
																	prevDuoCodeVipOptions
																) => {
																	return [
																		...prevDuoCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setDuoCodeVipOptions(
																duoCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setDuoCodeVipPercentage(
																(
																	prevDuoCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevDuoCodeVipPercentage +
																				item.percentage
																		: prevDuoCodeVipPercentage -
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
															  "_" +
															  duoCode
															: "")
													}
													id={
														item.value +
														"-duoCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-duoCode-checkbox-id"
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
							{duoCodePrice} &euro;
							{duoCodePromoCodePercentage &&
							duoCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{duoCodePriceBeforePromoCode} &euro;
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
							onClick={duoCodePurchase}
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

export default Duo

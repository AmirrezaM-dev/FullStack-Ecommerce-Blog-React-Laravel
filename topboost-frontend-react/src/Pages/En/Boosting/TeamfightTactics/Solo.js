import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import { useHistory } from "react-router-dom"

const Solo = () => {
	const soloCode = 1
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

	const [soloFirstLoaded, setSoloFirstLoaded] = useState(false)
	const [soloFirstData, setSoloFirstData] = useState()

	const [soloCurrentRanks, setSoloCurrentRanks] = useState([])
	const [soloCurrentRank, setSoloCurrentRank] = useState()

	const [soloDesiredRanks, setSoloDesiredRanks] = useState([])
	const [soloDesiredRank, setSoloDesiredRank] = useState()

	const [soloCurrentDivisions, setSoloCurrentDivisions] = useState([])
	const [soloCurrentDivision, setSoloCurrentDivision] = useState()

	const [soloDesiredDivisions, setSoloDesiredDivisions] = useState([])
	const [soloDesiredDivision, setSoloDesiredDivision] = useState()

	const [soloCurrentIcon, setSoloCurrentIcon] = useState()
	const [soloDesiredIcon, setSoloDesiredIcon] = useState()

	const [soloGameRegion, setSoloGameRegion] = useState()
	const [soloGameRegions, setSoloGameRegions] = useState()
	const soloGameRegionRef = useRef()
	const [soloGameRegionForce, setSoloGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [soloCurrentLp, setSoloCurrentLp] = useState()
	const [soloCurrentLps, setSoloCurrentLps] = useState()
	const soloCurrentLpRef = useRef()
	const [soloCurrentLpForce, setSoloCurrentLpForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [soloPriceBeforePromoCode, setSoloPriceBeforePromoCode] = useState()

	const [soloVipPercentage, setSoloVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [soloVipOptions, setSoloVipOptions] = useState([])

	const [soloPromoCode, setSoloPromoCode] = useState("")
	const [soloPromoCodePercentage, setSoloPromoCodePercentage] = useState()
	const [soloPromoCodeClass, setSoloPromoCodeClass] = useState("")
	const [soloApplyButton, setSoloApplyButton] = useState("Apply")
	const [soloApplyButtonClass, setSoloApplyButtonClass] = useState()
	const soloPromoCodeRef = useRef()
	const soloApplyPromoCode = () => {
		setSoloPromoCodePercentage(0)
		if (
			soloPromoCode &&
			soloPromoCode.length &&
			soloApplyButton === "Apply"
		) {
			setSoloPromoCodeClass(" forced")
			setSoloApplyButtonClass(" loading")
			setSoloApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/TeamfightTactics/promocode", {
					promocode: soloPromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setSoloPromoCodePercentage(data.percentage)
						setSoloPromoCodeClass(" success")
					} else {
						setSoloPromoCodeClass(" error")
						setSoloPromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setSoloPromoCodeClass(" error")
					setSoloPromoCodePercentage(0)
				})
				.finally(() => {
					setSoloApplyButtonClass("")
					setSoloApplyButton("Apply")
				})
		} else {
			soloPromoCodeRef.current.focus()
			setSoloPromoCodeClass(" forced")
		}
	}
	const soloPromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			soloApplyPromoCode()
		}
	}

	const [soloRequestToPay, setSoloRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [soloPrice, setSoloPrice] = useState(0)

	useEffect(() => {
		if (soloFirstLoaded) {
			let price = 0
			let add_price = 0
			if (soloCurrentRank.level === soloDesiredRank.level) {
				soloCurrentRank.divisions
					.filter(
						(item) =>
							item.level >= soloCurrentDivision.level &&
							item.level < soloDesiredDivision.level
					)
					.map((item) => {
						if (
							soloCurrentLp &&
							item.value === soloCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * soloCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			} else if (soloDesiredRank.level - soloCurrentRank.level === 1) {
				soloCurrentRank.divisions
					.filter((item) => item.level >= soloCurrentDivision.level)
					.map((item) => {
						if (
							soloCurrentLp &&
							item.value === soloCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * soloCurrentLp.percentage
						} else {
							price += item.price
						}
					})
				if (soloDesiredDivision) {
					soloDesiredRank.divisions
						.filter(
							(item) => item.level < soloDesiredDivision.level
						)
						.map((item) => {
							if (
								soloCurrentLp &&
								item.value === soloCurrentDivision.value
							) {
								price +=
									item.price -
									(item.price / 100) *
										soloCurrentLp.percentage
							} else {
								price += item.price
							}
						})
				}
			} else {
				soloCurrentRank.divisions
					.filter((item) => item.level >= soloCurrentDivision.level)
					.map((item) => {
						if (
							soloCurrentLp &&
							item.value === soloCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * soloCurrentLp.percentage
						} else {
							price += item.price
						}
					})
				soloFirstData.ranks
					.filter(
						(item) =>
							item.level > soloCurrentRank.level &&
							item.level < soloDesiredRank.level
					)
					.map((item) => {
						if (
							soloCurrentLp &&
							item.value === soloCurrentDivision.value
						) {
							price +=
								item.sumPrice -
								(item.sumPrice / 100) * soloCurrentLp.percentage
						} else {
							price += item.sumPrice
						}
					})
				soloDesiredRank.divisions
					.filter((item) => item.level < soloDesiredDivision.level)
					.map((item) => {
						if (
							soloCurrentLp &&
							item.value === soloCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) * soloCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			}

			if (soloVipPercentage) {
				add_price = add_price + (price / 100) * soloVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			price = price + add_price

			if (soloPromoCodePercentage) {
				setSoloPriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * soloPromoCodePercentage
			}

			price = price.toFixed(2)

			setSoloPrice(price)
		}
	}, [
		soloCurrentRank,
		soloCurrentDivision,
		soloDesiredRank,
		soloDesiredDivision,
		soloCurrentLp,
		soloVipPercentage,
		soloPromoCodePercentage,
		vipPercentage,
	])

	useEffect(() => {
		if (soloRequestToPay) {
			let error = 0
			if (soloGameRegion && soloGameRegion.length !== 0) {
				setSoloGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setSoloGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (soloCurrentLp && soloCurrentLp.length !== 0) {
				setSoloCurrentLpForce({ menuIsOpen: false, forced: false })
			} else {
				setSoloCurrentLpForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [soloGameRegion, soloCurrentLp])

	useEffect(() => {
		if (soloFirstLoaded) {
			const divisions =
				soloFirstData.ranks[
					objSearch(soloCurrentRanks, "value", soloCurrentRank.value)
				].divisions
			const oldDivisionLevel = soloCurrentDivision.level
			setSoloCurrentDivision(null)
			setSoloCurrentDivisions(divisions)
			if (
				objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] !==
					null
			) {
				setSoloCurrentDivision(
					divisions[objSearch(divisions, "level", oldDivisionLevel)]
				)
			}

			const desiredRanks = soloFirstData.ranks.filter((item) =>
				soloCurrentDivision.level > 3
					? item.level > soloCurrentRank.level
					: item.level >= soloCurrentRank.level
			)
			const oldDesiredRankLevel =
				soloDesiredRank !== null ? soloDesiredRank.level : 0
			setSoloDesiredRank(null)
			setSoloDesiredRanks(desiredRanks)
			if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) !== -1 &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] !== null
			) {
				setSoloDesiredRank(
					desiredRanks[
						objSearch(desiredRanks, "level", oldDesiredRankLevel)
					]
				)
			} else if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) === -1
			) {
				setSoloDesiredRank(desiredRanks[0])
			}
		}
	}, [
		soloCurrentRank,
		soloDesiredRank,
		soloCurrentDivision,
		soloDesiredDivision,
	])

	useEffect(() => {
		if (soloFirstLoaded) {
			if (soloCurrentRank.level === soloDesiredRank.level) {
				if (soloCurrentDivision.level < 4) {
					const divisions = soloFirstData.ranks[
						objSearch(
							soloFirstData.ranks,
							"value",
							soloDesiredRank.value
						)
					].divisions.filter(
						(item) =>
							item.level > soloCurrentDivision.level &&
							item.level > 1
					)
					const oldDivisionLevel = soloDesiredDivision.level
					setSoloDesiredDivisions(divisions)
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
						setSoloDesiredDivision(
							divisions[
								objSearch(divisions, "level", oldDivisionLevel)
							]
						)
					} else {
						setSoloDesiredDivision(divisions[0])
					}
				}
			}

			const desiredRanks = soloFirstData.ranks.filter((item) =>
				soloCurrentDivision.level > 3
					? item.level > soloCurrentRank.level
					: item.level >= soloCurrentRank.level
			)
			const oldDesiredRankLevel =
				soloDesiredRank !== null ? soloDesiredRank.level : 0
			setSoloDesiredRank(null)
			setSoloDesiredRanks(desiredRanks)
			if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) !== -1 &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] !== null
			) {
				setSoloDesiredRank(
					desiredRanks[
						objSearch(desiredRanks, "level", oldDesiredRankLevel)
					]
				)
			} else if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) === -1
			) {
				setSoloDesiredRank(desiredRanks[0])
			}

			setSoloCurrentIcon(soloCurrentDivision.icon)
		}
	}, [
		soloCurrentRank,
		soloDesiredRank,
		soloCurrentDivision,
		soloDesiredDivision,
	])

	useEffect(() => {
		if (soloFirstLoaded) {
			const divisions = soloFirstData.ranks[
				objSearch(soloFirstData.ranks, "value", soloDesiredRank.value)
			].divisions.filter((item) =>
				soloCurrentRank.level === soloDesiredRank.level
					? item.level > soloCurrentDivision.level
					: true
			)
			if (soloDesiredDivision) {
				const oldDivisionLevel = soloDesiredDivision.level
				setSoloDesiredDivision(null)
				setSoloDesiredDivisions(divisions)
				if (
					objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
					divisions[
						objSearch(divisions, "level", oldDivisionLevel)
					] &&
					divisions[
						objSearch(divisions, "level", oldDivisionLevel)
					] !== null
				) {
					setSoloDesiredDivision(
						divisions[
							objSearch(divisions, "level", oldDivisionLevel)
						]
					)
				} else {
					setSoloDesiredDivision(divisions[0])
				}
			} else {
				setSoloDesiredDivision(divisions[0])
			}
		}
	}, [
		soloCurrentRank,
		soloDesiredRank,
		soloCurrentDivision,
		soloDesiredDivision,
	])

	useEffect(() => {
		if (soloFirstLoaded && soloDesiredDivision) {
			setSoloDesiredIcon(soloDesiredDivision.icon)
		}
	}, [
		soloCurrentRank,
		soloDesiredRank,
		soloCurrentDivision,
		soloDesiredDivision,
	])

	useEffect(() => {
		if (!soloFirstLoaded) {
			let data = TeamfightTacticsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.solo === 1),
			}
			setSoloFirstData(data)

			setSoloCurrentRanks(data.ranks.filter((item) => item.desired === 0))
			setSoloCurrentRank(
				data.ranks.filter((item) => item.desired === 0)[0]
			)
			setSoloCurrentDivisions(
				data.ranks.filter((item) => item.desired === 0)[0].divisions
			)
			setSoloCurrentDivision(
				data.ranks.filter((item) => item.desired === 0)[0].divisions[0]
			)
			setSoloCurrentIcon(
				data.ranks.filter((item) => item.desired === 0)[0].divisions[0]
					.icon
			)

			setSoloDesiredRanks(data.ranks)
			setSoloDesiredRank(data.ranks[0])
			setSoloDesiredDivisions(
				data.ranks[0].divisions.filter((item) => item.level > 1)
			)
			setSoloDesiredDivision(
				data.ranks[0].divisions.filter((item) => item.level > 1)[0]
			)
			setSoloDesiredIcon(
				data.ranks[0].divisions.filter((item) => item.level > 1)[0].icon
			)

			setSoloGameRegions(data.regions)

			setSoloCurrentLps(
				data.currentlp.filter(
					(item) =>
						item.boost_id === soloCode || item.boost_id === null
				)
			)

			setSoloPrice(data.ranks[0].divisions[0].price.toFixed(2))

			setSoloFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const soloCheckPurchase = () => {
		setSoloRequestToPay(true)
		let error = 0
		if (soloGameRegion === undefined || soloGameRegion.length === 0) {
			if (!error) {
				soloGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setSoloGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (soloCurrentLp === undefined || soloCurrentLp.length === 0) {
			if (!error) {
				soloCurrentLpRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setSoloCurrentLpForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setSoloRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const soloPurchase = () => {
		if (soloCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/TeamfightTactics/solo/makePurchase", {
					code: soloCode,
					currentRank: soloCurrentRank.value,
					currentDivision: soloCurrentDivision.value,
					desiredRank: soloDesiredRank.value,
					desiredDivision: soloDesiredDivision.value,
					gameRegion: soloGameRegion.value,
					currentLp: soloCurrentLp.value,
					vipOptions: soloVipOptions,
					promoCode: soloPromoCode ? soloPromoCode : null,
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
						{soloFirstLoaded ? (
							<Select
								onChange={(e) => {
									setSoloCurrentRank(
										soloCurrentRanks[
											objSearch(
												soloCurrentRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloCurrentRanks}
								value={soloCurrentRank}
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
						{soloFirstLoaded ? (
							<Select
								onChange={(e) => {
									setSoloCurrentDivision(
										soloCurrentDivisions[
											objSearch(
												soloCurrentDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloCurrentDivisions}
								value={soloCurrentDivision}
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
						{soloFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={soloCurrentIcon}
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
						{soloFirstLoaded ? (
							<Select
								onChange={(e) => {
									setSoloDesiredRank(
										soloDesiredRanks[
											objSearch(
												soloDesiredRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloDesiredRanks}
								value={soloDesiredRank}
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
						{soloFirstLoaded ? (
							<Select
								onChange={(e) => {
									setSoloDesiredDivision(
										soloDesiredDivisions[
											objSearch(
												soloDesiredDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloDesiredDivisions}
								value={soloDesiredDivision}
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
						{soloFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={soloDesiredIcon}
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
						{soloFirstLoaded ? (
							<Select
								ref={soloGameRegionRef}
								menuIsOpen={soloGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setSoloGameRegionForce(
										(prevSoloGameRegionForce) => {
											return {
												...prevSoloGameRegionForce,
												menuIsOpen:
													!prevSoloGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setSoloGameRegionForce(
										(prevSoloGameRegionForce) => {
											return {
												...prevSoloGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									soloGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setSoloGameRegion(
										soloGameRegions[
											objSearch(
												soloGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloGameRegions}
								value={soloGameRegion}
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
						{soloFirstLoaded ? (
							<Select
								ref={soloCurrentLpRef}
								menuIsOpen={soloCurrentLpForce.menuIsOpen}
								onMenuOpen={() =>
									setSoloCurrentLpForce(
										(prevSoloCurrentLpForce) => {
											return {
												...prevSoloCurrentLpForce,
												menuIsOpen:
													!prevSoloCurrentLpForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setSoloCurrentLpForce(
										(prevSoloCurrentLpForce) => {
											return {
												...prevSoloCurrentLpForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									soloCurrentLpForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Current LP"
								onChange={(e) => {
									setSoloCurrentLp(
										soloCurrentLps[
											objSearch(
												soloCurrentLps,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloCurrentLps}
								value={soloCurrentLp}
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
							ref={soloPromoCodeRef}
							className={
								"form-control text-center" + soloPromoCodeClass
							}
							onChange={(e) => setSoloPromoCode(e.target.value)}
							value={soloPromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={soloPromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={soloApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								soloApplyButtonClass
							}
						>
							<span>{soloApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			<div className="col-md-12">
				<div className="row vertical-gap vip-box mt-1">
					{soloFirstLoaded ? (
						soloFirstData.vip
							.filter(
								(item) =>
									item.boost_id === soloCode ||
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
														setSoloVipOptions(
															(
																prevSoloVipOptions
															) => {
																return [
																	...prevSoloVipOptions,
																	item.value,
																]
															}
														)
													} else {
														setSoloVipOptions(
															soloVipOptions.filter(
																(items) =>
																	items !==
																	item.value
															)
														)
													}
													if (item.custom === "") {
														setSoloVipPercentage(
															(
																prevSoloVipPercentage
															) => {
																return e.target
																	.checked
																	? prevSoloVipPercentage +
																			item.percentage
																	: prevSoloVipPercentage -
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
																return e.target
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
														  soloCode
														: "")
												}
												id={
													item.value +
													"-solo-checkbox-id"
												}
											/>
											<label
												className="custom-control-label"
												htmlFor={
													item.value +
													"-solo-checkbox-id"
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
							{soloPrice} &euro;
							{soloPromoCodePercentage &&
							soloPromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{soloPriceBeforePromoCode} &euro;
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
							onClick={soloPurchase}
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

export default Solo

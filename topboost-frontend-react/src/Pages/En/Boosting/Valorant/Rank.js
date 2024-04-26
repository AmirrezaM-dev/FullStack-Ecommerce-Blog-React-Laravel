/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import { useHistory } from "react-router-dom"
import Modal from "react-modal"
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Rank = () => {
	const rankCode = 1
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

	const [rankCodeFirstLoaded, setRankCodeFirstLoaded] = useState(false)
	const [rankCodeFirstData, setRankCodeFirstData] = useState()

	const [rankCodeCurrentRanks, setRankCodeCurrentRanks] = useState([])
	const [rankCodeCurrentRank, setRankCodeCurrentRank] = useState()

	const [rankCodeDesiredRanks, setRankCodeDesiredRanks] = useState([])
	const [rankCodeDesiredRank, setRankCodeDesiredRank] = useState()

	const [rankCodeCurrentDivisions, setRankCodeCurrentDivisions] = useState([])
	const [rankCodeCurrentDivision, setRankCodeCurrentDivision] = useState()

	const [rankCodeDesiredDivisions, setRankCodeDesiredDivisions] = useState([])
	const [rankCodeDesiredDivision, setRankCodeDesiredDivision] = useState()

	const [rankCodeCurrentIcon, setRankCodeCurrentIcon] = useState()
	const [rankCodeDesiredIcon, setRankCodeDesiredIcon] = useState()

	const [rankCodeGameRegion, setRankCodeGameRegion] = useState()
	const [rankCodeGameRegions, setRankCodeGameRegions] = useState()
	const rankCodeGameRegionRef = useRef()
	const [rankCodeGameRegionForce, setRankCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [rankCodeCurrentLp, setRankCodeCurrentLp] = useState()
	const [rankCodeCurrentLps, setRankCodeCurrentLps] = useState()
	const rankCodeCurrentLpRef = useRef()
	const [rankCodeCurrentLpForce, setRankCodeCurrentLpForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [rankCodeTypeOfService, setRankCodeTypeOfService] = useState()
	const [rankCodeTypeOfServices, setRankCodeTypeOfServices] = useState()
	const rankCodeTypeOfServiceRef = useRef()
	const [rankCodeTypeOfServiceForce, setRankCodeTypeOfServiceForce] =
		useState({ menuIsOpen: false, forced: false })
	const [rankCodeTypeOfServiceClassName, setRankCodeTypeOfServiceClassName] =
		useState("col-md-6")

	const [rankCodePopOverContent, setRankCodePopOverContent] = useState()
	const [rankCodeIsPopoverOpen, setRankCodeIsPopoverOpen] = useState(false)
	if (rankCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setRankCodeIsPopoverOpen(false)
		})
	}
	const [rankCodeTypeOfDuo, setRankCodeTypeOfDuo] = useState()
	const [rankCodeTypeOfDuos, setRankCodeTypeOfDuos] = useState()
	const rankCodeTypeOfDuoRef = useRef()
	const [rankCodeTypeOfDuoForce, setRankCodeTypeOfDuoForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [rankCodeTypeOfDuoClassName, setRankCodeTypeOfSDuolassName] =
		useState("d-none")
	useEffect(() => {
		if (rankCodeTypeOfService) {
			setRankCodeTypeOfServiceClassName(
				rankCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "col-md-6"
			)
			setRankCodeTypeOfSDuolassName(
				rankCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "d-none"
			)
		}
	}, [rankCodeTypeOfService])

	const [rankCodePriceBeforePromoCode, setRankCodePriceBeforePromoCode] =
		useState()

	const [rankCodeVipPercentage, setRankCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [rankCodeVipOptions, setRankCodeVipOptions] = useState([])

	const [rankCodeAgents, setRankCodeAgents] = useState()
	const [rankCodeAgent, setRankCodeAgent] = useState([])
	const [rankCodeOnlyOneAgent, setRankCodeOnlyOneAgent] = useState(false)
	const [rankCodeSpecificIsOpen, setRankCodeSpecificIsOpen] = useState()
	const rankCodeResetSpecific = () => {}
	const rankCodeCancelSpecific = (item) => {
		setRankCodeSpecificIsOpen(false)
		setRankCodeAgent(null)
		document.body.style.overflow = "auto"
		document.getElementsByClassName(
			"specific_" + rankCode
		)[0].checked = false
	}
	const rankCodeApplySpecific = () => {
		let error = 0
		if (
			(!rankCodeAgent ||
				rankCodeAgent === null ||
				rankCodeAgent.length < (rankCodeOnlyOneAgent ? 1 : 3)) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(rankCodeOnlyOneAgent ? 1 : 3) +
					" agent for the first role !",
			})
			error = 1
		}
		if (error === 0) {
			setRankCodeSpecificIsOpen(false)
			document.body.style.overflow = "auto"
			document.getElementsByClassName(
				"specific_" + rankCode
			)[0].checked = true
		}
	}
	const rankCodeCustomFunctions = {
		specific: (e) => {
			if (e.target.checked) {
				setRankCodeSpecificIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				rankCodeCancelSpecific(
					rankCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "specific"
					)[0]
				)
			}
		},
	}

	const [rankCodePromoCode, setRankCodePromoCode] = useState("")
	const [rankCodePromoCodePercentage, setRankCodePromoCodePercentage] =
		useState()
	const [rankCodePromoCodeClass, setRankCodePromoCodeClass] = useState("")
	const [rankCodeApplyButton, setRankCodeApplyButton] = useState("Apply")
	const [rankCodeApplyButtonClass, setRankCodeApplyButtonClass] = useState()
	const rankCodePromoCodeRef = useRef()
	const rankCodeApplyPromoCode = () => {
		setRankCodePromoCodePercentage(0)
		if (
			rankCodePromoCode &&
			rankCodePromoCode.length &&
			rankCodeApplyButton === "Apply"
		) {
			setRankCodePromoCodeClass(" forced")
			setRankCodeApplyButtonClass(" loading")
			setRankCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/Valorant/promocode", {
					promocode: rankCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setRankCodePromoCodePercentage(data.percentage)
						setRankCodePromoCodeClass(" success")
					} else {
						setRankCodePromoCodeClass(" error")
						setRankCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setRankCodePromoCodeClass(" error")
					setRankCodePromoCodePercentage(0)
				})
				.finally(() => {
					setRankCodeApplyButtonClass("")
					setRankCodeApplyButton("Apply")
				})
		} else {
			rankCodePromoCodeRef.current.focus()
			setRankCodePromoCodeClass(" forced")
		}
	}
	const rankCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			rankCodeApplyPromoCode()
		}
	}

	const [rankCodeRequestToPay, setRankCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [rankCodePrice, setRankCodePrice] = useState(0)

	useEffect(() => {
		if (rankCodeFirstLoaded) {
			let price = 0
			let add_price = 0
			if (rankCodeCurrentRank.level === rankCodeDesiredRank.level) {
				rankCodeCurrentRank.divisions
					.filter(
						(item) =>
							item.level >= rankCodeCurrentDivision.level &&
							item.level < rankCodeDesiredDivision.level
					)
					.map((item) => {
						if (
							rankCodeCurrentLp &&
							item.value === rankCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) *
									rankCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			} else if (
				rankCodeDesiredRank.level - rankCodeCurrentRank.level ===
				1
			) {
				rankCodeCurrentRank.divisions
					.filter(
						(item) => item.level >= rankCodeCurrentDivision.level
					)
					.map((item) => {
						if (
							rankCodeCurrentLp &&
							item.value === rankCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) *
									rankCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
				rankCodeDesiredRank.divisions
					.filter(
						(item) => item.level < rankCodeDesiredDivision.level
					)
					.map((item) => {
						if (
							rankCodeCurrentLp &&
							item.value === rankCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) *
									rankCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			} else {
				rankCodeCurrentRank.divisions
					.filter(
						(item) => item.level >= rankCodeCurrentDivision.level
					)
					.map((item) => {
						if (
							rankCodeCurrentLp &&
							item.value === rankCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) *
									rankCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
				rankCodeFirstData.ranks
					.filter(
						(item) =>
							item.level > rankCodeCurrentRank.level &&
							item.level < rankCodeDesiredRank.level
					)
					.map((item) => {
						if (
							rankCodeCurrentLp &&
							item.value === rankCodeCurrentDivision.value
						) {
							price +=
								item.sumPrice -
								(item.sumPrice / 100) *
									rankCodeCurrentLp.percentage
						} else {
							price += item.sumPrice
						}
					})
				rankCodeDesiredRank.divisions
					.filter(
						(item) => item.level < rankCodeDesiredDivision.level
					)
					.map((item) => {
						if (
							rankCodeCurrentLp &&
							item.value === rankCodeCurrentDivision.value
						) {
							price +=
								item.price -
								(item.price / 100) *
									rankCodeCurrentLp.percentage
						} else {
							price += item.price
						}
					})
			}

			if (
				rankCodeAgent &&
				rankCodeAgent.length &&
				((rankCodeTypeOfService &&
					rankCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
						-1) ||
					!rankCodeTypeOfService)
			) {
				add_price =
					add_price +
					(price / 100) *
						(!rankCodeOnlyOneAgent
							? rankCodeFirstData.vip.filter(
									(item) =>
										item.custom.toLowerCase() === "specific"
							  )[0].percentage
							: rankCodeFirstData.vip.filter(
									(item) =>
										item.custom.toLowerCase() === "specific"
							  )[0].percentage * 2)
			}

			if (rankCodeTypeOfService) {
				add_price =
					add_price + (price / 100) * rankCodeTypeOfService.percentage
				if (
					rankCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
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
				rankCodeTypeOfDuo &&
				rankCodeTypeOfService &&
				rankCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
			) {
				add_price =
					add_price + (price / 100) * rankCodeTypeOfDuo.percentage
			}

			if (rankCodeVipPercentage) {
				add_price = add_price + (price / 100) * rankCodeVipPercentage
			}

			price = price + add_price

			if (rankCodePromoCodePercentage) {
				setRankCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * rankCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setRankCodePrice(price)
		}
	}, [
		rankCodeCurrentRank,
		rankCodeCurrentDivision,
		rankCodeDesiredRank,
		rankCodeDesiredDivision,
		rankCodeCurrentLp,
		rankCodeVipPercentage,
		rankCodePromoCodePercentage,
		rankCodeTypeOfService,
		rankCodeAgent,
		rankCodeOnlyOneAgent,
		rankCodeTypeOfDuo,
		vipPercentage,
	])

	useEffect(() => {
		if (rankCodeTypeOfDuo) {
			setRankCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						rankCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === rankCode &&
								item.value === rankCodeTypeOfDuo.value
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
	}, [rankCodeTypeOfDuo])

	useEffect(() => {
		if (rankCodeRequestToPay) {
			let error = 0
			if (rankCodeGameRegion && rankCodeGameRegion.length !== 0) {
				setRankCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setRankCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (rankCodeCurrentLp && rankCodeCurrentLp.length !== 0) {
				setRankCodeCurrentLpForce({ menuIsOpen: false, forced: false })
			} else {
				setRankCodeCurrentLpForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (rankCodeTypeOfService && rankCodeTypeOfService.length !== 0) {
				setRankCodeTypeOfServiceForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setRankCodeTypeOfServiceForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				rankCodeTypeOfService &&
				rankCodeTypeOfService.label.toLowerCase().indexOf("duo") !==
					-1 &&
				rankCodeTypeOfDuo &&
				rankCodeTypeOfDuo.length !== 0
			) {
				setRankCodeTypeOfDuoForce({ menuIsOpen: false, forced: false })
			} else {
				setRankCodeTypeOfDuoForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [
		rankCodeGameRegion,
		rankCodeCurrentLp,
		rankCodeTypeOfService,
		rankCodeTypeOfDuo,
	])

	useEffect(() => {
		if (rankCodeFirstLoaded) {
			const divisions =
				rankCodeFirstData.ranks[
					objSearch(
						rankCodeCurrentRanks,
						"value",
						rankCodeCurrentRank.value
					)
				].divisions
			const oldDivisionLevel = rankCodeCurrentDivision.level
			setRankCodeCurrentDivision(null)
			setRankCodeCurrentDivisions(divisions)
			if (
				objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] !==
					null
			) {
				setRankCodeCurrentDivision(
					divisions[objSearch(divisions, "level", oldDivisionLevel)]
				)
			}

			const desiredRanks = rankCodeFirstData.ranks.filter((item) =>
				rankCodeCurrentDivision.level > 3
					? item.level > rankCodeCurrentRank.level
					: item.level >= rankCodeCurrentRank.level
			)
			const oldDesiredRankLevel =
				rankCodeDesiredRank !== null ? rankCodeDesiredRank.level : 0
			setRankCodeDesiredRank(null)
			setRankCodeDesiredRanks(desiredRanks)
			if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) !== -1 &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] !== null
			) {
				setRankCodeDesiredRank(
					desiredRanks[
						objSearch(desiredRanks, "level", oldDesiredRankLevel)
					]
				)
			} else if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) === -1
			) {
				setRankCodeDesiredRank(desiredRanks[0])
			}
		}
	}, [rankCodeCurrentRank])

	useEffect(() => {
		if (rankCodeFirstLoaded) {
			if (rankCodeCurrentRank.level === rankCodeDesiredRank.level) {
				if (rankCodeCurrentDivision.level < 4) {
					const divisions = rankCodeFirstData.ranks[
						objSearch(
							rankCodeFirstData.ranks,
							"value",
							rankCodeDesiredRank.value
						)
					].divisions.filter(
						(item) =>
							item.level > rankCodeCurrentDivision.level &&
							item.level > 1
					)
					const oldDivisionLevel = rankCodeDesiredDivision.level
					setRankCodeDesiredDivisions(divisions)
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
						setRankCodeDesiredDivision(
							divisions[
								objSearch(divisions, "level", oldDivisionLevel)
							]
						)
					} else {
						setRankCodeDesiredDivision(divisions[0])
					}
				}
			}

			const desiredRanks = rankCodeFirstData.ranks.filter((item) =>
				rankCodeCurrentDivision.level > 3
					? item.level > rankCodeCurrentRank.level
					: item.level >= rankCodeCurrentRank.level
			)
			const oldDesiredRankLevel =
				rankCodeDesiredRank !== null ? rankCodeDesiredRank.level : 0
			setRankCodeDesiredRank(null)
			setRankCodeDesiredRanks(desiredRanks)
			if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) !== -1 &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] &&
				desiredRanks[
					objSearch(desiredRanks, "level", oldDesiredRankLevel)
				] !== null
			) {
				setRankCodeDesiredRank(
					desiredRanks[
						objSearch(desiredRanks, "level", oldDesiredRankLevel)
					]
				)
			} else if (
				objSearch(desiredRanks, "level", oldDesiredRankLevel) === -1
			) {
				setRankCodeDesiredRank(desiredRanks[0])
			}

			setRankCodeCurrentIcon(rankCodeCurrentDivision.icon)
		}
	}, [rankCodeCurrentDivision])

	useEffect(() => {
		if (rankCodeFirstLoaded) {
			const divisions = rankCodeFirstData.ranks[
				objSearch(
					rankCodeFirstData.ranks,
					"value",
					rankCodeDesiredRank.value
				)
			].divisions.filter((item) =>
				rankCodeCurrentRank.level === rankCodeDesiredRank.level
					? item.level > rankCodeCurrentDivision.level
					: true
			)
			const oldDivisionLevel = rankCodeDesiredDivision.level
			setRankCodeDesiredDivision(null)
			setRankCodeDesiredDivisions(divisions)
			if (
				objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] !==
					null
			) {
				setRankCodeDesiredDivision(
					divisions[objSearch(divisions, "level", oldDivisionLevel)]
				)
			} else {
				setRankCodeDesiredDivision(divisions[0])
			}
		}
	}, [rankCodeDesiredRank])

	useEffect(() => {
		if (rankCodeFirstLoaded) {
			setRankCodeDesiredIcon(rankCodeDesiredDivision.icon)
		}
	}, [rankCodeDesiredDivision])

	useEffect(() => {
		if (!rankCodeFirstLoaded) {
			let data = ValorantApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.rank === 1),
			}

			setRankCodeFirstData(data)

			setRankCodeCurrentRanks(
				data.ranks.filter((item) => item.desired === 0)
			)
			setRankCodeCurrentRank(
				data.ranks.filter((item) => item.desired === 0)[0]
			)
			setRankCodeCurrentDivisions(
				data.ranks.filter((item) => item.desired === 0)[0].divisions
			)
			setRankCodeCurrentDivision(
				data.ranks.filter((item) => item.desired === 0)[0].divisions[0]
			)
			setRankCodeCurrentIcon(
				data.ranks.filter((item) => item.desired === 0)[0].divisions[0]
					.icon
			)

			setRankCodeDesiredRanks(data.ranks)
			setRankCodeDesiredRank(data.ranks[0])
			setRankCodeDesiredDivisions(
				data.ranks[0].divisions.filter((item) => item.level > 1)
			)
			setRankCodeDesiredDivision(
				data.ranks[0].divisions.filter((item) => item.level > 1)[0]
			)
			setRankCodeDesiredIcon(
				data.ranks[0].divisions.filter((item) => item.level > 1)[0].icon
			)

			setRankCodeGameRegions(data.regions)

			setRankCodeCurrentLps(
				data.currentlp.filter(
					(item) =>
						item.boost_id === rankCode || item.boost_id === null
				)
			)

			setRankCodeAgents(data.agents)

			setRankCodeTypeOfServices(
				data.typeofservice.filter(
					(item) =>
						item.boost_id === rankCode || item.boost_id === null
				)
			)

			setRankCodeTypeOfDuos(
				data.typeofcustom.filter(
					(item) =>
						item.boost_id === rankCode || item.boost_id === null
				)
			)

			setRankCodePrice(data.ranks[0].divisions[0].price.toFixed(2))

			setRankCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const rankCodeCheckPurchase = () => {
		setRankCodeRequestToPay(true)
		let error = 0
		if (
			rankCodeGameRegion === undefined ||
			rankCodeGameRegion.length === 0
		) {
			if (!error) {
				rankCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setRankCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (rankCodeCurrentLp === undefined || rankCodeCurrentLp.length === 0) {
			if (!error) {
				rankCodeCurrentLpRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setRankCodeCurrentLpForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			rankCodeTypeOfService === undefined ||
			rankCodeTypeOfService.length === 0
		) {
			if (!error) {
				rankCodeTypeOfServiceRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setRankCodeTypeOfServiceForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			(rankCodeTypeOfService &&
				rankCodeTypeOfService.label.toLowerCase().indexOf("duo") !==
					-1 &&
				!rankCodeTypeOfDuo) ||
			(rankCodeTypeOfDuo && rankCodeTypeOfDuo.length === 0)
		) {
			if (!error) {
				rankCodeTypeOfDuoRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setRankCodeTypeOfDuoForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setRankCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const rankCodePurchase = () => {
		if (rankCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/Valorant/rankCode/makePurchase", {
					code: rankCode,
					currentRank: rankCodeCurrentRank.value,
					currentDivision: rankCodeCurrentDivision.value,
					desiredRank: rankCodeDesiredRank.value,
					desiredDivision: rankCodeDesiredDivision.value,
					typeOfService: rankCodeTypeOfService.value,
					typeOfCustom: rankCodeTypeOfDuo
						? rankCodeTypeOfDuo.value
						: null,
					agents: rankCodeAgent ? rankCodeAgent : null,
					onlyOneAgent: rankCodeOnlyOneAgent
						? rankCodeOnlyOneAgent
						: false,
					gameRegion: rankCodeGameRegion.value,
					currentLp: rankCodeCurrentLp.value,
					vipOptions: rankCodeVipOptions,
					promoCode: rankCodePromoCode ? rankCodePromoCode : null,
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
				isOpen={rankCodeSpecificIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={rankCodeResetSpecific}
				onRequestClose={() =>
					rankCodeCancelSpecific(
						rankCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{rankCodeFirstLoaded ? (
					<>
						<div className="vip-modal">
							<h2 className="col-12 vip-modal-header">
								Select your agents (
								{
									rankCodeFirstData.vip.filter(
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
											setRankCodeAgent(e)
										}}
										options={rankCodeAgents}
										value={rankCodeAgent}
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
												setRankCodeOnlyOneAgent(
													e.target.checked
												)
											}
											type="checkbox"
											className="custom-control-input"
											id={"onlyOneAgent-checkbox-id"}
											checked={rankCodeOnlyOneAgent}
										/>
										<label
											className="custom-control-label"
											htmlFor={"onlyOneAgent-checkbox-id"}
										>
											Select only 1 agent (+
											{
												rankCodeFirstData.vip.filter(
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
											rankCodeCancelSpecific(
												rankCodeFirstData.vip.filter(
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
										onClick={rankCodeApplySpecific}
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
						{rankCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setRankCodeCurrentRank(
										rankCodeCurrentRanks[
											objSearch(
												rankCodeCurrentRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeCurrentRanks}
								value={rankCodeCurrentRank}
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
						{rankCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setRankCodeCurrentDivision(
										rankCodeCurrentDivisions[
											objSearch(
												rankCodeCurrentDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeCurrentDivisions}
								value={rankCodeCurrentDivision}
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
						{rankCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={rankCodeCurrentIcon}
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
						{rankCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setRankCodeDesiredRank(
										rankCodeDesiredRanks[
											objSearch(
												rankCodeDesiredRanks,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeDesiredRanks}
								value={rankCodeDesiredRank}
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
						{rankCodeFirstLoaded ? (
							<Select
								onChange={(e) => {
									setRankCodeDesiredDivision(
										rankCodeDesiredDivisions[
											objSearch(
												rankCodeDesiredDivisions,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeDesiredDivisions}
								value={rankCodeDesiredDivision}
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
						{rankCodeFirstLoaded ? (
							<img
								alt=""
								className="rank-icon"
								src={rankCodeDesiredIcon}
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
						{rankCodeFirstLoaded ? (
							<Select
								ref={rankCodeGameRegionRef}
								menuIsOpen={rankCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setRankCodeGameRegionForce(
										(prevRankCodeGameRegionForce) => {
											return {
												...prevRankCodeGameRegionForce,
												menuIsOpen:
													!prevRankCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setRankCodeGameRegionForce(
										(prevRankCodeGameRegionForce) => {
											return {
												...prevRankCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									rankCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setRankCodeGameRegion(
										rankCodeGameRegions[
											objSearch(
												rankCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeGameRegions}
								value={rankCodeGameRegion}
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
						{rankCodeFirstLoaded ? (
							<Select
								ref={rankCodeCurrentLpRef}
								menuIsOpen={rankCodeCurrentLpForce.menuIsOpen}
								onMenuOpen={() =>
									setRankCodeCurrentLpForce(
										(prevRankCodeCurrentLpForce) => {
											return {
												...prevRankCodeCurrentLpForce,
												menuIsOpen:
													!prevRankCodeCurrentLpForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setRankCodeCurrentLpForce(
										(prevRankCodeCurrentLpForce) => {
											return {
												...prevRankCodeCurrentLpForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									rankCodeCurrentLpForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Current LP"
								onChange={(e) => {
									setRankCodeCurrentLp(
										rankCodeCurrentLps[
											objSearch(
												rankCodeCurrentLps,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeCurrentLps}
								value={rankCodeCurrentLp}
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
					<div className={rankCodeTypeOfServiceClassName}>
						{rankCodeFirstLoaded ? (
							<Select
								ref={rankCodeTypeOfServiceRef}
								menuIsOpen={
									rankCodeTypeOfServiceForce.menuIsOpen
								}
								onMenuOpen={() =>
									setRankCodeTypeOfServiceForce(
										(prevRankCodeTypeOfServiceForce) => {
											return {
												...prevRankCodeTypeOfServiceForce,
												menuIsOpen:
													!prevRankCodeTypeOfServiceForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setRankCodeTypeOfServiceForce(
										(prevRankCodeTypeOfServiceForce) => {
											return {
												...prevRankCodeTypeOfServiceForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									rankCodeTypeOfServiceForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of service"
								onChange={(e) => {
									setRankCodeTypeOfService(
										rankCodeTypeOfServices[
											objSearch(
												rankCodeTypeOfServices,
												"value",
												e.value
											)
										]
									)
								}}
								options={rankCodeTypeOfServices}
								value={rankCodeTypeOfService}
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
					<div className={rankCodeTypeOfDuoClassName}>
						{rankCodeFirstLoaded ? (
							<>
								<Select
									id="rankCodePopoverTarget"
									ref={rankCodeTypeOfDuoRef}
									menuIsOpen={
										rankCodeTypeOfDuoForce.menuIsOpen
									}
									onMenuOpen={() =>
										setRankCodeTypeOfDuoForce(
											(prevRankCodeTypeOfDuoForce) => {
												return {
													...prevRankCodeTypeOfDuoForce,
													menuIsOpen:
														!prevRankCodeTypeOfDuoForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setRankCodeTypeOfDuoForce(
											(prevRankCodeTypeOfDuoForce) => {
												return {
													...prevRankCodeTypeOfDuoForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										rankCodeTypeOfDuoForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of duo"
									onChange={(e) => {
										setRankCodeTypeOfDuo(
											rankCodeTypeOfDuos[
												objSearch(
													rankCodeTypeOfDuos,
													"value",
													e.value
												)
											]
										)
										setRankCodeIsPopoverOpen(true)
									}}
									options={rankCodeTypeOfDuos}
									value={rankCodeTypeOfDuo}
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
									isOpen={rankCodeIsPopoverOpen}
									placement="right"
									target="rankCodePopoverTarget"
								>
									<PopoverHeader>
										{rankCodeTypeOfDuo
											? rankCodeTypeOfDuo.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{rankCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={rankCodePromoCodeRef}
							className={
								"form-control text-center" +
								rankCodePromoCodeClass
							}
							onChange={(e) =>
								setRankCodePromoCode(e.target.value)
							}
							value={rankCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={rankCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={rankCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								rankCodeApplyButtonClass
							}
						>
							<span>{rankCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			<div className="col-md-12">
				<div className="row vertical-gap vip-box mt-1">
					{rankCodeFirstLoaded ? (
						rankCodeFirstData.vip
							.filter(
								(item) =>
									item.boost_id === rankCode ||
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
													rankCodeTypeOfService !==
														undefined &&
													rankCodeTypeOfService.label
														.toLowerCase()
														.indexOf("duo") !==
														-1 &&
													item.custom !== ""
												}
												onChange={(e) => {
													if (e.target.checked) {
														setRankCodeVipOptions(
															(
																prevRankCodeVipOptions
															) => {
																return [
																	...prevRankCodeVipOptions,
																	item.value,
																]
															}
														)
													} else {
														setRankCodeVipOptions(
															rankCodeVipOptions.filter(
																(items) =>
																	items !==
																	item.value
															)
														)
													}
													if (item.custom === "") {
														setRankCodeVipPercentage(
															(
																prevRankCodeVipPercentage
															) => {
																return e.target
																	.checked
																	? prevRankCodeVipPercentage +
																			item.percentage
																	: prevRankCodeVipPercentage -
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
													if (
														rankCodeCustomFunctions[
															item.custom
														]
													) {
														rankCodeCustomFunctions[
															item.custom
														](e, item)
													}
												}}
												type="checkbox"
												className={
													"custom-control-input " +
													(item.custom.length
														? item.custom +
														  "_" +
														  rankCode
														: "")
												}
												id={
													item.value +
													"-rankCode-checkbox-id"
												}
											/>
											<label
												className="custom-control-label"
												htmlFor={
													item.value +
													"-rankCode-checkbox-id"
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
							{rankCodePrice} &euro;
							{rankCodePromoCodePercentage &&
							rankCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{rankCodePriceBeforePromoCode} &euro;
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
							onClick={rankCodePurchase}
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

export default Rank

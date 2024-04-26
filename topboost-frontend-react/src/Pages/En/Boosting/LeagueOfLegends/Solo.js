import React, { useEffect, useState, useRef } from "react"
import Select from "react-select"
import Loader from "react-loader-spinner"
import { useContexts } from "../../../../Contexts"
import Modal from "react-modal"
import { useHistory } from "react-router-dom"

const Solo = () => {
	const soloCode = 1
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

	const [soloTypeOfQueue, setSoloTypeOfQueue] = useState()
	const [soloTypeOfQueues, setSoloTypeOfQueues] = useState()
	const soloTypeOfQueueRef = useRef()
	const [soloTypeOfQueueForce, setSoloTypeOfQueueForce] = useState({
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

	const [soloChampions, setSoloChampions] = useState()
	const [soloRoles, setSoloRoles] = useState()
	const [soloFirstRole, setSoloFirstRole] = useState("")
	const [soloFirstChampion, setSoloFirstChampion] = useState([])
	const [soloOnlyOneChampion, setSoloOnlyOneChampion] = useState(false)
	const [soloSecondRole, setSoloSecondRole] = useState()
	const [soloSecondChampion, setSoloSecondChampion] = useState([])
	const [soloSpecificIsOpen, setSoloSpecificIsOpen] = useState()
	const [soloSpecificPercentage, setSoloSpecificPercentage] = useState({
		onlyOne: 0,
		firstChamp: 0,
		secondChamp: 0,
	})
	const soloResetSpecific = () => {
		if (soloSecondRole === undefined || soloSecondRole.length === 0) {
			setSoloSecondRole(
				soloRoles.filter(
					(item) => item.label.toLowerCase() === "fill"
				)[0]
			)
		}
	}
	const soloCancelSpecific = (item) => {
		setSoloSpecificIsOpen(false)
		setSoloSpecificPercentage({ onlyOne: 0, firstChamp: 0, secondChamp: 0 })
		document.body.style.overflow = "auto"
		document.getElementsByClassName(
			"specific_" + soloCode
		)[0].checked = false
	}
	const soloApplySpecific = () => {
		let error = 0
		if (
			(soloFirstRole === undefined || soloFirstRole.length === 0) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title: "Please select first role.",
			})
			error = 1
		}
		if (
			(soloFirstChampion === undefined ||
				soloFirstChampion.length < (soloOnlyOneChampion ? 1 : 3)) &&
			soloFirstChampion &&
			soloFirstChampion.length !== 0 &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(soloOnlyOneChampion ? 1 : 3) +
					" champions for the first role !",
			})
			error = 1
		}
		if (
			(soloSecondRole === undefined || soloSecondRole.length === 0) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title: "Please select second role.",
			})
			error = 1
		}
		if (
			(soloSecondChampion === undefined ||
				soloSecondChampion.length < (soloOnlyOneChampion ? 1 : 3)) &&
			soloSecondChampion &&
			soloSecondChampion.length !== 0 &&
			soloSecondRole.label.toLowerCase() !== "fill" &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(soloOnlyOneChampion ? 1 : 3) +
					" champions for the second role !",
			})
			error = 1
		}
		if (error === 0) {
			setSoloSpecificPercentage({
				onlyOne: 0,
				firstChamp: 0,
				secondChamp: 0,
			})

			if (soloFirstChampion && soloFirstChampion.length !== 0) {
				setSoloSpecificPercentage((prevSoloSpecificPercentage) => {
					return {
						...prevSoloSpecificPercentage,
						firstChamp: soloFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0].percentage,
					}
				})
			}
			if (soloSecondChampion && soloSecondChampion.length !== 0) {
				setSoloSpecificPercentage((prevSoloSpecificPercentage) => {
					return {
						...prevSoloSpecificPercentage,
						secondChamp: soloFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0].percentage,
					}
				})
			}
			if (
				soloOnlyOneChampion &&
				soloOnlyOneChampion &&
				((soloFirstChampion && soloFirstChampion.length !== 0) ||
					(soloSecondChampion && soloSecondChampion.length !== 0))
			) {
				setSoloSpecificPercentage((prevSoloSpecificPercentage) => {
					return {
						...prevSoloSpecificPercentage,
						onlyOne: soloFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0].percentage,
					}
				})
			}

			setSoloSpecificIsOpen(false)
			document.body.style.overflow = "auto"
			document.getElementsByClassName(
				"specific_" + soloCode
			)[0].checked = true
		}
	}

	const [soloFlashLocationIsOpen, setSoloFlashLocationIsOpen] =
		useState(false)
	const [soloFlashLocation, setSoloFlashLocation] = useState("")
	const [soloFlashLocationActive, setSoloFlashLocationActive] =
		useState(false)
	const soloResetFlashLocation = () => {}
	const soloCancelFlashLocation = (item) => {
		setSoloFlashLocationIsOpen(false)
		setSoloFlashLocationActive(false)
		document.body.style.overflow = "auto"
		document.getElementsByClassName("flash_" + soloCode)[0].checked = false
	}
	const soloApplyFlashLocation = () => {
		if (soloFlashLocation && soloFlashLocation !== "") {
			setSoloFlashLocationIsOpen(false)
			setSoloFlashLocationActive(true)
			document.body.style.overflow = "auto"
		} else {
			Toast.fire({
				icon: "error",
				title: "Please select flash location.",
			})
		}
	}

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
				.post("/LeagueOfLegends/promocode", {
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

	const soloCustomFunctions = {
		specific: (e) => {
			if (e.target.checked) {
				setSoloSpecificIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				soloCancelSpecific(
					soloFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "specific"
					)[0]
				)
			}
		},
		flash: (e) => {
			if (e.target.checked) {
				setSoloFlashLocationIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				soloCancelFlashLocation(
					soloFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "flash"
					)[0]
				)
			}
		},
	}

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
				soloDesiredRank.divisions
					.filter(
						(item) =>
							soloDesiredDivision &&
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

			if (soloTypeOfQueue) {
				add_price =
					add_price + (price / 100) * soloTypeOfQueue.percentage
			}

			if (soloVipPercentage) {
				add_price = add_price + (price / 100) * soloVipPercentage
			}

			if (vipPercentage) {
				add_price = add_price + (price / 100) * vipPercentage
			}

			if (
				soloSpecificPercentage &&
				(soloTypeOfQueue === undefined ||
					soloTypeOfQueue.label.toLowerCase().indexOf("duo") === -1)
			) {
				add_price =
					add_price + (price / 100) * soloSpecificPercentage.onlyOne
				add_price =
					add_price +
					(price / 100) * soloSpecificPercentage.firstChamp
				if (
					!soloSecondRole ||
					soloSecondRole.label.toLowerCase().indexOf("fill") === -1
				) {
					add_price =
						add_price +
						(price / 100) * soloSpecificPercentage.secondChamp
				}
			}

			if (
				soloFlashLocationActive &&
				(soloTypeOfQueue === undefined ||
					soloTypeOfQueue.label.toLowerCase().indexOf("duo") === -1)
			) {
				add_price =
					add_price +
					(price / 100) *
						soloFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0].percentage
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
		soloTypeOfQueue,
		soloCurrentLp,
		soloVipPercentage,
		soloPromoCodePercentage,
		soloSpecificPercentage,
		soloFlashLocationActive,
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
			if (soloTypeOfQueue && soloTypeOfQueue.length !== 0) {
				setSoloTypeOfQueueForce({ menuIsOpen: false, forced: false })
			} else {
				setSoloTypeOfQueueForce({
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
	}, [soloGameRegion, soloTypeOfQueue, soloCurrentLp])

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
			const oldDivisionLevel = soloDesiredDivision
				? soloDesiredDivision.level
				: null
			setSoloDesiredDivision(null)
			setSoloDesiredDivisions(divisions)
			if (
				objSearch(divisions, "level", oldDivisionLevel) !== -1 &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] &&
				divisions[objSearch(divisions, "level", oldDivisionLevel)] !==
					null
			) {
				setSoloDesiredDivision(
					divisions[objSearch(divisions, "level", oldDivisionLevel)]
				)
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
		if (soloFirstLoaded) {
			if (soloDesiredDivision)
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
			let data = LeagueOfLegendsApi
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

			setSoloTypeOfQueues(
				data.typeofqueue.filter(
					(item) =>
						item.boost_id === soloCode || item.boost_id === null
				)
			)

			setSoloCurrentLps(
				data.currentlp.filter(
					(item) =>
						item.boost_id === soloCode || item.boost_id === null
				)
			)

			setSoloChampions(data.champions)

			setSoloRoles(data.roles)

			setSoloPrice(data.ranks[0].divisions[0].price.toFixed(2))

			setSoloFirstLoaded(true)
		}
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
		if (soloTypeOfQueue === undefined || soloTypeOfQueue.length === 0) {
			if (!error) {
				soloTypeOfQueueRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setSoloTypeOfQueueForce({
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
				.post("/LeagueOfLegends/solo/makePurchase", {
					code: soloCode,
					currentRank: soloCurrentRank.value,
					currentDivision: soloCurrentDivision.value,
					desiredRank: soloDesiredRank.value,
					desiredDivision: soloDesiredDivision.value,
					gameRegion: soloGameRegion.value,
					typeOfQueue: soloTypeOfQueue.value,
					currentLp: soloCurrentLp.value,
					specificFirstRole: soloFirstRole
						? soloFirstRole.value
						: null,
					specificFirstChampion: soloFirstChampion
						? soloFirstChampion
						: null,
					onlyOneChampion: soloOnlyOneChampion
						? soloOnlyOneChampion
						: false,
					specificSecondRole: soloSecondRole
						? soloSecondRole.value
						: null,
					specificSecondChampion: soloSecondChampion
						? soloSecondChampion
						: null,
					flashLocation: soloFlashLocation ? soloFlashLocation : null,
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
			<Modal
				isOpen={soloSpecificIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={soloResetSpecific}
				onRequestClose={() =>
					soloCancelSpecific(
						soloFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{soloFirstLoaded ? (
					<>
						<div className="vip-modal">
							<h2 className="col-12 vip-modal-header">
								Select first role&nbsp;
								<span className="free-label">FREE</span>
							</h2>
							<div className="row vertical-gap pl-10 pr-10">
								<div className="col-12 row ml-auto mr-auto">
									{soloRoles
										.filter(
											(item) =>
												item.label.toLowerCase() !==
												"fill"
										)
										.map((item, key) => (
											<div
												key={key}
												className={
													"cursor-pointer col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 p-5 mb-5 mt-5 " +
													(key !== 0 &&
													key !==
														soloRoles.filter(
															(item) =>
																item.label.toLowerCase() !==
																"fill"
														).length -
															1
														? "mr-0 ml-0"
														: key === 0
														? "mr-0 ml-auto"
														: "mr-auto ml-0")
												}
											>
												<div
													className={
														"vip-role card-body p-10 pb-0 pt-7 ml-10 mr-10 " +
														(soloFirstRole.value ===
														item.value
															? "selected"
															: "")
													}
													onClick={() => {
														setSoloFirstRole(item)
														if (
															soloSecondRole &&
															item.value ===
																soloSecondRole.value
														) {
															setSoloSecondRole(
																""
															)
														}
													}}
												>
													<h6 className="card-title text-center mb-0">
														{item.label}
													</h6>
													<img
														className="card-img p-10"
														src={item.icon}
														alt={item.label}
													/>
												</div>
											</div>
										))}
								</div>
							</div>
							<div className="nk-gap-2" />
							{soloFirstRole && soloFirstRole !== "" ? (
								<>
									<h2 className="col-12 vip-modal-header">
										Select champion for&nbsp;
										{soloFirstRole.label} role (+
										{
											soloFirstData.vip.filter(
												(item) =>
													item.custom.toLowerCase() ===
													"specific"
											)[0].percentage
										}
										%)&nbsp;
										<span className="free-label">
											OPTIONAL
										</span>
									</h2>
									<div className="row vertical-gap pl-10 pr-10">
										<div className="col-12">
											{soloFirstLoaded ? (
												<Select
													placeholder="Select Champion"
													onChange={(e) => {
														setSoloFirstChampion(e)
													}}
													options={soloChampions}
													value={soloFirstChampion}
													isMulti
													closeMenuOnSelect={false}
													isSearchable={true}
													styles={customStyles}
													theme={(theme) => ({
														...theme,
														borderRadius: 0,
														colors: {
															...theme.colors,
															primary25:
																"#0275d8 ",
															primary: "#2953b1",
															primary50: "none",
														},
													})}
												/>
											) : (
												<LoadingSelect />
											)}
										</div>
										{soloFirstLoaded ? (
											<div className="col-12 pt-10 pb-10">
												<div className="custom-control custom-checkbox">
													<input
														onChange={(e) =>
															setSoloOnlyOneChampion(
																e.target.checked
															)
														}
														type="checkbox"
														className="custom-control-input"
														id={
															"onlyOneChampion-checkbox-id"
														}
														checked={
															soloOnlyOneChampion
														}
													/>
													<label
														className="custom-control-label"
														htmlFor={
															"onlyOneChampion-checkbox-id"
														}
													>
														Select only 1 champion
														(+
														{
															soloFirstData.vip.filter(
																(item) =>
																	item.custom.toLowerCase() ===
																	"specific"
															)[0].percentage
														}
														%)
													</label>
												</div>
											</div>
										) : (
											<LoadingCheckbox />
										)}
									</div>
									<div className="nk-gap-2" />
									<h2 className="col-12 vip-modal-header">
										Select second role&nbsp;
										<span className="free-label">FREE</span>
									</h2>
									<div className="row vertical-gap pl-10 pr-10">
										<div className="col-12 row ml-auto mr-auto">
											{soloRoles
												.filter(
													(item) =>
														item.value !==
														soloFirstRole.value
												)
												.map((item, key) => (
													<div
														key={key}
														className={
															"cursor-pointer col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 p-5 mb-5 mt-5 " +
															(key !== 0 &&
															key !==
																soloRoles.filter(
																	(item) =>
																		item.label.toLowerCase() !==
																		"fill"
																).length -
																	1
																? "mr-0 ml-0"
																: key === 0
																? "mr-0 ml-auto"
																: "mr-auto ml-0")
														}
													>
														<div
															className={
																"vip-role card-body p-10 pb-0 pt-7 ml-10 mr-10 " +
																(soloSecondRole &&
																soloSecondRole.value ===
																	item.value
																	? "selected"
																	: "")
															}
															onClick={() =>
																setSoloSecondRole(
																	item
																)
															}
														>
															<h6 className="card-title text-center mb-0">
																{item.label}
															</h6>
															<img
																className="card-img p-10"
																src={item.icon}
																alt={item.label}
															/>
														</div>
													</div>
												))}
										</div>
									</div>
									<div className="nk-gap-2" />
									{soloSecondRole &&
									soloSecondRole !== "" &&
									(soloSecondRole
										? soloSecondRole.label.toLowerCase() !==
										  "fill"
										: true) ? (
										<>
											<h2 className="col-12 vip-modal-header">
												Select champion for&nbsp;
												{soloSecondRole.label} role (+
												{
													soloFirstData.vip.filter(
														(item) =>
															item.custom.toLowerCase() ===
															"specific"
													)[0].percentage
												}
												%)&nbsp;
												<span className="free-label">
													OPTIONAL
												</span>
											</h2>
											<div className="row vertical-gap pl-10 pr-10">
												<div className="col-12">
													{soloFirstLoaded ? (
														<Select
															placeholder="Select Champion"
															onChange={(e) => {
																setSoloSecondChampion(
																	e
																)
															}}
															options={
																soloChampions
															}
															value={
																soloSecondChampion
															}
															isMulti
															closeMenuOnSelect={
																false
															}
															isSearchable={true}
															styles={
																customStyles
															}
															theme={(theme) => ({
																...theme,
																borderRadius: 0,
																colors: {
																	...theme.colors,
																	primary25:
																		"#0275d8 ",
																	primary:
																		"#2953b1",
																	primary50:
																		"none",
																},
															})}
														/>
													) : (
														<LoadingSelect />
													)}
												</div>
											</div>
											<div className="nk-gap-2" />
										</>
									) : (
										<></>
									)}
								</>
							) : (
								<></>
							)}
							<div className="row vertical-gap pl-10 pr-10">
								<div className="col-4 ml-auto">
									<button
										className="save-btn cancel"
										onClick={() =>
											soloCancelSpecific(
												soloFirstData.vip.filter(
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
										onClick={soloApplySpecific}
									>
										Save
									</button>
								</div>
							</div>
							<div className="nk-gap-2" />
						</div>
					</>
				) : (
					<></>
				)}
			</Modal>
			<Modal
				isOpen={soloFlashLocationIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={soloResetFlashLocation}
				onRequestClose={() =>
					soloCancelFlashLocation(
						soloFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{soloFirstLoaded ? (
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
											(soloFlashLocation === "D"
												? "selected"
												: "")
										}
										onClick={() => {
											setSoloFlashLocation("D")
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
											(soloFlashLocation === "F"
												? "selected"
												: "")
										}
										onClick={() => {
											setSoloFlashLocation("F")
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
										soloCancelFlashLocation(
											soloFirstData.vip.filter(
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
									onClick={soloApplyFlashLocation}
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
					<div className="col-md-4">
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
					<div className="col-md-4">
						{soloFirstLoaded ? (
							<Select
								ref={soloTypeOfQueueRef}
								menuIsOpen={soloTypeOfQueueForce.menuIsOpen}
								onMenuOpen={() =>
									setSoloTypeOfQueueForce(
										(prevSoloTypeOfQueueForce) => {
											return {
												...prevSoloTypeOfQueueForce,
												menuIsOpen:
													!prevSoloTypeOfQueueForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setSoloTypeOfQueueForce(
										(prevSoloTypeOfQueueForce) => {
											return {
												...prevSoloTypeOfQueueForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									soloTypeOfQueueForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of queue"
								onChange={(e) => {
									setSoloTypeOfQueue(
										soloTypeOfQueues[
											objSearch(
												soloTypeOfQueues,
												"value",
												e.value
											)
										]
									)
								}}
								options={soloTypeOfQueues}
								value={soloTypeOfQueue}
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
												disabled={
													soloTypeOfQueue &&
													!soloTypeOfQueue.label
														.toLowerCase()
														.indexOf("duo") &&
													(item.custom
														.toLowerCase()
														.indexOf("specific") !==
														-1 ||
														item.custom
															.toLowerCase()
															.indexOf(
																"flash"
															) !== -1)
												}
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
													if (
														soloCustomFunctions[
															item.custom
														]
													) {
														soloCustomFunctions[
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

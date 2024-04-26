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

const NormalMatches = () => {
	const nMCode = 7
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

	const [nMCodeFirstLoaded, setNMCodeFirstLoaded] = useState(false)
	const [nMCodeFirstData, setNMCodeFirstData] = useState()

	const [nMCodeGameRegion, setNMCodeGameRegion] = useState()
	const [nMCodeGameRegions, setNMCodeGameRegions] = useState()
	const nMCodeGameRegionRef = useRef()
	const [nMCodeGameRegionForce, setNMCodeGameRegionForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [nMCodeNumberOfGame, setNMCodeNumberOfGame] = useState()
	const nMCodeNumberOfGames = [
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
	const nMCodeNumberOfGameRef = useRef()
	const [nMCodeNumberOfGameForce, setNMCodeNumberOfGameForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [nMCodeTypeOfQueue, setNMCodeTypeOfQueue] = useState()
	const [nMCodeTypeOfQueues, setNMCodeTypeOfQueues] = useState()
	const nMCodeTypeOfQueueRef = useRef()
	const [nMCodeTypeOfQueueForce, setNMCodeTypeOfQueueForce] = useState({
		menuIsOpen: false,
		forced: false,
	})

	const [nMCodeTypeOfService, setNMCodeTypeOfService] = useState()
	const [nMCodeTypeOfServices, setNMCodeTypeOfServices] = useState()
	const nMCodeTypeOfServiceRef = useRef()
	const [nMCodeTypeOfServiceForce, setNMCodeTypeOfServiceForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [nMCodeTypeOfServiceClassName, setNMCodeTypeOfServiceClassName] =
		useState("col-md-6")

	const [nMCodePopOverContent, setNMCodePopOverContent] = useState()
	const [nMCodeIsPopoverOpen, setNMCodeIsPopoverOpen] = useState(false)
	if (nMCodeIsPopoverOpen) {
		document.addEventListener("mousedown", () => {
			setNMCodeIsPopoverOpen(false)
		})
	}
	const [nMCodeTypeOfDuo, setNMCodeTypeOfDuo] = useState()
	const [nMCodeTypeOfDuos, setNMCodeTypeOfDuos] = useState()
	const nMCodeTypeOfDuoRef = useRef()
	const [nMCodeTypeOfDuoForce, setNMCodeTypeOfDuoForce] = useState({
		menuIsOpen: false,
		forced: false,
	})
	const [nMCodeTypeOfDuoClassName, setNMCodeTypeOfSDuolassName] =
		useState("d-none")
	useEffect(() => {
		if (nMCodeTypeOfService) {
			setNMCodeTypeOfServiceClassName(
				nMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "col-md-6"
			)
			setNMCodeTypeOfSDuolassName(
				nMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
					? "col-md-3"
					: "d-none"
			)
		}
	}, [nMCodeTypeOfService])

	const [nMCodePriceBeforePromoCode, setNMCodePriceBeforePromoCode] =
		useState()

	const [nMCodeVipPercentage, setNMCodeVipPercentage] = useState(0)
	const [vipPercentage, setVipPercentage] = useState(0)
	const [nMCodeVipOptions, setNMCodeVipOptions] = useState([])

	const [nMCodeChampions, setNMCodeChampions] = useState()
	const [nMCodeRoles, setNMCodeRoles] = useState()
	const [nMCodeFirstRole, setNMCodeFirstRole] = useState("")
	const [nMCodeFirstChampion, setNMCodeFirstChampion] = useState([])
	const [nMCodeOnlyOneChampion, setNMCodeOnlyOneChampion] = useState(false)
	const [nMCodeSecondRole, setNMCodeSecondRole] = useState()
	const [nMCodeSecondChampion, setNMCodeSecondChampion] = useState([])
	const [nMCodeSpecificIsOpen, setNMCodeSpecificIsOpen] = useState()
	const [nMCodeSpecificPercentage, setNMCodeSpecificPercentage] = useState({
		onlyOne: 0,
		firstChamp: 0,
		secondChamp: 0,
	})
	const nMCodeResetSpecific = () => {
		if (nMCodeSecondRole === undefined || nMCodeSecondRole.length === 0) {
			setNMCodeSecondRole(
				nMCodeRoles.filter(
					(item) => item.label.toLowerCase() === "fill"
				)[0]
			)
		}
	}
	const nMCodeCancelSpecific = (item) => {
		setNMCodeSpecificIsOpen(false)
		setNMCodeSpecificPercentage({
			onlyOne: 0,
			firstChamp: 0,
			secondChamp: 0,
		})
		document.body.style.overflow = "auto"
		document.getElementsByClassName(
			"specific_ref_" + nMCode
		)[0].checked = false
	}
	const nMCodeApplySpecific = () => {
		let error = 0
		if (
			(nMCodeFirstRole === undefined || nMCodeFirstRole.length === 0) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title: "Please select first role.",
			})
			error = 1
		}
		if (
			(nMCodeFirstChampion === undefined ||
				nMCodeFirstChampion.length < (nMCodeOnlyOneChampion ? 1 : 3)) &&
			nMCodeFirstChampion &&
			nMCodeFirstChampion.length !== 0 &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(nMCodeOnlyOneChampion ? 1 : 3) +
					" champions for the first role !",
			})
			error = 1
		}
		if (
			(nMCodeSecondRole === undefined || nMCodeSecondRole.length === 0) &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title: "Please select second role.",
			})
			error = 1
		}
		if (
			(nMCodeSecondChampion === undefined ||
				nMCodeSecondChampion.length <
					(nMCodeOnlyOneChampion ? 1 : 3)) &&
			nMCodeSecondChampion &&
			nMCodeSecondChampion.length !== 0 &&
			nMCodeSecondRole.label.toLowerCase() !== "fill" &&
			error === 0
		) {
			Toast.fire({
				icon: "error",
				title:
					"Please select at least " +
					(nMCodeOnlyOneChampion ? 1 : 3) +
					" champions for the second role !",
			})
			error = 1
		}
		if (error === 0) {
			setNMCodeSpecificPercentage({
				onlyOne: 0,
				firstChamp: 0,
				secondChamp: 0,
			})

			if (nMCodeFirstChampion && nMCodeFirstChampion.length !== 0) {
				setNMCodeSpecificPercentage((prevNMCodeSpecificPercentage) => {
					return {
						...prevNMCodeSpecificPercentage,
						firstChamp: nMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0].percentage,
					}
				})
			}
			if (nMCodeSecondChampion && nMCodeSecondChampion.length !== 0) {
				setNMCodeSpecificPercentage((prevNMCodeSpecificPercentage) => {
					return {
						...prevNMCodeSpecificPercentage,
						secondChamp: nMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0].percentage,
					}
				})
			}
			if (
				nMCodeOnlyOneChampion &&
				nMCodeOnlyOneChampion &&
				((nMCodeFirstChampion && nMCodeFirstChampion.length !== 0) ||
					(nMCodeSecondChampion && nMCodeSecondChampion.length !== 0))
			) {
				setNMCodeSpecificPercentage((prevNMCodeSpecificPercentage) => {
					return {
						...prevNMCodeSpecificPercentage,
						onlyOne: nMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0].percentage,
					}
				})
			}

			setNMCodeSpecificIsOpen(false)
			document.body.style.overflow = "auto"
			document.getElementsByClassName(
				"specific_ref_" + nMCode
			)[0].checked = true
		}
	}

	const [nMCodeFlashLocationIsOpen, setNMCodeFlashLocationIsOpen] =
		useState(false)
	const [nMCodeFlashLocation, setNMCodeFlashLocation] = useState("")
	const [nMCodeFlashLocationActive, setNMCodeFlashLocationActive] =
		useState(false)
	const nMCodeResetFlashLocation = () => {}
	const nMCodeCancelFlashLocation = (item) => {
		setNMCodeFlashLocationIsOpen(false)
		setNMCodeFlashLocationActive(false)
		document.body.style.overflow = "auto"
		document.getElementsByClassName(
			"flash_ref_" + nMCode
		)[0].checked = false
	}
	const nMCodeApplyFlashLocation = () => {
		if (nMCodeFlashLocation && nMCodeFlashLocation !== "") {
			setNMCodeFlashLocationIsOpen(false)
			setNMCodeFlashLocationActive(true)
			document.body.style.overflow = "auto"
		} else {
			Toast.fire({
				icon: "error",
				title: "Please select flash location.",
			})
		}
	}

	const [nMCodePromoCode, setNMCodePromoCode] = useState("")
	const [nMCodePromoCodePercentage, setNMCodePromoCodePercentage] = useState()
	const [nMCodePromoCodeClass, setNMCodePromoCodeClass] = useState("")
	const [nMCodeApplyButton, setNMCodeApplyButton] = useState("Apply")
	const [nMCodeApplyButtonClass, setNMCodeApplyButtonClass] = useState()
	const nMCodePromoCodeRef = useRef()
	const nMCodeApplyPromoCode = () => {
		setNMCodePromoCodePercentage(0)
		if (
			nMCodePromoCode &&
			nMCodePromoCode.length &&
			nMCodeApplyButton === "Apply"
		) {
			setNMCodePromoCodeClass(" forced")
			setNMCodeApplyButtonClass(" loading")
			setNMCodeApplyButton(
				<Loader
					type="ThreeDots"
					// color="#FFF"
					height={20}
					width={20}
				/>
			)
			api()
				.post("/LeagueOfLegends/promocode", {
					promocode: nMCodePromoCode,
				})
				.then((response) => {
					const data = response.data
					if (data.message === "success") {
						setNMCodePromoCodePercentage(data.percentage)
						setNMCodePromoCodeClass(" success")
					} else {
						setNMCodePromoCodeClass(" error")
						setNMCodePromoCodePercentage(0)
					}
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						window.location.reload()
					}
					setNMCodePromoCodeClass(" error")
					setNMCodePromoCodePercentage(0)
				})
				.finally(() => {
					setNMCodeApplyButtonClass("")
					setNMCodeApplyButton("Apply")
				})
		} else {
			nMCodePromoCodeRef.current.focus()
			setNMCodePromoCodeClass(" forced")
		}
	}
	const nMCodePromoCodeAplier = (event) => {
		if (event.key === "Enter") {
			nMCodeApplyPromoCode()
		}
	}

	const [nMCodeRequestToPay, setNMCodeRequestToPay] = useState(false)
	const [paying, setPaying] = useState(false)
	const [payText, setPayText] = useState("Purchase")
	const [nMCodePrice, setNMCodePrice] = useState(0)

	const nMCodeCustomFunctions = {
		specific: (e) => {
			if (e.target.checked) {
				setNMCodeSpecificIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				nMCodeCancelSpecific(
					nMCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "specific"
					)[0]
				)
			}
		},
		flash: (e) => {
			if (e.target.checked) {
				setNMCodeFlashLocationIsOpen(true)
				document.body.style.overflow = "hidden"
			} else {
				nMCodeCancelFlashLocation(
					nMCodeFirstData.vip.filter(
						(item) => item.custom.toLowerCase() === "flash"
					)[0]
				)
			}
		},
	}

	useEffect(() => {
		if (nMCodeFirstLoaded) {
			let price = 0
			let add_price = 0

			if (nMCodeNumberOfGame) {
				price =
					nMCodeFirstData.ranks
						.filter((item) => item.level === 0)[0]
						.divisions.filter((item) => item.level === 4)[0]
						.normal_price * nMCodeNumberOfGame.value
			}
			if (nMCodeTypeOfQueue) {
				add_price =
					add_price + (price / 100) * nMCodeTypeOfQueue.percentage
			}

			if (nMCodeTypeOfService) {
				add_price =
					add_price + (price / 100) * nMCodeTypeOfService.percentage
				if (
					nMCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
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
				nMCodeTypeOfDuo &&
				nMCodeTypeOfService &&
				nMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1
			) {
				add_price =
					add_price + (price / 100) * nMCodeTypeOfDuo.percentage
			}

			if (nMCodeVipPercentage) {
				add_price = add_price + (price / 100) * nMCodeVipPercentage
			}

			if (
				nMCodeSpecificPercentage &&
				(nMCodeTypeOfService === undefined ||
					nMCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
						-1)
			) {
				add_price =
					add_price + (price / 100) * nMCodeSpecificPercentage.onlyOne
				add_price =
					add_price +
					(price / 100) * nMCodeSpecificPercentage.firstChamp
				if (
					!nMCodeSecondRole ||
					nMCodeSecondRole.label.toLowerCase().indexOf("fill") === -1
				) {
					add_price =
						add_price +
						(price / 100) * nMCodeSpecificPercentage.secondChamp
				}
			}

			if (
				nMCodeFlashLocationActive &&
				(nMCodeTypeOfService === undefined ||
					nMCodeTypeOfService.label.toLowerCase().indexOf("duo") ===
						-1)
			) {
				add_price =
					add_price +
					(price / 100) *
						nMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0].percentage
			}

			price = price + add_price

			if (nMCodePromoCodePercentage) {
				setNMCodePriceBeforePromoCode(price.toFixed(2))
				price = price - (price / 100) * nMCodePromoCodePercentage
			}

			price = price.toFixed(2)

			setNMCodePrice(price)
		}
	}, [
		nMCodeNumberOfGame,
		nMCodeTypeOfQueue,
		nMCodeVipPercentage,
		nMCodePromoCodePercentage,
		nMCodeSpecificPercentage,
		nMCodeFlashLocationActive,
		nMCodeTypeOfService,
		nMCodeTypeOfDuo,
		vipPercentage,
	])

	useEffect(() => {
		if (nMCodeTypeOfDuo) {
			setNMCodePopOverContent(
				<ul className="features">
					{JSON.parse(
						nMCodeFirstData.typeofcustom.filter(
							(item) =>
								item.boost_id === nMCode &&
								item.value === nMCodeTypeOfDuo.value
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
	}, [nMCodeTypeOfDuo])

	useEffect(() => {
		if (nMCodeRequestToPay) {
			let error = 0
			if (nMCodeNumberOfGame && nMCodeNumberOfGame.length !== 0) {
				setNMCodeNumberOfGameForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setNMCodeNumberOfGameForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (nMCodeTypeOfQueue && nMCodeTypeOfQueue.length !== 0) {
				setNMCodeTypeOfQueueForce({ menuIsOpen: false, forced: false })
			} else {
				setNMCodeTypeOfQueueForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (nMCodeGameRegion && nMCodeGameRegion.length !== 0) {
				setNMCodeGameRegionForce({ menuIsOpen: false, forced: false })
			} else {
				setNMCodeGameRegionForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (nMCodeTypeOfService && nMCodeTypeOfService.length !== 0) {
				setNMCodeTypeOfServiceForce({
					menuIsOpen: false,
					forced: false,
				})
			} else {
				setNMCodeTypeOfServiceForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
			if (
				nMCodeTypeOfService &&
				nMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1 &&
				nMCodeTypeOfDuo &&
				nMCodeTypeOfDuo.length !== 0
			) {
				setNMCodeTypeOfDuoForce({ menuIsOpen: false, forced: false })
			} else {
				setNMCodeTypeOfDuoForce({
					menuIsOpen: !error ? true : false,
					forced: true,
				})
				error = 1
			}
		}
	}, [
		nMCodeGameRegion,
		nMCodeTypeOfQueue,
		nMCodeNumberOfGame,
		nMCodeTypeOfService,
		nMCodeTypeOfDuo,
	])

	useEffect(() => {
		if (!nMCodeFirstLoaded) {
			let data = LeagueOfLegendsApi
			data = {
				...data,
				ranks: data.ranks.filter((item) => item.normal_matches === 1),
			}
			setNMCodeFirstData(data)

			setNMCodeGameRegions(data.regions)

			setNMCodeTypeOfQueues(
				data.typeofqueue.filter(
					(item) => item.boost_id === nMCode || item.boost_id === null
				)
			)

			setNMCodeTypeOfServices(
				data.typeofservice.filter(
					(item) => item.boost_id === nMCode || item.boost_id === null
				)
			)

			setNMCodeTypeOfDuos(
				data.typeofcustom.filter(
					(item) => item.boost_id === nMCode || item.boost_id === null
				)
			)

			setNMCodeChampions(data.champions)

			setNMCodeRoles(data.roles)

			setNMCodePrice((0).toFixed(2))

			setNMCodeFirstLoaded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const nMCodeCheckPurchase = () => {
		setNMCodeRequestToPay(true)
		let error = 0
		if (
			nMCodeNumberOfGame === undefined ||
			nMCodeNumberOfGame.length === 0
		) {
			if (!error) {
				nMCodeNumberOfGameRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setNMCodeNumberOfGameForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (nMCodeGameRegion === undefined || nMCodeGameRegion.length === 0) {
			if (!error) {
				nMCodeGameRegionRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setNMCodeGameRegionForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (nMCodeTypeOfQueue === undefined || nMCodeTypeOfQueue.length === 0) {
			if (!error) {
				nMCodeTypeOfQueueRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setNMCodeTypeOfQueueForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			nMCodeTypeOfService === undefined ||
			nMCodeTypeOfService.length === 0
		) {
			if (!error) {
				nMCodeTypeOfServiceRef.current.select.controlRef.scrollIntoView(
					{ behavior: "smooth", block: "center", inline: "nearest" }
				)
			}
			setNMCodeTypeOfServiceForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (
			(nMCodeTypeOfService &&
				nMCodeTypeOfService.label.toLowerCase().indexOf("duo") !== -1 &&
				!nMCodeTypeOfDuo) ||
			(nMCodeTypeOfDuo && nMCodeTypeOfDuo.length === 0)
		) {
			if (!error) {
				nMCodeTypeOfDuoRef.current.select.controlRef.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				})
			}
			setNMCodeTypeOfDuoForce({
				menuIsOpen: !error ? true : false,
				forced: true,
			})
			error = 1
		}
		if (!error) {
			setNMCodeRequestToPay(false)
			return true
		} else {
			return false
		}
	}
	const nMCodePurchase = () => {
		if (nMCodeCheckPurchase() && !paying) {
			setPaying(true)
			setPayText(<Loader type="ThreeDots" color="#FFF" height={21} />)
			api()
				.post("/LeagueOfLegends/nMCode/makePurchase", {
					code: nMCode,
					numberOfGames: nMCodeNumberOfGame.value,
					gameRegion: nMCodeGameRegion.value,
					typeOfQueue: nMCodeTypeOfQueue.value,
					typeOfService: nMCodeTypeOfService.value,
					typeOfCustom: nMCodeTypeOfDuo
						? nMCodeTypeOfDuo.value
						: null,
					specificFirstRole:
						nMCodeTypeOfService.label
							.toLowerCase()
							.indexOf("duo") === -1
							? nMCodeFirstRole
								? nMCodeFirstRole.value
								: null
							: null,
					specificFirstChampion:
						nMCodeTypeOfService.label
							.toLowerCase()
							.indexOf("duo") === -1
							? nMCodeFirstChampion
								? nMCodeFirstChampion
								: null
							: null,
					onlyOneChampion:
						nMCodeTypeOfService.label
							.toLowerCase()
							.indexOf("duo") === -1
							? nMCodeOnlyOneChampion
								? nMCodeOnlyOneChampion
								: false
							: null,
					specificSecondRole:
						nMCodeTypeOfService.label
							.toLowerCase()
							.indexOf("duo") === -1
							? nMCodeSecondRole
								? nMCodeSecondRole.value
								: null
							: null,
					specificSecondChampion:
						nMCodeTypeOfService.label
							.toLowerCase()
							.indexOf("duo") === -1
							? nMCodeSecondChampion
								? nMCodeSecondChampion
								: null
							: null,
					flashLocation:
						nMCodeTypeOfService.label
							.toLowerCase()
							.indexOf("duo") === -1
							? nMCodeFlashLocation
								? nMCodeFlashLocation
								: null
							: null,
					vipOptions: nMCodeVipOptions,
					promoCode: nMCodePromoCode ? nMCodePromoCode : null,
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
				isOpen={nMCodeSpecificIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={nMCodeResetSpecific}
				onRequestClose={() =>
					nMCodeCancelSpecific(
						nMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "specific"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{nMCodeFirstLoaded ? (
					<>
						<div className="vip-modal">
							<h2 className="col-12 vip-modal-header">
								Select first role&nbsp;
								<span className="free-label">FREE</span>
							</h2>
							<div className="row vertical-gap pl-10 pr-10">
								<div className="col-12 row ml-auto mr-auto">
									{nMCodeRoles
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
														nMCodeRoles.filter(
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
														(nMCodeFirstRole.value ===
														item.value
															? "selected"
															: "")
													}
													onClick={() => {
														setNMCodeFirstRole(item)
														if (
															nMCodeSecondRole &&
															item.value ===
																nMCodeSecondRole.value
														) {
															setNMCodeSecondRole(
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
							{nMCodeFirstRole && nMCodeFirstRole !== "" ? (
								<>
									<h2 className="col-12 vip-modal-header">
										Select champion for&nbsp;
										{nMCodeFirstRole.label} role (+
										{
											nMCodeFirstData.vip.filter(
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
											{nMCodeFirstLoaded ? (
												<Select
													placeholder="Select Champion"
													onChange={(e) => {
														setNMCodeFirstChampion(
															e
														)
													}}
													options={nMCodeChampions}
													value={nMCodeFirstChampion}
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
										{nMCodeFirstLoaded ? (
											<div className="col-12 pt-10 pb-10">
												<div className="custom-control custom-checkbox">
													<input
														onChange={(e) =>
															setNMCodeOnlyOneChampion(
																e.target.checked
															)
														}
														type="checkbox"
														className="custom-control-input"
														id={
															"onlyOneChampion-checkbox-id"
														}
														checked={
															nMCodeOnlyOneChampion
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
															nMCodeFirstData.vip.filter(
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
											{nMCodeRoles
												.filter(
													(item) =>
														item.value !==
														nMCodeFirstRole.value
												)
												.map((item, key) => (
													<div
														key={key}
														className={
															"cursor-pointer col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 p-5 mb-5 mt-5 " +
															(key !== 0 &&
															key !==
																nMCodeRoles.filter(
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
																(nMCodeSecondRole &&
																nMCodeSecondRole.value ===
																	item.value
																	? "selected"
																	: "")
															}
															onClick={() =>
																setNMCodeSecondRole(
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
									{nMCodeSecondRole &&
									nMCodeSecondRole !== "" &&
									(nMCodeSecondRole
										? nMCodeSecondRole.label.toLowerCase() !==
										  "fill"
										: true) ? (
										<>
											<h2 className="col-12 vip-modal-header">
												Select champion for&nbsp;
												{nMCodeSecondRole.label} role (+
												{
													nMCodeFirstData.vip.filter(
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
													{nMCodeFirstLoaded ? (
														<Select
															placeholder="Select Champion"
															onChange={(e) => {
																setNMCodeSecondChampion(
																	e
																)
															}}
															options={
																nMCodeChampions
															}
															value={
																nMCodeSecondChampion
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
											nMCodeCancelSpecific(
												nMCodeFirstData.vip.filter(
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
										onClick={nMCodeApplySpecific}
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
				isOpen={nMCodeFlashLocationIsOpen}
				className="vip-container"
				ariaHideApp={false}
				onAfterOpen={nMCodeResetFlashLocation}
				onRequestClose={() =>
					nMCodeCancelFlashLocation(
						nMCodeFirstData.vip.filter(
							(item) => item.custom.toLowerCase() === "flash"
						)[0]
					)
				}
				style={{ content: {} }}
			>
				{nMCodeFirstLoaded ? (
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
											(nMCodeFlashLocation === "D"
												? "selected"
												: "")
										}
										onClick={() => {
											setNMCodeFlashLocation("D")
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
											(nMCodeFlashLocation === "F"
												? "selected"
												: "")
										}
										onClick={() => {
											setNMCodeFlashLocation("F")
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
										nMCodeCancelFlashLocation(
											nMCodeFirstData.vip.filter(
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
									onClick={nMCodeApplyFlashLocation}
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
					<div className="col-md-4">
						{nMCodeFirstLoaded ? (
							<Select
								ref={nMCodeNumberOfGameRef}
								menuIsOpen={nMCodeNumberOfGameForce.menuIsOpen}
								onMenuOpen={() =>
									setNMCodeNumberOfGameForce(
										(prevNMCodeNumberOfGameForce) => {
											return {
												...prevNMCodeNumberOfGameForce,
												menuIsOpen:
													!prevNMCodeNumberOfGameForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setNMCodeNumberOfGameForce(
										(prevNMCodeNumberOfGameForce) => {
											return {
												...prevNMCodeNumberOfGameForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									nMCodeNumberOfGameForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Number of games"
								onChange={(e) => {
									setNMCodeNumberOfGame(
										nMCodeNumberOfGames[
											objSearch(
												nMCodeNumberOfGames,
												"value",
												e.value
											)
										]
									)
								}}
								options={nMCodeNumberOfGames}
								value={nMCodeNumberOfGame}
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
						{nMCodeFirstLoaded ? (
							<Select
								ref={nMCodeTypeOfQueueRef}
								menuIsOpen={nMCodeTypeOfQueueForce.menuIsOpen}
								onMenuOpen={() =>
									setNMCodeTypeOfQueueForce(
										(prevNMCodeTypeOfQueueForce) => {
											return {
												...prevNMCodeTypeOfQueueForce,
												menuIsOpen:
													!prevNMCodeTypeOfQueueForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setNMCodeTypeOfQueueForce(
										(prevNMCodeTypeOfQueueForce) => {
											return {
												...prevNMCodeTypeOfQueueForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									nMCodeTypeOfQueueForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of queue"
								onChange={(e) => {
									setNMCodeTypeOfQueue(
										nMCodeTypeOfQueues[
											objSearch(
												nMCodeTypeOfQueues,
												"value",
												e.value
											)
										]
									)
								}}
								options={nMCodeTypeOfQueues}
								value={nMCodeTypeOfQueue}
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
						{nMCodeFirstLoaded ? (
							<Select
								ref={nMCodeGameRegionRef}
								menuIsOpen={nMCodeGameRegionForce.menuIsOpen}
								onMenuOpen={() =>
									setNMCodeGameRegionForce(
										(prevNMCodeGameRegionForce) => {
											return {
												...prevNMCodeGameRegionForce,
												menuIsOpen:
													!prevNMCodeGameRegionForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setNMCodeGameRegionForce(
										(prevNMCodeGameRegionForce) => {
											return {
												...prevNMCodeGameRegionForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									nMCodeGameRegionForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Game Region"
								onChange={(e) => {
									setNMCodeGameRegion(
										nMCodeGameRegions[
											objSearch(
												nMCodeGameRegions,
												"value",
												e.value
											)
										]
									)
								}}
								options={nMCodeGameRegions}
								value={nMCodeGameRegion}
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
					<div className={nMCodeTypeOfServiceClassName}>
						{nMCodeFirstLoaded ? (
							<Select
								ref={nMCodeTypeOfServiceRef}
								menuIsOpen={nMCodeTypeOfServiceForce.menuIsOpen}
								onMenuOpen={() =>
									setNMCodeTypeOfServiceForce(
										(prevNMCodeTypeOfServiceForce) => {
											return {
												...prevNMCodeTypeOfServiceForce,
												menuIsOpen:
													!prevNMCodeTypeOfServiceForce.menuIsOpen,
											}
										}
									)
								}
								onMenuClose={() =>
									setNMCodeTypeOfServiceForce(
										(prevNMCodeTypeOfServiceForce) => {
											return {
												...prevNMCodeTypeOfServiceForce,
												menuIsOpen: false,
											}
										}
									)
								}
								className={
									nMCodeTypeOfServiceForce.forced
										? "custom-forced"
										: ""
								}
								placeholder="Type of service"
								onChange={(e) => {
									setNMCodeTypeOfService(
										nMCodeTypeOfServices[
											objSearch(
												nMCodeTypeOfServices,
												"value",
												e.value
											)
										]
									)
								}}
								options={nMCodeTypeOfServices}
								value={nMCodeTypeOfService}
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
					<div className={nMCodeTypeOfDuoClassName}>
						{nMCodeFirstLoaded ? (
							<>
								<Select
									id="nMCodePopoverTarget"
									ref={nMCodeTypeOfDuoRef}
									menuIsOpen={nMCodeTypeOfDuoForce.menuIsOpen}
									onMenuOpen={() =>
										setNMCodeTypeOfDuoForce(
											(prevNMCodeTypeOfDuoForce) => {
												return {
													...prevNMCodeTypeOfDuoForce,
													menuIsOpen:
														!prevNMCodeTypeOfDuoForce.menuIsOpen,
												}
											}
										)
									}
									onMenuClose={() => {
										setNMCodeTypeOfDuoForce(
											(prevNMCodeTypeOfDuoForce) => {
												return {
													...prevNMCodeTypeOfDuoForce,
													menuIsOpen: false,
												}
											}
										)
									}}
									className={
										nMCodeTypeOfDuoForce.forced
											? "custom-forced"
											: ""
									}
									placeholder="Type of duo"
									onChange={(e) => {
										setNMCodeTypeOfDuo(
											nMCodeTypeOfDuos[
												objSearch(
													nMCodeTypeOfDuos,
													"value",
													e.value
												)
											]
										)
										setNMCodeIsPopoverOpen(true)
									}}
									options={nMCodeTypeOfDuos}
									value={nMCodeTypeOfDuo}
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
									isOpen={nMCodeIsPopoverOpen}
									placement="right"
									target="nMCodePopoverTarget"
								>
									<PopoverHeader>
										{nMCodeTypeOfDuo
											? nMCodeTypeOfDuo.label
											: ""}
									</PopoverHeader>
									<PopoverBody>
										{nMCodePopOverContent}
									</PopoverBody>
								</UncontrolledPopover>
							</>
						) : (
							<LoadingSelect />
						)}
					</div>
					<div className="col-md-4 col-9 ml-auto">
						<input
							ref={nMCodePromoCodeRef}
							className={
								"form-control text-center" +
								nMCodePromoCodeClass
							}
							onChange={(e) => setNMCodePromoCode(e.target.value)}
							value={nMCodePromoCode}
							type="text"
							placeholder="Promocode"
							onKeyDown={nMCodePromoCodeAplier}
						/>
					</div>
					<div
						className="col-md-2 col-3 mr-auto"
						style={{ paddingLeft: "0px" }}
						onClick={nMCodeApplyPromoCode}
					>
						<button
							className={
								"nk-btn nk-btn-sm nk-btn-circle nk-btn-color-success link-effect-1 ml-3 mr-3" +
								nMCodeApplyButtonClass
							}
						>
							<span>{nMCodeApplyButton}</span>
						</button>
					</div>
				</div>
				<div className="nk-gap-2" />
			</div>
			{nMCodeFirstLoaded &&
			nMCodeFirstData.vip &&
			nMCodeFirstData.vip &&
			nMCodeFirstData.vip.filter(
				(item) => item.boost_id === nMCode || item.boost_id === null
			).length ? (
				<div className="col-md-12">
					<div className="row vertical-gap vip-box mt-1">
						{nMCodeFirstLoaded ? (
							nMCodeFirstData.vip
								.filter(
									(item) =>
										item.boost_id === nMCode ||
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
														nMCodeTypeOfService !==
															undefined &&
														nMCodeTypeOfService.label
															.toLowerCase()
															.indexOf("duo") !==
															-1 &&
														item.custom !== ""
													}
													onChange={(e) => {
														if (e.target.checked) {
															setNMCodeVipOptions(
																(
																	prevNMCodeVipOptions
																) => {
																	return [
																		...prevNMCodeVipOptions,
																		item.value,
																	]
																}
															)
														} else {
															setNMCodeVipOptions(
																nMCodeVipOptions.filter(
																	(items) =>
																		items !==
																		item.value
																)
															)
														}
														if (
															item.custom === ""
														) {
															setNMCodeVipPercentage(
																(
																	prevNMCodeVipPercentage
																) => {
																	return e
																		.target
																		.checked
																		? prevNMCodeVipPercentage +
																				item.percentage
																		: prevNMCodeVipPercentage -
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
															nMCodeCustomFunctions[
																item.custom
															]
														) {
															nMCodeCustomFunctions[
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
															  nMCode
															: "")
													}
													id={
														item.value +
														"-nMCode-checkbox-id"
													}
												/>
												<label
													className="custom-control-label"
													htmlFor={
														item.value +
														"-nMCode-checkbox-id"
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
							{nMCodePrice} &euro;
							{nMCodePromoCodePercentage &&
							nMCodePromoCodePercentage > 0 ? (
								<del className="no-promocode">
									{nMCodePriceBeforePromoCode} &euro;
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
							onClick={nMCodePurchase}
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

export default NormalMatches

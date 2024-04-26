import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { Dot } from "react-animated-dots"
import Swal from "sweetalert2"
const ContentContext = React.createContext()

export function useContexts() {
	return useContext(ContentContext)
}

const ContextProvider = ({ children }) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer)
			toast.addEventListener("mouseleave", Swal.resumeTimer)
		},
	})
	const loadingButton = (
		<>
			<Dot>.</Dot>
			<Dot>.</Dot>
			<Dot>.</Dot>
		</>
	)
	const email_test =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const objSearch = (obj, prop, search) => {
		var __FOUND = -1
		for (var i = 0; i < obj.length; i++) {
			if (obj[i][prop] === search) {
				// __FOUND is set to the index of the element
				__FOUND = i
				break
			}
		}
		return __FOUND
	}
	const LoadingSelect = () => {
		return <div className="form-control pt-10 pl-10 loading">Loading</div>
	}
	const LoadingCheckbox = () => {
		return (
			<>
				<div className="col-md-4 pt-10 pb-10 loading">
					<div className="custom-control custom-checkbox loading">
						<input
							type="checkbox"
							disabled
							className="custom-control-input loading"
							id="loadingCheckBox"
						/>
						<label
							className="custom-control-label loading"
							htmlFor="loadingCheckBox"
						>
							Loading
						</label>
					</div>
				</div>
				<div className="col-md-4 pt-10 pb-10 loading">
					<div className="custom-control custom-checkbox loading">
						<input
							type="checkbox"
							disabled
							className="custom-control-input loading"
							id="loadingCheckBox"
						/>
						<label
							className="custom-control-label loading"
							htmlFor="loadingCheckBox"
						>
							Loading
						</label>
					</div>
				</div>
				<div className="col-md-4 pt-10 pb-10 loading">
					<div className="custom-control custom-checkbox loading">
						<input
							type="checkbox"
							disabled
							className="custom-control-input loading"
							id="loadingCheckBox"
						/>
						<label
							className="custom-control-label loading"
							htmlFor="loadingCheckBox"
						>
							Loading
						</label>
					</div>
				</div>
			</>
		)
	}
	const [customStyles, setCustomStyles] = useState({
		control: (provided, { isDisabled }) => ({
			...provided,
			cursor: isDisabled ? "no-drop" : "default",
			opacity: isDisabled ? "0.5" : "1",
			backgroundColor: "none",
			boxShadow:
				"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
			borderRadius: "9px",
			border: "none",
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "#FFF",
		}),
		indicatorSeparator: (provided) => ({
			...provided,
			display: "none",
		}),
		input: (provided) => ({
			...provided,
			padding: "0",
			margin: "0",
			color: "#FFF",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#333333",
			boxShadow:
				"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
			borderRadius: "9px",
			zIndex: 5,
		}),
		option: (provided, { isDisabled }) => ({
			...provided,
			borderRadius: "10px",
			backgroundColor: isDisabled ? "red" : provided.backgroundColor,
			color: isDisabled ? "red" : provided.color,
			cursor: isDisabled ? "not-allowed" : "default",
		}),
		placeholder: (provided) => ({
			...provided,
			color: "#FFF",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#FFF",
		}),
		multiValue: (provided) => ({
			...provided,
			borderRadius: "5px",
		}),
		multiValueRemove: (provided) => ({
			...provided,
			borderRadius: "5px",
		}),
	})
	const [isLogin, setIsLogin] = useState()
	const [makeLogout, setMakeLogout] = useState(false)
	const [loginButton, setLoginButton] = useState(loadingButton)
	const [logoutButton, setLogoutButton] = useState(
		<FontAwesomeIcon icon={faSignOutAlt} />
	)
	const [username, setUsername] = useState("")
	const [userData, setUserData] = useState(false)
	const [LeagueOfLegendsApi, setLeagueOfLegendsApi] = useState()
	const [TeamfightTacticsApi, setTeamfightTacticsApi] = useState()
	const [ValorantApi, setValorantApi] = useState()
	const API_URL = "https://api.topboost.net"
	const api = () => {
		const api = axios.create({
			baseURL: API_URL,
			withCredentials: true,
		})
		return api
	}
	useEffect(() => {
		api().get("/sanctum/csrf-cookie")
		api()
			.post("/user")
			.then((response) => {
				const data = response.data
				if (data.message === "success") {
					setIsLogin(true)
					setUsername(data.user.name)
					setUserData(data.user)
				} else {
					setUserData(null)
				}
			})
			.catch((error) => {
				if (error.response && error.response.status === 419) {
					// window.location.reload()
				}
				setIsLogin(false)
				setUserData(null)
			})
			.finally(() => {
				setLoginButton(
					<>
						<span className="nk-icon-toggle-front">
							<FontAwesomeIcon icon={faSignInAlt} />
						</span>
						<span className="nk-icon-toggle-back">
							<span className="nk-icon-close" />
						</span>
					</>
				)
			})
	}, [])
	useEffect(() => {
		if (makeLogout === true && logoutButton !== loadingButton) {
			setLogoutButton(loadingButton)
			api()
				.post("/logout")
				.then(() => {
					setIsLogin(false)
					Toast.fire({
						icon: "success",
						title: "Successfully logged out!",
					})
				})
				.catch((error) => {
					if (error.response && error.response.status === 419) {
						// window.location.reload()
					}
					Toast.fire({
						icon: "warning",
						title: "Something went wrong!",
					})
				})
				.finally(() => {
					setMakeLogout(false)
					setUserData(null)
					setLogoutButton(<FontAwesomeIcon icon={faSignOutAlt} />)
				})
		}
	}, [makeLogout])
	return (
		<ContentContext.Provider
			value={{
				Toast,
				objSearch,
				customStyles,
				LoadingSelect,
				LoadingCheckbox,
				setCustomStyles,
				API_URL,
				LeagueOfLegendsApi,
				setLeagueOfLegendsApi,
				TeamfightTacticsApi,
				setTeamfightTacticsApi,
				ValorantApi,
				setValorantApi,
				isLogin,
				setIsLogin,
				setMakeLogout,
				loginButton,
				logoutButton,
				setLogoutButton,
				api,
				email_test,
				loadingButton,
				username,
				setUsername,
				userData,
				setUserData,
			}}
		>
			{children}
		</ContentContext.Provider>
	)
}

export default ContextProvider

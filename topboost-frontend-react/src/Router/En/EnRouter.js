import React, { useEffect } from "react"
import { Switch, Route, useLocation, Redirect } from "react-router-dom"
import Header from "../../Components/En/Header"
import Nav from "../../Components/En/Nav"
import BackgroundVideo from "../../Components/En/BackgroundVideo"
import MobileNav from "../../Components/En/MobileNav"
import ShareButtons from "../../Components/En/ShareButtons"
import SideButtons from "../../Components/En/SideButtons"
import Search from "../../Components/En/Search"
import Cart from "../../Components/En/Cart"
import SignForm from "../../Components/En/SignForm"
import Footer from "../../Components/En/Footer"
import Home from "../../Pages/En/Home"
import Faq from "../../Pages/En/Faq"
import Error from "../../Pages/En/Error"
import ComingSoon from "../../Pages/En/ComingSoon"
import ContactUs from "../../Pages/En/ContactUs"
import CustomPay from "../../Pages/En/CustomPay"
import WorkWithUs from "../../Pages/En/WorkWithUs"
import PrivacyPolicy from "../../Pages/En/PrivacyPolicy"
import TermsOfService from "../../Pages/En/TermsOfService"
import LeagueOfLegends from "../../Pages/En/Boosting/LeagueOfLegends"
import Valorant from "../../Pages/En/Boosting/Valorant"
import TeamfightTactics from "../../Pages/En/Boosting/TeamfightTactics"
import Checkout from "../../Pages/En/Checkout"
import Order from "../../Pages/En/Order"
import UserRouter from "../../Pages/En/UserRouter"
import ImageCrop from "../../Components/ImageCrop/ImageCrop"
const EnRouter = () => {
	const location = useLocation()
	useEffect(() => {
		if (
			(location.pathname.indexOf("lol-boost") === -1 ||
				location.pathname.indexOf("lol-boost/checkout") !== -1) &&
			location.pathname.indexOf("valorant-boost") === -1 &&
			location.pathname.indexOf("tft-boost") === -1 &&
			location.pathname.indexOf("user") === -1
		) {
			document.getElementsByClassName("nk-scroll-top")[0].click()
		}
	}, [location.pathname])
	return (
		<>
			<BackgroundVideo />
			<Header />
			<Nav />
			<MobileNav />
			<div className="nk-main">
				<Switch>
					<Route path={["/", ""]} exact component={Home} />
					<Route
						path={["/home"]}
						render={() => <Redirect to="/" />}
					/>
					<Route path={["/FAQ"]} exact component={Faq} />
					<Route
						path={["/Blog", "/Store"]}
						exact
						component={ComingSoon}
					/>
					<Route
						path={["/Contact-Us", "/Contact"]}
						exact
						component={ContactUs}
					/>
					<Route path={["/CustomPay"]} exact component={CustomPay} />
					<Route
						path={["/Work-With-Us"]}
						exact
						component={WorkWithUs}
					/>
					<Route
						path={["/Privacy-Policy"]}
						exact
						component={PrivacyPolicy}
					/>
					<Route
						path={["/Terms-of-Service"]}
						exact
						component={TermsOfService}
					/>
					<Route
						path={["/checkout/:purchase_code"]}
						exact
						component={Checkout}
					/>
					<Route
						path={["/checkout/:purchase_code/:pwd"]}
						exact
						component={Order}
					/>
					<Route
						path={["/lol-boost/:service_name", "/lol-boost"]}
						component={LeagueOfLegends}
					/>
					<Route
						path={[
							"/valorant-boost/:service_name",
							"/valorant-boost",
						]}
						component={Valorant}
					/>
					<Route
						path={["/tft-boost/:service_name", "/tft-boost"]}
						component={TeamfightTactics}
					/>
					{/* <Route
						exact
						path={[
							"/user",
							"/user/:path1",
							"/user/:path1/:path2",
							"/user/:path1/:path2/:path3",
						]}
						component={UserRouter}
					/> */}

					{/* <Route path={["/test"]} exact component={ImageCrop} /> */}

					<Route path={["/*"]} exact component={Error} />

					<Route path="*" component={Error} />
				</Switch>
				<Footer />
			</div>
			<ShareButtons />
			<SideButtons />
			<Search />
			<Cart />
			<SignForm />
		</>
	)
}

export default EnRouter

import ContextProvider from "./Contexts"
import { BrowserRouter as AppRouter, Route } from "react-router-dom"
import Router from "./Router/Router"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
// const stripePromise = loadStripe(
// 	"pk_test_51JS2aPDMy2KhAtkGAuKUO2t7SLdqzJU0uyUyNR4qag5jPlS9FNWzdqnmkD8adBDUJal5kBSNyGF3ixR4FGdZrILc00R3XnXtew"
// )
const stripePromise = loadStripe(
	"pk_live_51JS2aPDMy2KhAtkGYpn9CmxLhFLGzlV7O73icOzSxfafYz8Jlm4XcC46e2A97tv6kt5aveQufTytGcgQSc4dvb4C00VQNJzrT4"
)

const App = () => {
	return (
		<Elements stripe={stripePromise}>
			<ContextProvider>
				<AppRouter basename={process.env.REACT_APP_BASENAME}>
					<Route path="/" component={Router} />
				</AppRouter>
			</ContextProvider>
		</Elements>
	)
}

export default App

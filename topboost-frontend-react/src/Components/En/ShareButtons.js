import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faFacebook,
	faInstagram,
	faDiscord,
	faTeamspeak,
} from "@fortawesome/free-brands-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
const ShareButtons = () => {
	return (
		<div className="nk-share-buttons nk-share-buttons-left d-none d-md-flex">
			<ul>
				<li>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.trustpilot.com/review/topboost.net?languages=all"
						style={{ color: "#00b67a" }}
					>
						<span
							className="nk-share-icon"
							title="Trustpilot"
							data-share="trustpilot"
						>
							<FontAwesomeIcon icon={faStar} />
						</span>
						<span className="nk-share-name">Trustpilot</span>
					</a>
				</li>
				<li>
					<a
						rel="noreferrer"
						target="_blank"
						href="https://www.facebook.com/topboost.net"
						style={{ color: "#405DE6" }}
					>
						<span
							className="nk-share-icon"
							title="Facebook"
							data-share="facebook"
						>
							<FontAwesomeIcon icon={faFacebook} />
						</span>
						<span className="nk-share-name">Facebook</span>
					</a>
				</li>
				<li>
					<a
						rel="noreferrer"
						target="_blank"
						href="https://www.instagram.com/topboost_n1"
						style={{ color: "#C13584" }}
					>
						<span
							className="nk-share-icon"
							title="Instagram"
							data-share="instagram"
						>
							<FontAwesomeIcon icon={faInstagram} />
						</span>
						<span className="nk-share-name">Instagram</span>
					</a>
				</li>
				<li>
					<a
						rel="noreferrer"
						target="_blank"
						href="https://discord.gg/fgzVvyd"
						style={{ color: "#7289DA" }}
					>
						<span
							className="nk-share-icon"
							title="Discord"
							data-share="discord"
						>
							<FontAwesomeIcon icon={faDiscord} />
						</span>
						<span className="nk-share-name">Discord</span>
					</a>
				</li>
				<li>
					<a
						rel="noreferrer"
						target="_blank"
						href="ts3server://youts.ir"
						style={{ color: "#4763ac" }}
					>
						<span
							className="nk-share-icon"
							title="TeamSpeak"
							data-share="teamspeak"
						>
							<FontAwesomeIcon icon={faTeamspeak} />
						</span>
						<span className="nk-share-name">TeamSpeak</span>
					</a>
				</li>
			</ul>
		</div>
	)
}

export default ShareButtons

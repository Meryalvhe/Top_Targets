import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer bg-primary mt-auto">
		<div className="container-fluid">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0 d-flex align-items-center">
						<div className="d-flex align-items-center">
							<li><a href="/contact">
								<button className="cta">
									<span className="hover-underline-animation body text-light"> Contact </span>
									
								</button>
							</a>
							</li>
							<li><a href="/cookies">
								<button className="cta">
									<span className="hover-underline-animation body text-light"> Cookies </span>
									
								</button>
							</a>
							</li>
							<li><a href="/privacy-policy">
								<button className="cta">
									<span className="hover-underline-animation body text-light"> Privacy Policy </span>
									
								</button>
							</a>
							</li>
						</div>
					</ul>
				</div>
				{/* TERNARIO LOGIN OR NOT */}
				{/* SOCIAL MEDIA ICONS */}
				<div className="d-flex">
					<span className="m-3">
						<a href="https://www.google.com">
							<i className="fas fa-inbox" style={{ color: "#ffffff" }} />
						</a>
					</span>
					<span className="m-3">
						<a href="https://www.google.com">
						<i className="fab fa-instagram" style={{ color: "#ffffff" }} />
						</a>
					</span>
					<span className="m-3">
						<a href="https://www.google.com">
						<i className="fab fa-linkedin" style={{ color: "#ffffff" }} />
						</a>
					</span>
				</div>
			</div>
		</div>
	</footer>

);

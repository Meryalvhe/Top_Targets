import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto bg-primary">
		<div className="container-fluid">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0 d-flex align-items-center">
						<div className="d-flex align-items-center">
							<li><a href="/contact">
								<button className="cta">
									<span className="hover-underline-animation body text-light"> Contact </span>
									<path
										id="Path_10"
										data-name="Path 10"
										d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
										transform="translate(30)"
									></path>
								</button>
							</a>
							</li>
							<li><a href="/cookies">
								<button className="cta">
									<span className="hover-underline-animation body text-light"> Cookies </span>
									<path
										id="Path_10"
										data-name="Path 10"
										d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
										transform="translate(30)"
									></path>
								</button>
							</a>
							</li>
							<li><a href="/privacy-policy">
								<button className="cta">
									<span className="hover-underline-animation body text-light"> Privacy Policy </span>
									<path
										id="Path_10"
										data-name="Path 10"
										d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
										transform="translate(30)"
									></path>
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

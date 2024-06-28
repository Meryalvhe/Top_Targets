import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/navbar.css";
import logoURL from "../../img/logo.png";
import kruegerURL from "../../img/freddykrueger.jpg"


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const logOut = () => {
		console.log(localStorage)
		localStorage.clear();
		actions.setIsLogin(false)
		actions.setCurrentUser("")
	}

	return (
		<header className="p-3 border-bottom bg-primary">
			<div className="container-fluid">
				<div className="d-flex justify-content-between">
				<Link to="/home" className="nav-link px-2 link-secondary"><img src={logoURL} height="50" /></Link>
					<div className="d-flex align-items-center">
						<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0 d-flex align-items-center">
							<div className="d-flex justify-content-center">
								<li><Link to="/about">
									<button className="cta">
										<span id="NavbarButton" className="hover-underline-animation body text-light"> About </span>
										<path
											id="Path_10"
											data-name="Path 10"
											d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
											transform="translate(30)"
										></path>
									</button>
								</Link>
								</li>
								<li><Link to="/criminals">
									<button className="cta">
										<span id="NavbarButton" className="hover-underline-animation body text-light"> Criminals </span>
										<path
											id="Path_10"
											data-name="Path 10"
											d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
											transform="translate(30)"
										></path>
									</button>
								</Link>
								</li>
								<li><Link to="/missing-persons">
									<button className="cta">
										<span id="NavbarButton" className="hover-underline-animation body text-light"> Missing Persons </span>
										<path
											id="Path_10"
											data-name="Path 10"
											d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
											transform="translate(30)"
										></path>
									</button>
								</Link>
								</li>
							</div>
						</ul>
					</div>
					{/* TERNARIO LOGIN OR NOT */}
					{/* botones login signup */}
					<div className="d-flex justify-content-en align-items-center">
						<Link to="/login">
							<button className="cta">
								<span id="NavbarButton" className="hover-underline-animation body text-light"> Login </span>
								<path
									id="Path_10"
									data-name="Path 10"
									d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
									transform="translate(30)"
								></path>
							</button>
						</Link>

						<Link to="/signup">
							<button className="cta">
								<span id="NavbarButton" className="hover-underline-animation body text-light"> Signup </span>
								<path
									id="Path_10"
									data-name="Path 10"
									d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
									transform="translate(30)"
								></path>
							</button>
						</Link>

						{/* botones user dropdown */}
						<div className="dropdown text-end">
							<Link to="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
								<img src={kruegerURL} alt="mdo" width="32" height="32" className="rounded-circle  object-fit-cover" />
							</Link>
							<ul className="dropdown-menu text-small">
								<li><Link to="" className="dropdown-item" href="#">New project...</Link></li>
								<li><Link to="" className="dropdown-item" href="#">Settings</Link></li>
								<li><Link to="" className="dropdown-item" href="#">Profile</Link></li>
								<li><hr className="dropdown-divider" /></li>
								<li><Link to="" className="dropdown-item" href="#">Sign out</Link></li>
							</ul>
						</div>
						{/* </div> */}
					</div>
				</div>
			</div>
		</header>
	);
};

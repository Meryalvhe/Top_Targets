import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/navbar.css";
import logoURL from "../../img/logo.png";
import kruegerURL from "../../img/freddykrueger.jpg"


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const isLogged = store.isLogin;
	const logOut = () => {
		console.log(localStorage)
		localStorage.clear();
		actions.setIsLogin(false)
		actions.setCurrentUser("")
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-primary mt-auto">
			<div className="container-fluid mt-auto">
				<Link to="/" className="navbar-brand">
					<img src={logoURL} height="50" alt="Logo" />
				</Link>
				<button className="navbar-toggler" style={{ borderColor: "white", backgroundColor: "white" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/about" className="nav-link text-light">
								<button className="cta">
									<span id="NavbarButton" className="hover-underline-animation body text-light"> About </span>
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/criminals" className="nav-link text-light">
								<button className="cta">
									<span id="NavbarButton" className="hover-underline-animation body text-light"> Criminals </span>
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/missing-persons" className="nav-link text-light">
								<button className="cta">
									<span id="NavbarButton" className="hover-underline-animation body text-light"> Missing Persons </span>
								</button>
							</Link>
						</li>
					</ul>


					{isLogged ?
						<div className="dropdown">
							<Link to="#" className="d-block text-decoration-none dropdown-toggle custom-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
								<img src={kruegerURL} alt="mdo" width="32" height="32" className="rounded-circle object-fit-cover" />
							</Link>
							<ul className="dropdown-menu dropdown-menu-end">
								<li><Link to="" className="dropdown-item title">Profile</Link></li>
								<li><Link to="" className="dropdown-item title">Your stories</Link></li>
								<li><hr className="dropdown-divider" /></li>
								<li><Link to="" className="dropdown-item title" onClick={logOut}>Log out</Link></li>
							</ul>
						</div>
						:
						<div className="d-flex">
							<Link to="/login" className="btn me-2">
								<button className="cta">
									<span id="NavbarButton" className="hover-underline-animation body text-light"> Login </span>
								</button>
							</Link>
							<Link to="/signup" className="btn me-2">
								<button className="cta">
									<span id="NavbarButton" className="hover-underline-animation body text-light"> Signup </span>
								</button>
							</Link>
						</div>
					}
				</div>
			</div>
		</nav>
	);
};
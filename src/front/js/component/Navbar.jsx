import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import logoURL from "../../img/logo.png";
import freddy from "../../img/freddykrueger.jpg";
import hannibal from "../../img/hannibal.webp";
import jason from "../../img/jason.webp";
import psycho from "../../img/psycho.png";
import dahmer from "../../img/dahmer.jpeg";
import missery from "../../img/Missery.jpeg";
import ma from "../../img/ma.png";
import monster from "../../img/monster.png";
import tiffany from "../../img/tiffany.png";
import karla from "../../img/karla.png";
import bundy from "../../img/bundy.jpeg";
import american from "../../img/american.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const isLogged = store.isLogin;
	const logOut = () => {
		console.log(localStorage)
		localStorage.clear();
		actions.setIsLogin(false)
		actions.setCurrentUser("")
	};
	const avatars = [freddy, missery, hannibal, jason, karla, psycho, tiffany, american, monster, ma, dahmer, bundy];


	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-primary">
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
					<div className="d-flex align-items-center">
					{localStorage.getItem("user") ?
						<div className="ms-auto">
						<div className="dropdown">
							<Link to="#" className="d-block text-decoration-none dropdown-toggle custom-dropdown perfil" data-bs-toggle="dropdown" aria-expanded="false">
								<img src={avatars[store.user.avatar]} alt="mdo" width="32" height="32" className="rounded-circle object-fit-cover perfil" />
							</Link>
							<ul className="dropdown-menu dropdown-menu-end"> 
								<li><Link to="/profile" className="dropdown-item title">Profile</Link></li>
								<li><Link to="/edit-profile" className="dropdown-item title">Edit Profile</Link></li>
								<li><hr className="dropdown-divider" /></li>
								<li><Link to="" className="dropdown-item title" onClick={logOut}>Log out</Link></li>
							</ul>
						</div>
					</div>
						:
						<div className="ms-auto"> 
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
			</div>
		</nav>
	);
};
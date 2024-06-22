import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const logOut =()=>{
		console.log(localStorage)
		localStorage.clear();
		actions.setIsLogin(false)
		actions.setCurrentUser("")
		
	}
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/login">
					<span className="navbar-brand mb-0 h1">Top Target</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Criminals</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-primary m-1">Missing Persons</button>
					</Link>
				
					<Link to="/signup">
						<button className="btn btn-primary">Saved items</button>
					</Link>
				</div>
				<button onClick={logOut}>Log Out</button>
			</div>
		</nav>
	);
};

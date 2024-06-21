import React, { useContext } from "react";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";

export const Criminals = () => {

	return (
		<div className="text-center mt-5">
			<h1>Criminals!</h1>
			<div className="card" style={{"width": "18rem;"}}>
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">hola</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/home" className="btn btn-primary">Go somewhere</Link>
            </div>
            </div>
		</div>
	);
};

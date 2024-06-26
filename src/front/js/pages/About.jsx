import React from "react"; 
import "../../styles/home.css";
import fide from "../../img/Fide.jpeg"
import mar from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"

export const About = () => {


	return (
		<div className="text-center mt-5 row p-5">
			<div className="card col-12" >
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">What is <strong>Top Target</strong>?</h5>
                    <p className="card-text">It is a web application that, with the assitance of IA, generates
                        stories based on real criminals. The user will be able to use this stories to generate their
                        own stories.</p>
                    <h5 className="card-title">Our main <strong>Goal</strong></h5>
                    <p className="card-text">Our main goal is to help writers generate </p>
                    <h5 className="card-title">Why <strong>Top Target</strong></h5>
                    <p className="card-text">There is an increase in the interest of people on real life crime stories </p>
                    <h5 className="card-title">About the <strong>API</strong> we use</h5>
                    <p className="card-text">The API that we use contains the information of about on thousand people.
                        The information contains data about the crimes, age, weight, and location of where the crime was committed.
                    </p>
                    <h5 className="card-title">Main <strong>features</strong></h5>
                    <p className="card-text">Provide information about the most wanted criminals and missing persons</p>
                    <p className="card-text">Save the cards of the most wanted criminals and missing persons in the profile</p>
                    <p className="card-text">Generate stories using IA based on the stories of the most wanted criminals and missing persons</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			<div className="card col-4" >
                <img className="card-img-top" src={mar} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Mar Aguayo</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			<div className="card col-4" >
                <img className="card-img-top" src={mery} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Mery Alvarez</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			<div className="card col-4" >
                <img className="card-img-top" src={fide} alt="José Fidel Paredes"/>
                <div className="card-body">
                    <h5 className="card-title">José Fidel Paredes</h5>
                    <p className="card-text">Computer Science student at 4Geeks Academy</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			
		</div>
	);
};
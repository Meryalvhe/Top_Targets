import React from "react"; 
import "../../styles/index.css";
import fide from "../../img/Fide.jpeg"
import mar from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"
import logo from "../../img/logo.png"


export const About = () => {


	return (
		<div className=" bg-dark p-5">
			<div className="row bg-dark text-white " >
                <h1 className="text-center text-white title">About</h1>
                <div className=" col-12 pt-3 pb-3">
                    <h4 className="text-white title">What is <strong>Top Target</strong>?</h4>
                    <p className="body">It is a web application that, with the assitance of IA, generates
                        stories based on real criminals. The user will be able to use this stories to generate their
                        own stories.</p>
                    <h4 className="text-white title">Our main <strong>Goal</strong></h4>
                    <p className="body">Our main goal is to help writers generate </p>
                    <h4 className="text-white title">Why <strong>Top Target</strong></h4>
                    <p className="body">There is an increase in the interest of people on real life crime stories </p>
                    <h4 className="text-white title">About the <strong>API</strong> we use</h4>
                    <p className="body">The API that we use contains the information of about on thousand people.
                        The information contains data about the crimes, age, weight, and location of where the crime was committed.
                    </p>
                    <h4 className="text-white title">Main <strong>features</strong></h4>
                    <ul>
                        <li className="body">Provide information to users about the most wanted criminals and missing persons</li>
                        <li className="body">Save the cards of the most wanted criminals and missing persons in the profile</li>
                        <li className="body">Generate stories using IA based on the stories of the most wanted criminals and missing persons</li>
                    </ul>
                    
                    <a href="/contact" className="btn btn-primary">Contact</a>
                </div>
            </div>
			<section className="row  ">
                <h3 className="mt-3 mb-3 title text-white">Developers</h3>
                <div className="card bg-primary text-white col-3 mx-1 " >
                    <img className="card-img-top mt-3" src={mar} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Mar Aguayo</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary bg-black">Instagram/linkedIn</a>
                    </div>
                </div>
                <div className="card col-3 mx-1 bg-primary text-white" >
                    <img className="card-img-top mt-3" src={mery} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Mery Alvarez</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-black bg-white">Instagram/linkedIn</a>
                    </div>
                </div>
                <div className="card col-3 bg-primary text-white mx-1" >
                    <img className="card-img-top mt-3" src={fide} alt="José Fidel Paredes"/>
                    <div className="card-body">
                        <h5 className="card-title">José Fidel Paredes</h5>
                        <p className="card-text">Computer Science student at 4Geeks Academy</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
            </section>
            <section className=" row  ">
                <h3 className="mt-3 mb-3 text-white">Managers</h3>
                <div className="card col-3 mx-1 bg-primary text-white" >
                    <img className="card-img-top mt-3" src={mar} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Hector</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
                <div className="card col-3 mx-1 bg-primary text-white" >
                    <img className="card-img-top mt-3" src={mar} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Eduardo</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
            </section>
			
		</div>
	);
};
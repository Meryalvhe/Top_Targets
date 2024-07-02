import React from "react"; 
import "../../styles/home.css";
import fide from "../../img/Fide.jpeg"
import mar from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"
import logo from "../../img/logo.png"

export const Contact = () => {


	return (
		<div className="  p-5">
			<section className="border row " >
                <img className="col-12 bg-black pb-5 pt-5" src={logo} alt="Card image cap"/>
                <div className=" col-12 pt-3 pb-3">
                    <h5 className=""><strong>Contact</strong> with us:</h5>
                    <ul>
                        <li >Provide information about the most wanted criminals and missing persons</li>
                        <li >Save the cards of the most wanted criminals and missing persons in the profile</li>
                        <li >Generate stories using IA based on the stories of the most wanted criminals and missing persons</li>
                    </ul>
                    
                    <a href="/contact" className="btn btn-primary">Contact</a>
                </div>
            </section>
			<section className="border row  ">
                <h4 className="mt-3 mb-3">Developers</h4>
                <div className="card col-3 mx-1 " >
                    <img className="card-img-top mt-3" src={mar} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Mar Aguayo</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
                <div className="card col-3 mx-1" >
                    <img className="card-img-top mt-3" src={mery} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Mery Alvarez</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
                <div className="card col-3 mx-1" >
                    <img className="card-img-top mt-3" src={fide} alt="José Fidel Paredes"/>
                    <div className="card-body">
                        <h5 className="card-title">José Fidel Paredes</h5>
                        <p className="card-text">Computer Science student at 4Geeks Academy</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
            </section>
            <section className="border row  ">
                <h4 className="mt-3 mb-3">Managers</h4>
                <div className="card col-3 mx-1" >
                    <img className="card-img-top mt-3" src={mar} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Hector</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Instagram/linkedIn</a>
                    </div>
                </div>
                <div className="card col-3 mx-1" >
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
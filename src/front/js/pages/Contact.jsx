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
                <div className=" col-12 pt-3 pb-3 bg-primary text-light">
                    <h2 className="title text-light"><strong className="title text-light">Contact</strong> with us:</h2>
                    <ul className="body">
                        <li >Provide information about the most wanted criminals and missing persons</li>
                        <li >Save the cards of the most wanted criminals and missing persons in the profile</li>
                        <li >Generate stories using IA based on the stories of the most wanted criminals and missing persons</li>
                    </ul>
                    
                    <a href="/contact" className="btn btn-light">Contact</a>
                </div>
            </section>
		</div>
	);
};
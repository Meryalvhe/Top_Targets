import React from "react"; 
import "../../styles/home.css";
import { Link } from "react-router-dom";



export const Contact = () => {

	return (
		<div className="  p-5">
			<section className=" row " >
                <div className=" col-12 pt-3 pb-3 bg-primary text-light">
                    <h2 className="title text-light"><strong className="title text-light">Contact</strong> with us:</h2>
                    <ul className="body">
                        <li >Provide information about the most wanted criminals and missing persons</li>
                        <li >Save the cards of the most wanted criminals and missing persons in the profile</li>
                        <li >Generate stories using IA based on the stories of the most wanted criminals and missing persons</li>
                    </ul>
                    <a href="mailto:toptargets@protonmail.com" className="btn my-2  btn-outline-light mt-3 body rounded-3">Contact</a>
                </div>
            </section>
		</div>
	);
};
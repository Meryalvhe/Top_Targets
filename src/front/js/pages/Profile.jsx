import React from "react"; 
import "../../styles/index.css";
import "../../styles/profile.css";
import freddy from "../../img/freddykrueger.jpg"
import hannibal from "../../img/hannibal.webp"
import jason from "../../img/jason.webp"
import psycho from "../../img/psycho.png"
import dahmer from "../../img/dahmer.jpeg"
import missery from "../../img/Missery.jpeg"
import ma from "../../img/ma.png"
import monster from "../../img/monster.png"
import tiffany from "../../img/tiffany.png"
import karla from "../../img/karla.png"
import bundy from "../../img/bundy.jpeg"
import american from "../../img/american.png"


export const Profile = () => {


	return (
		<div className="p-3 d-flex justify-content-center bg-dark">
			<article className=" w-75  p-3 mb-5" >
                <h3 className=" text-center title text-white"> Edit Profile</h3>
                <section className=" card   bg-dark my-1" >
                    <div className=" card-body row ">
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-danger border-4 object-fit-cover" src={freddy} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-info border-4 object-fit-cover" src={missery} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-warning border-4 object-fit-cover" src={hannibal} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-success border-4 object-fit-cover" src={jason} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-light border-4 object-fit-cover" src={karla} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={psycho} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-danger border-4 object-fit-cover" src={tiffany} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-info border-4 object-fit-cover" src={american} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-warning border-4 object-fit-cover" src={monster} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-success border-4 object-fit-cover" src={ma} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-light border-4 object-fit-cover" src={dahmer} alt="Card image cap"/>
                        </div>
                        <div className="col-2 my-1">
                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={bundy} alt="Card image cap"/>
                        </div>
                        <p className="text-white body card-text col-2 mb-1 mt-4">Name:</p>
                        <input class="col-10 mb-1 mt-4" type="text" placeholder="José Fidel" aria-label="Name"></input>
                        <p className="text-white body my-1 card-text col-2">Surname:</p>
                        <input class="col-10 my-1" type="text" placeholder="Paredes Sanchez" aria-label="Surname"></input>
                        <p className="col-2 my-1 text-white body card-text">Email: </p>
                        <input class="col-10 my-1" type="text" placeholder="josefidel67@hotmail.com" aria-label="email"></input>
                        <p className="col-2 my-1 text-white body card-text">Description:</p>
                        <textarea class="col-10 my-1" id="description" rows="3">I am an aspiring film-writer looking for new ideas, using this application as a brainstroming tool.</textarea>
                        <p className="text-white body my-1 card-text"> Admin</p>
                        <a href="#" className="btn btn-primary">Update</a>
                    </div>
                </section>    
            </article>
		</div>
	);
};

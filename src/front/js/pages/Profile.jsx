import React from "react"; 
import "../../styles/home.css";
import fide from "../../img/Fide.jpeg"
import mar from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"
import logo from "../../img/logo.png"

export const Profile = () => {


	return (
		<div className="p-5 d-flex justify-content-center">
			<article className="border w-75 row p-3" >
                <h3 className="col-12 text-center">My Stories</h3>
                <div className="card col-12 my-1" >
                    <div className="card-body">
                        <h5 className="card-title">Title of story</h5>
                        <p className="card-text">Description</p>
                        <p className="card-text">Prompt</p>
                        <p className="card-text">Story</p>
                        <a href="#" className="btn btn-primary">Edit</a>
                    </div>
                </div>
                <section className="border w-75 row p-0">
                    <div className="card col-6 my-1">
                        <div className="card-body">
                            <h5 className="card-title">Title of story</h5>
                            <p className="card-text">Description</p>
                            <p className="card-text">Prompt</p>
                            <p className="card-text">Story</p>
                            <a href="#" className="btn btn-primary">Edit</a>
                        </div>
                    </div>
                    <div className="card col-6 my-1">
                        <div className="card-body">
                            <h5 className="card-title">Title of story</h5>
                            <p className="card-text">Description</p>
                            <p className="card-text">Prompt</p>
                            <p className="card-text">Story</p>
                            <a href="#" className="btn btn-primary">Edit</a>
                        </div>
                    </div>
                </section>
            </article>
			
		</div>
	);
};

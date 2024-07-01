import React from "react"; 
import "../../styles/home.css";
import fide from "../../img/Fide.jpeg"
import mar from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"
import logo from "../../img/logo.png"

export const CreateStory = () => {


	return (
		<div className=" p-5 d-flex justify-content-center bg-dark text-white">
			<article className="p-3 w-75 row" >
                <h2 className="col-12 text-center text-white">Create your story</h2>
                <section className="row my-2">
                    <p className="col-2">Title:</p>
                    <div className="col-10">
                        <input type="text" class="form-control" placeholder="Title" aria-label="title" /> 
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 bt-3">Subject:</p>
                    <div className="col-2 bt-3">
                        <input class="form-control " type="text" placeholder="Criminal" aria-label="Disabled input example" disabled />
                    </div>
                    <div className="col-4 bt-3">
                        <input class="form-control " type="text" placeholder="Subject name" aria-label="Disabled input example" disabled />
                    </div>
                    <p className="col-4">This subject information will be loaded automatically as reference</p>
                </section>
                <section className="row my-2">
                    <p className="col-2"> Description:</p>
                    <textarea className="col-10" name="description" id="description"></textarea>
                </section>
                <section className="row my-2">
                    <p className="col-2">Prompt:</p>
                    <textarea className="col-10" name="prompt" id="prompt"></textarea>
                </section>
                <button className="btn btn-primary my-2" type="submit">Button</button>
                <section className="row my-2">
                    <p>Body:</p>
                    <textarea name="body" id="body"></textarea>  
                </section>
            </article>
		</div>
	);
};
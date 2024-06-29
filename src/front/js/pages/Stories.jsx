import React from "react"; 
import "../../styles/index.css";

export const Stories = () => {


	return (
		<div className="p-3 d-flex justify-content-center bg-dark">
			<section className=" border w-75 row p-3" >
                <h3 className="col-12 text-center title text-white">My Stories</h3>
                <div className="card border col-12 my-1 bg-dark" >
                    <div className="card-body">
                        <h5 className="card-title text-white">Title of story</h5>
                        <p className="card-text text-white">Description</p>
                        <p className="card-text text-white">Prompt</p>
                        <p className="card-text text-white">Story</p>
                        <a href="#" className="btn btn-primary">Edit</a>
                    </div>
                </div>
                
            </section>
			
		</div>
	);
};

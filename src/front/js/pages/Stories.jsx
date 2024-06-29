import React from "react"; 
import "../../styles/index.css";

export const Stories = () => {


	return (
		<div className="p-3 d-flex justify-content-center bg-dark">
			<section className=" w-75 row p-3" >
                <h3 className="col-12 text-center title text-white">My Stories</h3>
                <div className="card border col-12 my-1 bg-dark" >
                    <div className="card-body">
                        <h4 className="card-title text-white">Title of story</h4>
                        <p className="card-text text-white">Subject Status:</p>
                        <p className="card-text text-white">Name of Subject: </p>
                        <p className="card-text text-white">Description: </p>
                        <p className="card-text text-white">Story: </p>
                        <p className="card-text text-white">Prompt: </p>
                        <p className="card-text text-white">Creation Date: </p>
                        <p className="card-text text-white">Last Modification Date: </p>
                        <a href="#" className="btn btn-primary">Edit</a>
                    </div>
                </div>
                
            </section>
			
		</div>
	);
};

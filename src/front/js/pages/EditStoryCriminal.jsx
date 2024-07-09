import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EditStoryCriminal = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [updatedTitle, setTitle] = useState(store.currentStory.title);
    const [updatedBody, setBody] = useState(store.currentStory.body);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleBody = (event) => {
        setBody(event.target.value);
    };

   const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("This is the updated story: title: "+updatedTitle+" body: "+updatedBody)
        const dataToSend = {"id":store.currentStory.id,"user_id": store.currentStory.user_id, "criminal_id": store.currentStory.criminal_id, "title": updatedTitle, 
            "description": store.currentStory.description, "body": updatedBody, 
            "prompt":store.currentStory.prompt, "creation_date":store.currentStory.creation_date, "modification_date":new Date()};

        console.log("los datos que se mandan:", dataToSend);
   
        const url = `${process.env.BACKEND_URL}/api/stories-criminals/` + store.currentStory.id;
        const options = {
            method: 'PUT',
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        if (!response.ok) {
			console.log("Error loading message from backend", response.status, response.statusText)
			return
		}
		const data = await response.json()
        navigate("/profile");
		return data;

    }
    

    return (
        <div className="container p-3 bg-dark text-white">
            <article className="card shadow bg-dark w-100">
                <header className="card-header bg-dark">
                    <h3 className="text-center title text-white">Edit your story</h3>
                </header>
                <aside className="card-header py-2">
                    <h5 className="text-white mb-3 title">Parameters used to generate story:</h5>
                    <div className="row my-2">
                        <div className="card bg-dark border-0 col-md-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Subject:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-md-3 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Criminal</p>
                            </div>
                        </div>

                        <div className="card bg-dark border-0 col-md-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Name:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-md-5 p-0">
                            <div className="card-body">
                                <p className="text-white text-center"></p>
                            </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="card bg-dark border-0 col-md-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Description:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-md-10 p-0" style={{ height: "100px" }}>
                            <div className="card-body overflow-auto">
                                <p className="text-white text-center"> {store.currentStory.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="card bg-dark border-0 col-md-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Prompt:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-md-10 p-0" style={{ height: "100px" }}>
                            <div className="card-body overflow-auto">
                                <p className="text-white text-center"> {store.currentStory.prompt}</p>
                            </div>
                        </div>
                    </div>
                </aside>
                <section className="card-body row py-2">
                    <h5 className="text-white col-12 mb-3 title">Editable parameters:</h5>
                    <div className="col-12 mb-3">
                        <p className="text-white my-2">Title:</p>
                        <input className="form-control my-2" type="text" defaultValue={store.currentStory.title} onChange={handleTitle} aria-label="title" />
                    </div>
                    <div className="col-12 mb-3">
                        <p className="text-white my-2">Body:</p>
                        <textarea className="form-control body my-2" rows={10} defaultValue={store.currentStory.body} onChange={handleBody} id="body"></textarea>
                    </div>
                </section>
                <footer className="card-footer">
                    <button className="btn btn-primary btn-block my-2 titlebtn my-2 btn-outline-light mt-3 body rounded-3" onClick={handleSubmit} type="submit">EDIT</button>
                </footer>
            </article>
        </div>
    );
};

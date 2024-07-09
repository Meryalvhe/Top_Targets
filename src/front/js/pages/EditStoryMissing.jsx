import React, {useContext, useState, useEffect} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EditStoryMissing = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [updatedTitle, setTitle] = useState(store.currentStory.title)
    const [updatedBody, setBody] = useState(store.currentStory.body)
    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }
    const handleBody = event =>{
        setBody(event.target.value)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("This is the updated story: title: "+updatedTitle+" body: "+updatedBody)
        const dataToSend = {"id":store.currentStory.id,"user_id": store.currentStory.user_id, "missing_person_id": store.currentStory.missing_person_id, "title": updatedTitle, 
            "description": store.currentStory.description, "body": updatedBody, 
            "prompt":store.currentStory.prompt, "creation_date":store.currentStory.creation_date, "modification_date":new Date()};

        console.log("los datos que se mandan:", dataToSend);
        const url = `${process.env.BACKEND_URL}/api/stories-missing-persons/` + store.currentStory.id;
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
        <div className=" p-5 d-flex justify-content-center bg-dark text-white" >
            <article className="card shadow bg-dark w-75 row" >
                <header className="card-header bg-dark">
                    <h3 className="text-center  title text-white">Edit your story</h3>
                </header>
                <aside className="card-header row py-2">
                    <h5 className="text-white col-12 mb-3">Parameters used to generate story:</h5>
                    <section className="row my-2">
                        <div className="card bg-dark border-0 col-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Subject:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-3 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Missing Person</p>
                            </div>
                        </div>
                        
                        <div className="card bg-dark border-0 col-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Name:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-5 p-0">
                            <div className="card-body">
                                <p className="text-white text-center"></p>
                            </div>
                        </div>
                    </section>
                    <section className="row my-2 ">
                        <div className="card bg-dark border-0 col-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Description:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-10 p-0" style={{"height":"100px"}}>
                            <div className="card-body  overflow-auto">
                                <p className="text-white text-center "> {store.currentStory.description}</p>
                                
                            </div>
                        </div>
                    </section>
                    <section className="row my-2">
                        <div className="card bg-dark border-0 col-2 p-0">
                            <div className="card-body">
                                <p className="text-white text-center">Prompt:</p>
                            </div>
                        </div>
                        <div className="card bg-primary col-10 p-0" style={{"height":"100px"}}>
                            <div className="card-body overflow-auto">
                                <p className="text-white text-center"> {store.currentStory.prompt}</p>
                            </div>
                        </div>
                    </section>
                    
                </aside>
                <section className="card-body row py-2 ">
                    <h5 className="text-white col-12 mb-3">Editable parameters:</h5>
                    <p className="col-2 text-white my-2">Title:</p>
                    <input className="col-10 my-2" type="text"  defaultValue={store.currentStory.title}  onChange={handleTitle} aria-label="title" />
                    <p className="text-white col-2 my-2">Body:</p>
                    <textarea className="col-10 body my-2 " rows={25} onChange={handleBody} defaultValue={store.currentStory.body}  id="body"></textarea> 
                </section>
                <footer>
                    <button className="btn btn-primary my-2" onClick={handleSubmit} type="submit">Button</button>
                </footer>
            </article>
        </div>
    );
};
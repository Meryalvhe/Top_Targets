import React, {useContext, useState} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CreateStory = () => {
    const { store, actions } = useContext(Context);
    const currentStory = store.currentStory
    const [updatedTitle, setTitle] = useState()
    const [updatedDescription,setDescription] = useState()
    const [updatedPrompt, setPrompt] = useState()
    const [updatedBody, setBody] = useState()
    const navigate = useNavigate();
    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }
    const handleDescription = event =>{
        setDescription(event.target.value)
    }
    const handlePrompt = event =>{
        setPrompt(event.target.value)
    }
    const handleBody = event =>{
        setBody(event.target.value)
    }
    const generatePrompt= ()=>{
        return "Make a story about " + "Christian" + " a criminal that has this description " + "white man with brown hair used to use a knife." + 
        " The title of the story is " + updatedTitle + ". The prompt given by the writer is " + updatedPrompt + " The initial story is " +updatedBody + 
        " make it 10 sentences long. A short description about the story: " +updatedDescription + ". The genre is " +"Drama"+ " it is set in " + "2004"
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(generatePrompt())
        const dataToSend = { story: generatePrompt() };
        console.log("los datos que se mandan:", dataToSend);
        const url = `${process.env.BACKEND_URL}/api/hello`;
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
		if (!response.ok) {
            console.log(response)
			console.log("Error loading message from backend", response.status, response.statusText)
			return
		}
		const data = await response.json()
		console.log("this is what IA RETURNS")
        console.log(data.message)

        const dataToSend2 = {"user_id": store.user.id, "criminal_id": 1,"title": updatedTitle, "description": updatedDescription, "prompt": updatedPrompt, "body": data.message};
        console.log("data to send 2", dataToSend2)
        const url2 = `${process.env.BACKEND_URL}/api/stories-criminals`;
        const options2 = {
            method: 'POST',
            body: JSON.stringify(dataToSend2),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const response2 = await fetch(url2, options2)
        if (!response2.ok) {
            console.log(response2)
			console.log("Error loading message from backend", response2.status, response2.statusText)
			return
		}
		const data2 = await response2.json()
        navigate("/story");
		return data2; // Don't forget to return something, that is how the async resolves
    }
    return (
        <div className=" p-5 d-flex justify-content-center bg-dark text-white " >
            <article className="card shadow bg-dark w-75 row" >
                <header className="card-header bg-dark">
                    <h3 className="text-center  title text-white">Create your story</h3>
                </header>
                <section className="card-header bg-dark">
                    <div class="btn-group col-3 p-1">
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Genre
                        </button>
                        <ul class="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Drama</a></li>
                            <li><a className="dropdown-item" href="#">Comedy</a></li>
                            <li><a className="dropdown-item" href="#">Terror</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    <div class="btn-group col-3 p-1">
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Era
                        </button>
                        <ul class="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Modern Era</a></li>
                            <li><a className="dropdown-item" href="#">In the 2000s</a></li>
                            <li><a className="dropdown-item" href="#">In the 1990s</a></li>
                            <li><a className="dropdown-item" href="#">In the 1980s</a></li>
                            <li><a className="dropdown-item" href="#">In the 1960s</a></li>
                            <li><a className="dropdown-item" href="#">In the WWII</a></li>
                            <li><a className="dropdown-item" href="#">In the WWI</a></li>
                            <li><a className="dropdown-item" href="#">During the time of Napoleon</a></li>
                            <li><a className="dropdown-item" href="#">On the Day of Independence of USA</a></li>
                            <li><a className="dropdown-item" href="#">During Jesus Christ life</a></li>
                            <li><a className="dropdown-item" href="#">Ancient Rome</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    <div class="btn-group col-3 p-1">
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Number of characters
                        </button>
                        <ul class="dropdown-menu">
                            <li><a className="dropdown-item" href="#">1</a></li>
                            <li><a className="dropdown-item" href="#">2</a></li>
                            <li><a className="dropdown-item" href="#">3</a></li>
                            <li><a className="dropdown-item" href="#">4</a></li>
                            <li><a className="dropdown-item" href="#">less than 10</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    <div class="btn-group col-3 p-1">
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Genre
                        </button>
                        <ul class="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Drama</a></li>
                            <li><a className="dropdown-item" href="#">Comedy</a></li>
                            <li><a className="dropdown-item" href="#">Terror</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>
                    
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white">Title:</p>
                    <div className="col-10" >
                        <input class="form-control " type="text"  value={updatedTitle}  onChange={handleTitle}  aria-label="title" />
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 bt-3 text-white">Subject:</p>
                    <div className="col-2 bt-3">
                        <input class="form-control " type="text" placeholder={store.currentCriminal.poster_classification} aria-label="Disabled input example" disabled />
                    </div>
                    <div className="col-4 bt-3">
                        <input class="form-control " type="text" placeholder={store.currentCriminal.title} aria-label="Disabled input example" disabled />
                    </div>
                    <p className="col-4 text-white">This subject information will be loaded automatically as reference</p>
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white"> Description:</p>
                        <textarea className="col-10" name="Description"  value={updatedDescription} onChange={handleDescription} id="description"></textarea>
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white">Prompt:</p>
                    <textarea className="col-10" name="prompt" value={updatedPrompt} onChange={handlePrompt} id="prompt"></textarea>
                </section>
                <section className="row my-2">
                    <p className="col-12 text-white">Story:</p>
                    <textarea className="col-12 ms-3" name="body" onChange={handleBody} value={updatedBody} id="body"></textarea>  
                </section>
                <footer className="row">
                    <span className="col-9"></span>
                    
                    <button className="btn btn-primary bg-info my-2 col-3" onClick={handleSubmit} type="submit">Create Story</button>
                    
                    
                </footer>
            </article>
        </div>
    );
};
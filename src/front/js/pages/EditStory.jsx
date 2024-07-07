import React, {useContext, useState} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const EditStory = () => {
    const { store, actions } = useContext(Context);
    const currentStory = store.currentStory[0]
    const [generateStory,setGenerateStory] = useState(["Make a story about this criminal ", "John Goutenbergh",])
    const [updatedTitle, setTitle] = useState()
    const [updatedDescription,setDescription] = useState()
    const [updatedPrompt, setPrompt] = useState()
    const [updatedBody, setBody] = useState()
    const [isEditing, setIsEditing] = useState(false);
    const handleClick = () => {
        setIsEditing(true);
    };
    const handleBlur = () => {
        setIsEditing(false);
        // Save the changes or perform any required actions here
    };
    const handleChange = (event) => {
        setText(event.target.value);
      };
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
    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataToSend = { story: "make a 2 words sentence" };
        console.log("los datos que se mandan:", dataToSend);
        const url = `${process.env.BACKEND_URL}/api/hello`;
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        /*const response = await fetch(url, options)
		if (!response.ok) {
            console.log(response)
			console.log("Error loading message from backend", response.status, response.statusText)
			return
		}
		const data = await response.json()
		return data;  // Don't forget to return something, that is how the async resolves*/
        const dataToSend2 = { id: "make a 2 words sentence", };

    }
    
    const [text, setText] = useState("bitch");
    return (
        <div className=" p-5 d-flex justify-content-center bg-dark text-white  vh-100" >
            <article className="card shadow bg-dark w-75 row" >
                <header className="card-header bg-dark">
                    <h3 className="text-center  title text-white">Create your story</h3>
                </header>
                <section className="row my-2">
                    <p className="col-2 text-white">Title:</p>
                    <div className="col-10" onClick={handleClick}>
                        {isEditing ? (
                            <input type="text"  value={updatedTitle}  onChange={handleTitle}  onBlur={handleBlur} aria-label="title" />
                        ) : (
                            <input type="text"  value={currentStory.title} readOnly aria-label="title" />
                        )}
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 bt-3 text-white">Subject:</p>
                    <div className="col-2 bt-3">
                        <input class="form-control " type="text" placeholder="Criminal" aria-label="Disabled input example" disabled />
                    </div>
                    <div className="col-4 bt-3">
                        <input class="form-control " type="text" placeholder={currentStory.Criminal.title} aria-label="Disabled input example" disabled />
                    </div>
                    <p className="col-4 text-white">This subject information will be loaded automatically as reference</p>
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white"> Description:</p>
                    <div className="col-10" onClick={handleClick}>
                    {isEditing ? (
                        <textarea className="col-12" name="Description" onChange={handleDescription} value={updatedDescription} onBlur={handleBlur} id="description"></textarea>
                    ) : (
                        <textarea className="col-12" name="Description" value={currentStory.description} id="description"></textarea>
                    )}
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white">Prompt:</p>
                    <textarea className="col-10" name="prompt" placeholder={currentStory.prompt} onChange={handlePrompt} id="prompt"></textarea>
                </section>
                <button className="btn btn-primary my-2" onClick={handleSubmit} type="submit">Button</button>
                <section className="row my-2">
                    <p>Body:</p>
                    <textarea name="body" onChange={handleBody} placeholder={currentStory.body} id="body"></textarea>  
                </section>
            </article>
        </div>
    );
};
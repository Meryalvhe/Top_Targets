import React, {useContext, useState} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const EditStory = () => {
    const { store, actions } = useContext(Context);
    const currentStory = store.currentStory[0]
    const [story, setStory] = useState(currentStory);
    const temp=story
    temp["title"] = currentStory.title
    const [generateStory,setGenerateStory] = useState(["Make a story about this criminal ", "John Goutenbergh",])
    console.log("this is is it")
    console.log(story)
    console.log(currentStory)

    const handleTitle = event =>{
        const temp = story
        temp["title"] = event.target.placeholder
        setStory(temp);
        console.log(story)
    }
    const handleDescription = event =>{
        const temp = story
        temp["description"] = event.target.value
        setStory(temp);
        console.log(story)
    }
    const handlePrompt = event =>{
        const temp = story
        temp["prompt"] = event.target.value
        setStory(temp);
        console.log(story)
    }
    const handleBody = event =>{
        const temp = story
        temp["body"] = event.target.value
        setStory(temp);
        console.log(story)
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
        const response = await fetch(url, options)
		if (!response.ok) {
            console.log(response)
			console.log("Error loading message from backend", response.status, response.statusText)
			return
		}
		const data = await response.json()
		return data;  // Don't forget to return something, that is how the async resolves
    }
    
    
    return (
        <div className=" p-5 d-flex justify-content-center bg-dark text-white  vh-100">
            <article className="card shadow bg-dark w-75 row" >
                <div className="card-header bg-dark">
                    <h3 className="text-center  title text-white">Create your story</h3>
                </div>
                
                <section className="row my-2">
                    <p className="col-2 text-white">Title:</p>
                    <div className="col-10">
                        <input type="text" class="form-control" placeholder={currentStory.title} value={story.title} onChange={handleTitle} aria-label="title" /> 
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
                    <textarea className="col-10" name="Description" onChange={handleDescription} value={currentStory.description} id="description"></textarea>
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
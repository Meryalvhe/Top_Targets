import React, {useContext, useState} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const CreateStory = () => {
    const { store, actions } = useContext(Context);
    const [story, setStory] = useState({"user_id":store.user.id, "criminal_id":store.criminal_id});
    console.log(store.currentCriminal)
    const handleTitle = event =>{
        const temp = story
        temp["title"] = event.target.value
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
    
    return (
        <div className=" p-5 d-flex justify-content-center bg-dark text-white">
            <article className="card shadow bg-dark w-75 row" >
                <div className="card-header bg-primary">
                    <h3 className="text-center  title text-white">Create your story</h3>
                </div>
                
                <section className="row my-2">
                    <p className="col-2">Title:</p>
                    <div className="col-10">
                        <input type="text" class="form-control" placeholder="Title"  onChange={handleTitle} aria-label="title" /> 
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 bt-3">Subject:</p>
                    <div className="col-2 bt-3">
                        <input class="form-control " type="text" placeholder="Criminal" aria-label="Disabled input example" disabled />
                    </div>
                    <div className="col-4 bt-3">
                        <input class="form-control " type="text" placeholder={store.currentCriminal.id} aria-label="Disabled input example" disabled />
                    </div>
                    <p className="col-4">This subject information will be loaded automatically as reference</p>
                </section>
                <section className="row my-2">
                    <p className="col-2"> Description:</p>
                    <textarea className="col-10" name="description" onChange={handleDescription} id="description"></textarea>
                </section>
                <section className="row my-2">
                    <p className="col-2">Prompt:</p>
                    <textarea className="col-10" name="prompt" onChange={handlePrompt} id="prompt"></textarea>
                </section>
                <button className="btn btn-primary my-2" onClick={() => actions.addFavoritesCriminals(item.title)} type="submit">Button</button>
                <section className="row my-2">
                    <p>Body:</p>
                    <textarea name="body" onChange={handleBody} id="body"></textarea>  
                </section>
            </article>
        </div>
    );
};
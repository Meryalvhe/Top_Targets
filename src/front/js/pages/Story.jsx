import React, {useContext, useState,useEffect} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Story = () => {
    const { store, actions } = useContext(Context);
    console.log("this is the story")
    console.log(store.currentStory)
    const currentStory = store.currentStory
    useEffect(() => {
        actions.getCurrentStory()
    }, [])
    return (
        <div className=" p-5 d-flex justify-content-center bg-dark text-white  " >
            <article className="card shadow bg-dark w-75  row" >
                <header className="card-header bg-dark">
                    <h3 className="text-center  title text-white">{currentStory.title}</h3>
                </header>
                <section className="card-body row my-2">
                    <p className="col-12 text-white">{currentStory.body}</p>
                    
                </section>
                <footer className="card-footer ms-1 row">
                    <span className="col-9"></span>
                    <a href="/edit-story" className="btn btn-primary bg-info col-3">Edit Story</a>
                </footer>
            </article>
            <span></span>
        </div>
    );
};
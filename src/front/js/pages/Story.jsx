import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Spinner } from "../component/Spinner.jsx";

export const Story = () => {
    const { store, actions } = useContext(Context);
    const currentStory = store.currentStory

    return (

       <div>
            {!store.currentStory.body ? <Spinner/> :
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
                    <a href="/profile" className="btn my-2 w-100 btn-outline-light mt-3 body rounded-3">Go to Profile</a>
                </footer>
            </article>
            <span></span>
    </div>
  }

        </div>
    );
};
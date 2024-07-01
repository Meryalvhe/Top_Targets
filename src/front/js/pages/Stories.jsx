import React, {useContext} from "react"; 
import "../../styles/index.css";
import { Context } from "../store/appContext";

export const Stories = () => {
    const { store, actios } = useContext(Context);
    console.log(store.stories)

    return (
        <div className="p-3 d-flex justify-content-center bg-dark">
            <section className=" w-75 row p-3" >
                <h3 className="col-12 text-center title text-white">My Stories</h3>
                {store.stories.map((item)=>
                <div className="card col-12 my-1 bg-primary" >
                    <div className="card-body">
                        <h4 className="card-title text-white"> {item.title} </h4>
                        <p className="card-text text-white">Name of Subject: {item.user_to}</p>
                        <p className="card-text text-white">Subject Status: {item.criminal_id}</p>
                        <p className="card-text text-white">Story Creation Date: {item.creation_date}</p>
                        <p className="card-text text-white">Description: {item.description} </p>
                        <p className="card-text text-white">Story: {item.body}</p>
                        <p className="card-text text-white">Prompt: {item.prompt}</p>
                        <a href="#" className="btn btn-primary bg-black">Edit</a>
                        <p className="card-text text-white">Last Modification Date:{item.modification_date} </p>
                        
                    </div>
                </div>
                )}
            </section>
        </div>
    );
};

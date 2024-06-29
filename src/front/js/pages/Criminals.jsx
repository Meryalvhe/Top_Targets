import React, { useContext } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Criminals = () => {
    const { store, actions } = useContext(Context);

    const handleCriminal =(id) =>{
        actions.setCurrentCriminal(id)
    }



    return (
        <div className="container-fluid bg-dark">
            {!store.criminals ? <p> not found </p> :
                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                    {store.criminals.map((item, id) =>
                        <div className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM bg-primary">
                            <div key={id} className="card border-primary border-none mt-5">
                               <Link to="/current-criminal" onClick={()=>handleCriminal(item.id)} className="bg-primary"><img src={item.images} className="ms-1" alt="..." /></Link> 
                                <button className="btn-save favoriteLocation bg-primary">
                                {store.favorites.includes(item.title) ? <i className="fa-solid fa-heart-crack fa-xl favoriteSize" onClick={() => actions.removeFavorites(item.title)}></i> :
                                 <i className="fa-solid fa-heart fa-xl text-light favoriteSize" onClick={() => actions.addFavorites(item.title)}></i> }
                                </button>

                                <div className="card-body bg-primary border-primary">
                                    <div className="row text-center text-light">
                                        <div className="col">
                                            <h5 className="card-title title" >{item.title}</h5>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="card-text body text-light">{item.subjects}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};
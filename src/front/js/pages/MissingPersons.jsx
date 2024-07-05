import React, { useContext } from "react";
import "../../styles/cards.css";
import "../../styles/index.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MissingPersons = () => {
    const { store, actions } = useContext(Context);

    const handleMissingPersons =(id) =>{
        actions.setCurrentMissingPerson(id)
    }

    return (
        <div className="container-fluid bg-dark">
            {!store.missing ? <p> not found </p> :
                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                    {store.missing.map((item, id) =>
                        <div key={id} className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM bg-primary">
                            <div  className="card border-primary border-none mt-5">
                               <Link to="/current-missing-persons" onClick={()=>handleMissingPersons(item.id)} className="bg-primary"><img src={item.images} className="ms-1" alt="..." /></Link> 
                               {!store.isLogin ? '' : <button className="btn-save favoriteLocation bg-primary">
                                    
                                    {store.favoritesMissingPersons.filter((element)=> item.id == element.criminal_id).length > 0 ? <i className="fa-solid fa-heart-crack fa-xl favoriteSize" onClick={() => actions.removefavoritesMissingPersons(item.id)}></i> :
                                     <i className="fa-solid fa-heart fa-xl text-light favoriteSize" onClick={() => actions.addfavoritesMissingPersons(item.id)}></i> }
                                    </button>}

                                <div className="card-body bg-primary border-primary">
                                    <div className="row text-center text-light">
                                        <div className="col">
                                            <h5 className="card-title title" >{item.title}</h5>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="card-text body text-light">{item.description}</p>
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
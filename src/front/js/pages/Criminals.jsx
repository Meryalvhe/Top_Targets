import React, { useContext } from "react";
import "../../styles/cards.css";
import "../../styles/index.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Criminals = () => {
    const { store, actios } = useContext(Context);

    console.log(store.criminals)

    return (
        <div className="container-fluid bg-primary">
            {!store.criminals ? <p> not found </p> :
                <div className="row row-cols-1 row-cols-md-3 ">
                    {store.criminals.map((item, id) =>
                        <div className="col cardCss mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1">
                            <div key={id} className="card bg-secondary border-light cardCss">
                                <img src={item.images} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-10">
                                            <h5 className="card-title title" >{item.title}</h5>
                                        </div>
                                        <div className="col-2">
                                            <i className="fa-regular fa-heart fa-xl"></i>
                                        </div>
                                    </div>
                                    <p className="card-text body">{item.subjects}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

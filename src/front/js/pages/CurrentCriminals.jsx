import React, { useContext } from "react";
import "../../styles/cards.css";
import "../../styles/index.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentCriminal = () => {
    const { store, actios } = useContext(Context);


    return (
        <div className="mt-3">
            {!store.criminals ? <p>Not found</p> :
                <div className="card mb-3">
                    <div className="text-end mt-2">
                        <Link to="/characters">
                            <i className="fas fa-times close"></i>
                        </Link>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-4 mb-5 imgCard ">
                            <img src='...' className="img-fluid rounded " alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body font">
                                <h1 className="card-title mb-5 indexFont"> Texto 1 </h1>
                                <p className="card-text mt-1"> Texto 2 </p>
                                <p className="card-text"> Texto 3 </p>
                                <p className="card-text"> Texto 4 </p>
                                <p className="card-text"> Texto 5 </p>
                                <p className="card-text"> Texto 6 </p>
                                <p className="card-text"> Texto 7 </p>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
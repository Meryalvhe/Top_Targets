import React, { useContext } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Criminals = () => {
    const { store, actios } = useContext(Context);



    return (
        <div className="container-fluid bg-primary">
            {!store.criminals ? <p> not found </p> :
                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                    {store.criminals.map((item, id) =>
                        <div className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM">
                            <div key={id} className="card bg-secondary border-light mt-5">
                                <img src={item.images} className="ms-1 img" alt="..." />
                                {/*                                 <span className=" favoriteLocation favoriteSize favBoxSize aling-items-center">  </span> */}
                                {/* <div class="favBoxSize favoriteLocation"></div> */}
                                <button class="btn-save favoriteLocation">
                                <i class="fa-solid fa-heart-crack fa-xl favoriteSize"></i>
                                </button>

                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col">
                                            <h5 className="card-title title" >{item.title}</h5>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="card-text body">{item.subjects}</p>
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
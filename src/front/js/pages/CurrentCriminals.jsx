import React, { useContext } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentCriminal = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="p-5 justify-content-center bg-dark">
            {!store.criminals ? <p>Not found</p> :
                <div className="card mb-3 bg-primary">
                    <div className="text-end mt-2">
                        <Link to="/criminals">
                            <i className="fas fa-times close fa-xl sing-close"></i>
                        </Link>
                    </div>
                    <div className="row g-0 p-5">
                        <div className="col-3 mb-5 current-card border-none">
                            <img src="https://www.fbi.gov/wanted/topten/ruja-ignatova/@@images/image" className="img-fluid" alt="..." />
                            <h4 className="mt-3 text-center title"> aliases: </h4>
                        </div>
                        <div className="col-md-6 ms-5">
                            <div className="card-body text-light">
                                <h1 className="card-title mb-5 title"> Texto 1 </h1>
                                <p className="card-text mt-1 body"> Texto 2 </p>
                                <p className="card-text body"> Texto 3 </p>
                                <p className="card-text body"> Texto 4 </p>
                                <p className="card-text body"> Texto 5 </p>
                                <p className="card-text body"> Texto 6 </p>
                                <p className="card-text body"> Texto 7 </p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-outline-light ms-3 body">Create your Storie</button>
                        </div>
                        <h1 className="title text-light"> Comments </h1>
                        <div className="card">
                            <div className="d-flex justify-content-end p-2 me-2">
                                <i className="fa-regular fa-trash-can"></i>
                            </div>
                            <div className="row">
                                <div className=" col-1 avatar-comment ms-3 d-flex justify-content-end ">
                                    <img src="https://github.com/mdo.png" alt="mdo" className="rounded-circle" />
                                </div>
                                <div className="col-9 card-body p-none aling-text-start user-comment mt-1 mb-3 title me-5">
                                    User Name. <p className="body">
                                        freestar

                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor enim sit amet est fermentum congue volutpat at dui. Vivamus nec neque hendrerit, volutpat quam viverra, lacinia tellus. Fusce nisi tortor, tempus fermentum eros cursus, malesuada fermentum lectus. Suspendisse interdum viverra lacus ac semper. Nullam tempor purus sit amet diam. </p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 mt-3 justify-content-end">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label text-light"> Write your comment here</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="button" className="btn btn-outline-light mt-3 body">Comment</button>
                    </div>
                </div>
            }
        </div >
    );
};
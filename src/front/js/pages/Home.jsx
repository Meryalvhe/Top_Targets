import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/jumbotron.css"
import "../../styles/home.css"

export const Home = () => {
    const { store, actios } = useContext(Context);

    return (
        <span>
            <div id="footer" className="p-5 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Custom jumbotron</h1>
                    <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                    <button className="btn btn-primary btn-lg" type="button">Example button</button>
                </div>
            </div>
            <div id="TopTenFugitives">
                <div className="container-fluid bg-primary">
                    <h1 className="title text-white pt-3">Top Ten Fugitives</h1>
                    {!store.toptencriminals ? <p> not found </p> :
                        <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                            {store.toptencriminals.map((item, id) =>
                                <div className="col cardCss m-1 col-lg-2 col-md-6 col-sm-10  cardM ">
                                    <div key={id} className="card bg-secondary border-light mt-5 cardCss bg-success">
                                        <img src={item.images[0].original} className="ms-1 img" alt="..."/>

                                        <button className="btn-save favoriteLocation">
                                            <i className="fa-solid fa-heart-crack fa-xl favoriteSize"></i>
                                        </button>

                                        <div className="card-body">
                                            <div className="row text-center">
                                                <div className="col">
                                                    <h5 className="card-title title" >{item.title}</h5>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <p className="card-text body">{item.warning_message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    }
                </div>

            </div>
            <div id="MostWantedTerrorists">
                <div className="container-fluid bg-primary">
                    <h1 className="title text-white pt-3">Most Wanted Terrorists</h1>
                    {!store.criminals ? <p> not found </p> :
                        <div className="row row-cols-1 row-cols-md-3 justify-content-center ">

                            {store.criminals.map((item, id) =>
                                <div className="col cardCss mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM">
                                    <div key={id} className="card bg-secondary border-light mt-5 cardCss">
                                        <img src={item.images} className="ms-1 img" alt="..." />

                                        <button className="btn-save favoriteLocation">
                                            <i className="fa-solid fa-heart-crack fa-xl favoriteSize"></i>
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
            </div>
        </span>

    );

}
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import jumbotronUrl from "../../img/jumbo.jpg"
import "../../styles/home.css"
import { Link, useParams } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const handleTopTenCriminal = (item) => {
        actions.setCurrentTopTenCriminal(item)
        localStorage.setItem('current_top_ten_criminanl', JSON.stringify(item))
    }

    const handleMostWantedTerrorist = (item) => {
        actions.setCurrentMostWantedTerrorist(item)
        localStorage.setItem('current_most_wanted_terrorist', JSON.stringify(item))
    }

    return (
        <span>
            <div className="jumbotron" style={{
                backgroundImage: `url(${jumbotronUrl})`,
                height: "50vh",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%"
            }}>
            </div>

            <div id="TopTenFugitives ">
                <div className="container-fluid bg-dark py-3">
                    <h1 className="title text-white pt-3 ms-5">Top Ten Fugitives</h1>
                    {!store.toptencriminals ? <p className="text-warning f-1"> not found </p> :
                        <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                            {store.toptencriminals.map((item, id) =>
                                <div key={id} className="bg-primary col m-1 col-lg-2 col-md-6 col-sm-10 cardHome rounded-3">
                                    <div  className="cardCss ">
                                        <Link to={"/current-top-ten-criminal"} onClick={() => handleTopTenCriminal(item)} className="bg-primary">
                                            <div  className="container">
                                                <div className="d-flex align-items-start row justify-content-start">
                                                    <div className="d-flex col-4 jalign-items-start">
                                                        <img id="imgCardHome" src={item.images} className="mt-4" alt="..." />
                                                    </div>
                                                    <div  className="col-8 mt-4 text-end">
                                                        <div>
                                                            <h5 className="card-title title text-light">{item.title}</h5>
                                                        </div>
                                                        <div className="text-container">
                                                            <p className="card-text body fw-light fs-6 text-light">{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>


            <div id="MostWantedTerrorists">
                <div className="container-fluid bg-dark py-3">
                    <h1 className="title text-white pt-3 ms-5">Most Wanted Terrorists</h1>
                    {!store.mostwantedterrorists ? <p className="text-warning f-1"> not found </p> :
                        <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                            {store.mostwantedterrorists.map((item, id) =>
                                <div className="bg-primary col m-1 col-lg-2 col-md-6 col-sm-10 cardHome rounded-3">
                                    <div key={id} className="cardCss ">
                                        <Link to={"/current-most-wanted-criminal/"} onClick={() => handleMostWantedTerrorist(item)} className="bg-primary">
                                            <div className="container">
                                                <div className="d-flex align-items-start row justify-content-start">
                                                    <div className="d-flex col-4 jalign-items-start">
                                                        <img id="imgCardHome" src={item.images} className="mt-4" alt="..." />
                                                    </div>
                                                    <div className="col-8 mt-4 text-end">
                                                        <div>
                                                            <h5 className="card-title title text-light">{item.title}</h5>
                                                        </div>
                                                        <div className="text-container">
                                                            <p className="card-text body fw-light fs-6 text-light">{item.reward_text}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </span>


    )
}
import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import jumbotronUrl from "../../img/jumbo.jpg"
import "../../styles/home.css"
import { Link, useParams } from "react-router-dom";

export const Home = () => {
    const { store, actios } = useContext(Context);

    const handleCriminal =(id) =>{
        actions.setCurrentCriminal(id)
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
            
                <div id="TopTenFugitives">
                    <div className="container-fluid bg-primary">
                        <h1 className="title text-white pt-3">Top Ten Fugitives</h1>
                        {!store.toptencriminals ? <p> not found </p> :
                            <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                                {store.toptencriminals.map((item, id) =>
                                    <div className="col m-1 col-lg-2 col-md-6 col-sm-10 cardHome rounded-3">
                                        <div key={id} className="bg-secondary border-light mt-5 cardCss">
                                        <Link to={"/current-criminal/" + id} onClick={()=>handleCriminal(item.id)} className="bg-primary">
                                            <button className="btn-save top-0 end-0 position-absolute m-3">
                                                <i className="fa-solid fa-heart-crack fa-xl favoriteSize"></i>
                                            </button>
                                            <div className="d-flex align-items-center">
                                                <img id="imgCardHome" src={item.images[0].original} className="img" alt="..." />
                                                <div className="">
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
                                        </Link> 
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
                        {!store.mostwantedterrorists ? <p> not found </p> :
                            <div className="row row-cols-1 row-cols-md-3 justify-content-center">
                                {store.mostwantedterrorists.map((item, id) =>
                                    <div className="col m-1 col-lg-2 col-md-6 col-sm-10 cardHome rounded-3">
                                        <div key={id} className="bg-secondary border-light mt-5 cardCss">
                                        <Link to={"/current-missing-person/" + id} onClick={()=>handleCriminal(item.id)} className="bg-primary">
                                            <button className="btn-save top-0 end-0 position-absolute m-3">
                                                <i className="fa-solid fa-heart-crack fa-xl favoriteSize"></i>
                                            </button>
                                            <div className="d-flex align-items-center">
                                                <img id="imgCardHome" src={item.images[0].original} className="img" alt="..." />
                                                <div className="pb-5">
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
                                        </Link>
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
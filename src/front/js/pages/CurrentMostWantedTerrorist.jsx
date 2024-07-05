import React, { useContext } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentMostWantedTerrorist = () => {
    const { store, actions } = useContext(Context);
    const currentMostWantedCriminal = JSON.parse(localStorage.getItem("current_most_wanted_terrorist"));
    const cleanCurrentMostWantedCriminal = {};
    for (const key in currentMostWantedCriminal) {
        if (currentMostWantedCriminal.hasOwnProperty(key)) {
            if (typeof currentMostWantedCriminal[key] === 'string') {
                cleanCurrentMostWantedCriminal[key] = currentMostWantedCriminal[key].replace(/\[|\]|<p>|<\/p>|<br>|<br\s*\/>/g, '');
            } else {
                cleanCurrentMostWantedCriminal[key] = currentMostWantedCriminal[key];
            }
        }
    }

    console.log(cleanCurrentMostWantedCriminal)

    return (
        <div className="container-fluid p-5 justify-content-center bg-dark">
            {!localStorage.getItem("current_most_wanted_terrorist") ? <p>Not found</p> :
                <div className="card mb-3 bg-primary">
                    <div className="text-end mt-2">
                        <Link to="/">
                            <i className="fas fa-times close fa-xl sing-close"></i>
                        </Link>
                    </div>
                    <div className="row g-0 p-5">
                        <div className="col-12 col-md-6 col-lg-3 mb-5 border-none bg-white">
                            <img src={cleanCurrentMostWantedCriminal.images} className="img-fluid p-2" alt="..." />
                            <h4 className="mt-3 text-center title p-2">aliases:</h4>
                            <p className="p-2 text-center">{cleanCurrentMostWantedCriminal.aliases}</p>
                        </div>
                        <div className="col-12 col-md-6 ms-md-3">
                            <div className="card-body text-light">
                                <div className='mb-5'>
                                    <h1 className="card-title title"> {cleanCurrentMostWantedCriminal.title} </h1>
                                    <p>{cleanCurrentMostWantedCriminal.subjects}</p>
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.dates_of_birth_used == null || cleanCurrentMostWantedCriminal.dates_of_birth_used == 'None' ? ''
                                        :
                                        <p className="card-text body"> Date of birth used: {cleanCurrentMostWantedCriminal.dates_of_birth_used}  </p>}
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.nationality == null || cleanCurrentMostWantedCriminal.nationality == 'None' ? ''
                                        :
                                        <p className="card-text body"> Nationality: {cleanCurrentMostWantedCriminal.nationality} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.place_of_birth == null || cleanCurrentMostWantedCriminal.place_of_birth == 'None' ? ''
                                        :
                                        <p className="card-text body"> Place of birth: {cleanCurrentMostWantedCriminal.place_of_birth} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.sex == null || cleanCurrentMostWantedCriminal.sex == 'None' ? ''
                                        :
                                        <p className="card-text body"> Sex: {cleanCurrentMostWantedCriminal.sex}</p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.hair_raw == null || cleanCurrentMostWantedCriminal.hair_raw == 'None' ? ''
                                        :
                                        <p className="card-text body"> Hair: {cleanCurrentMostWantedCriminal.hair_raw} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.remarks == null || cleanCurrentMostWantedCriminal.remarks == 'None' ? ''
                                        :
                                        <p className="card-text body"> Remarks: {cleanCurrentMostWantedCriminal.remarks} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.field_offices == null || cleanCurrentMostWantedCriminal.field_offices == 'None' ? ''
                                        :
                                        <p className="card-text mt-1 body"> Field offices: {cleanCurrentMostWantedCriminal.field_offices}  </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentMostWantedCriminal.caution == null || cleanCurrentMostWantedCriminal.caution == 'None' ? ''
                                        :
                                        <p className="card-text body"> Caution: {cleanCurrentMostWantedCriminal.caution}  </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mb-5">
                            <a href="/create-story" className="btn btn-outline-light ms-3 body">Create your Story</a>
                        </div>
                        <div className='mb-2'>
                            {store.currentMostWantedTerroristsComments == '' ? '' : <h1 className="title text-light"> Comments </h1>}
                        </div>
                        {store.currentMostWantedTerroristsComments.map((item, id) =>
                            <div className="card mb-3" key={item.id}>
                                <div className="d-flex justify-content-end p-2 me-2">
                                    <i className="fa-regular fa-trash-can"></i>
                                </div>
                                <div className="row g-0">
                                    <div className="col-9 card-body p-none align-text-start user-comment mt-1 mb-3 title me-5">
                                        <p className="text-dark ms-2">
                                            {store.user.email}
                                        </p>
                                        <p className="body">{item.comment}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!store.user ?
                            <div className="container">
                                <div className="mb-3 mt-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Write your comment here</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <button type="button" className="btn btn-outline-light mt-3 body">Comment</button>
                            </div>
                            : ''
                        }
                    </div>
                </div>
            }
        </div>
    );
};

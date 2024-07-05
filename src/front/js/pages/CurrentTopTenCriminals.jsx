import React, { useContext } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentTopTenCriminals = () => {
    const { store, actions } = useContext(Context);
    const currentTopCriminal = JSON.parse(localStorage.getItem("current_top_ten_criminanl"));
    const cleanCurrentTopCriminal = {};
    for (const key in currentTopCriminal) {
        if (currentTopCriminal.hasOwnProperty(key)) {
            if (typeof currentTopCriminal[key] === 'string') {
                // Reemplaza los caracteres [ ], <p>, y </p>
                cleanCurrentTopCriminal[key] = currentTopCriminal[key].replace(/\[|\]|<p>|<\/p>/g, '');
            } else {
                cleanCurrentTopCriminal[key] = currentTopCriminal[key];
            }
        }
    }

    console.log(cleanCurrentTopCriminal)

    return (
        <div className="container-fluid p-5 justify-content-center bg-dark">
            {!localStorage.getItem("current_top_ten_criminanl") ? <p>Not found</p> :
                <div className="card mb-3 bg-primary">
                    <div className="text-end mt-2">
                        <Link to="/">
                            <i className="fas fa-times close fa-xl sing-close"></i>
                        </Link>
                    </div>
                    <div className="row g-0 p-5">
                        <div className="col-12 col-md-6 col-lg-3 mb-5 border-none bg-white">
                            <img src={cleanCurrentTopCriminal.images} className="img-fluid p-2" alt="..." />
                            <h4 className="mt-3 text-center title p-2">aliases:</h4>
                            <p className="p-2 text-center">{cleanCurrentTopCriminal.aliases}</p>
                        </div>
                        <div className="col-12 col-md-6 ms-md-3">
                            <div className="card-body text-light">
                                <div className='mb-5'>
                                    <h1 className="card-title title"> {cleanCurrentTopCriminal.title} </h1>
                                    <p>{cleanCurrentTopCriminal.subjects}</p>
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.dates_of_birth_used == null || cleanCurrentTopCriminal.dates_of_birth_used == 'None' ? ''
                                        :
                                        <p className="card-text body"> Date of birth used: {cleanCurrentTopCriminal.dates_of_birth_used}  </p>}
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.nationality == null || cleanCurrentTopCriminal.nationality == 'None' ? ''
                                        :
                                        <p className="card-text body"> Nationality: {cleanCurrentTopCriminal.nationality} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.place_of_birth == null || cleanCurrentTopCriminal.place_of_birth == 'None' ? ''
                                        :
                                        <p className="card-text body"> Place of birth: {cleanCurrentTopCriminal.place_of_birth} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.sex == null || cleanCurrentTopCriminal.sex == 'None' ? ''
                                        :
                                        <p className="card-text body"> Sex: {cleanCurrentTopCriminal.sex}</p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.hair_raw == null || cleanCurrentTopCriminal.hair_raw == 'None' ? ''
                                        :
                                        <p className="card-text body"> Hair: {cleanCurrentTopCriminal.hair_raw} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.remarks == null || cleanCurrentTopCriminal.remarks == 'None' ? ''
                                        :
                                        <p className="card-text body"> Remarks: {cleanCurrentTopCriminal.remarks} </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.field_offices == null || cleanCurrentTopCriminal.field_offices == 'None' ? ''
                                        :
                                        <p className="card-text mt-1 body"> Field offices: {cleanCurrentTopCriminal.field_offices}  </p>
                                    }
                                </div>
                                <div>
                                    {cleanCurrentTopCriminal.caution == null || cleanCurrentTopCriminal.caution == 'None' ? ''
                                        :
                                        <p className="card-text body"> Caution: {cleanCurrentTopCriminal.caution}  </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mb-5">
                            <a href="/create-story" className="btn btn-outline-light ms-3 body">Create your Story</a>
                        </div>
                        <div className='mb-2'>
                            {store.currentTopTenCriminalsComments == '' ? '' : <h1 className="title text-light"> Comments </h1>}
                        </div>
                        {store.currentTopTenCriminalsComments.map((item, id) =>
                            <div className="card mb-3" key={item.id}>
                                <div className="d-flex justify-content-end p-2 me-2">
                                    <i className="fa-regular fa-trash-can"></i>
                                </div>
                                <div className="row g-0">
                                    <div className="col-2 col-md-1 avatar-comment ms-3 d-flex justify-content-end">
                                        <img src="https://github.com/mdo.png" alt="mdo" className="rounded-circle img-fluid" />
                                    </div>
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
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Write your comment here</label>
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
